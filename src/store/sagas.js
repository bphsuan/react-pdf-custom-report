import { all, fork } from "redux-saga/effects";
import PrintSaga from "../pages/Print/saga";

export default function* rootSaga() {
  yield all([fork(PrintSaga)]);
}
