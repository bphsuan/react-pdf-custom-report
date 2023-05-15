import React, { useState, useEffect } from "react";
import { Table, Empty, Radio, Button, Row, Space, message } from "antd";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { useSelector, useDispatch } from "react-redux";
import { PrinterOutlined } from "@ant-design/icons";
import { pdf } from "@react-pdf/renderer";
import moment from "moment";
import { getCAUFVDRequest } from "../../slice";
import { AufnrColumns } from "./columns";
import PrintContent from "../PrintContents";

const PrintTable = () => {
  const dispatch = useDispatch();
  const { AUFNRList, isAUFNRLoading, profiles, isReadyToPrint, isCAUFVDLoading } = useSelector(
    (state) => state.printProfile
  );
  const [lang, setLang] = useState("E");

  const triggerPrint = () => {
    dispatch(getCAUFVDRequest({ LANGU: lang }));
  };

  const printZip = async () => {
    const zip = new JSZip();
    profiles.forEach((profile) => {
      // for each pdf you have to add the blob to the zip
      zip.file(
        `${profile?.header?.AUFNR}.pdf`,
        pdf(<PrintContent profile={profile} locale={lang} />).toBlob()
      );
    });
    // once you finish adding all the pdf to the zip, return the zip file
    return zip.generateAsync({ type: "blob" }).then((blob) => {
      saveAs(
        blob,
        `${moment().format("YYYY-MM-DD")}_${
          lang === "M" ? "ZF" : lang === "1" ? "ZH" : "EN"
        }.zip`
      );
    });
  };

  useEffect(() => {
    if (isReadyToPrint && profiles) {
      if (profiles?.length > 0) {
        printZip();
      }
    }
  }, [isReadyToPrint, profiles]);

  return (
    <>
      <Row style={{ marginBottom: 10 }}>
        <Space align="end" size={"middle"}>
          <div>
            <p>請選擇列印語系:</p>
            <Radio.Group
              defaultValue={"E"}
              disabled={!AUFNRList || AUFNRList?.length < 1}
              onChange={(e) => setLang(e.target.value)}
            >
              <Radio.Button value="E">英文</Radio.Button>
              <Radio.Button value="M">繁中</Radio.Button>
              <Radio.Button value="1">簡中</Radio.Button>
            </Radio.Group>
          </div>
          <Button
            disabled={!AUFNRList || AUFNRList?.length < 1}
            loading={isCAUFVDLoading}
            type="primary"
            icon={<PrinterOutlined />}
            onClick={triggerPrint}
          >
            下載
          </Button>
        </Space>
      </Row>
      <Table
        style={{ marginBottom: 15 }}
        pagination={{
          position: ["topRight"],
          locale: { items_per_page: "筆/頁" },
        }}
        scroll={{ x: "85%", y: "120%" }}
        columns={AufnrColumns}
        dataSource={AUFNRList ?? []}
        loading={isAUFNRLoading}
        locale={{
          emptyText: (
            <Empty
              description="查無資料"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          ),
        }}
      />
    </>
  );
};

export default PrintTable;
