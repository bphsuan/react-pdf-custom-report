import { message } from "antd";
import { put, takeLatest } from "redux-saga/effects";
import {
  getCAUFVDSuccess,
  getCAUFVDFailure,
  getAUFNRListSuccess,
  getAUFNRListFailure,
} from "./slice";
import PrintLang from "../../i18n/print.i18n.json";
import { AUFNRList, AUFNRDetailInfos } from "./mock";

const groupBy = (objectArray, property) => {
  return objectArray.reduce((acc, obj) => {
    const key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
};

const getTranslation = (key, lang) => {
  return lang ? PrintLang[lang][key] : PrintLang["E"][key];
};

function* GetCAUFVDRequest({ payload }) {
  try {
    // const { data } = yield call(getCAUFVDApi, payload)
    let result =
      AUFNRDetailInfos?.map((item) => ({
        header: {
          ...item.LG01_HEADER[0],
          PRT: item.LG01_HEADER[0].STTXT.split(" ").includes("PRT")
            ? getTranslation("Duplicate", payload.LANGU)
            : getTranslation("Original", payload.LANGU),
        },
        pureBody1: item.LG01_BODY1.sort((a, b) => a.VORNR - b.VORNR),
        body1: groupBy(item.LG01_BODY1, "PLNFL"),
        body2: groupBy(item.LG01_BODY2, "VORNR"),
      })) ?? [];
    yield put(getCAUFVDSuccess(result));
  } catch (e) {
    message.error(`失敗: ${e}, ${e?.response?.data?.message ?? ""}`);
    yield put(getCAUFVDFailure());
  }
}

function* GetAUFNRListRequest() {
  try {
    // const response = yield call(getAUFNRListApi, payload);
    const result = AUFNRList.map((item) => ({
      ...item,
      key: item.AUFNR,
    }));
    yield put(getAUFNRListSuccess(result));
  } catch (e) {
    message.error(`失敗: ${e}, ${e?.response?.data?.message ?? ""}`);
    yield put(getAUFNRListFailure());
  }
}

function* printSaga() {
  yield takeLatest("printProfile/getCAUFVDRequest", GetCAUFVDRequest);
  yield takeLatest("printProfile/getAUFNRListRequest", GetAUFNRListRequest);
}

export default printSaga;
