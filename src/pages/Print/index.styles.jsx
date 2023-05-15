import styled from "styled-components";
import { Form as AntdForm, Radio as AntdRadio } from "antd";

export const Section = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-block-start: 0px;
  padding-block-end: 12px;
  padding-inline-end: 55px;
  padding-inline-start: 40px;

  p {
    margin-inline-end: 12px;
    margin-block-end: 0;
    color: rgba(0, 0, 0, 0.88);
    font-weight: 600;
    font-size: 20px;
    line-height: 32px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export const Container = styled.div`
  padding: 30px 20px 0 !important;

  @media screen and (max-width: 580px) {
    padding-bottom: 20px;
  }
`;

export const PureContainer = styled.div`
  padding: 10px 20px !important;
`;

export const Form = styled(AntdForm)`
  .ant-picker {
    width: 100%;
  }
  .ant-picker-input > input {
    text-align: center;
  }
  .ant-select-selection-overflow {
    flex-wrap: unset;
  }
`;

export const PrintSection = styled.div`
  width: 567px;
  max-width: 567px;

  table td {
    padding: 5px;
    text-align: center;
    vertical-align: middle;
    line-height: 10px;
    img {
      display: block;
      width: 80px;
      height: auto;
      margin-left: auto;
      margin-right: auto;
    }
  }

  table .td-alignleft {
    text-align: left !important;
    vertical-align: middle;
  }

  /*td 文字顯示中上*/
  table .td-explaintopcenter {
    vertical-align: top;
    position: relative;
    font-size: 10px;
  }
  table .td-explaintopcenter span {
    position: absolute;
    top: 10;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    font-size: 6px;
  }

  /*td 文字顯示左上角*/
  table .td-explainleft {
    vertical-align: top;
    position: relative;
    font-size: 10px;
  }

  table .td-explainleft span {
    position: absolute;
    left: 5px;
    top: 10;
    font-size: 6px;
  }

  /*td 文字顯示中下*/
  table .td-explainbottomcenter {
    position: relative;
    font-size: 10px;
  }
  table .td-explainbottomcenter span {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    font-size: 6px;
  }

  div.page-footer {
    text-align: center;
    height: 50px;
    font-size: 10px;
    opacity: 0.8;
    position: fixed;
    bottom: 0;
    width: 100%;
  }

  /* div.page-footer::after {
    content: 'Page ' counter(page) ' of ' counter(pages);
  } */

  div.page-footer p {
    margin: 0;
  }

  table.report-container {
    page-break-after: always;
    width: 100%;
    margin: 0 auto;
  }

  thead.report-header {
    display: table-header-group;
  }

  tfoot.report-footer {
    display: table-footer-group;
  }

  div.header-info {
    height: 30px;
  }

  div.page-header {
    text-align: center;
    height: 50px;
    font-size: 10px;
    opacity: 0.8;
    position: fixed;
    top: 10;
    width: 100%;
  }

  div.footer-info,
  div.page-footer {
    display: none;
    height: 60px;
  }

  .receive,
  .operation {
    display: none;
  }

  @media print {
    @page {
      margin: 10mm;
    }
    div.page-header,
    div.page-footer,
    div.footer-info {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    .receive,
    .operation {
      display: inline-table;
      table-layout: fixed;
      td {
        word-wrap: break-word;
      }
    }
  }
`;
