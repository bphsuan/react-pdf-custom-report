import React, { useEffect, useState } from "react";
import { PageContainer } from "@ant-design/pro-layout";
import { useDispatch } from "react-redux";
import PrintTable from "./components/PrintTable";
import * as S from "./index.styles";
import { getAUFNRListRequest } from "./slice";

const Print = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAUFNRListRequest());
  });
  return (
    <PageContainer>
      <S.Section>
        <p>生產工單列印</p>
      </S.Section>
      <S.Container>
        <PrintTable />
      </S.Container>
    </PageContainer>
  );
};

export default Print;
