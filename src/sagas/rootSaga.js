import { all, fork } from "redux-saga/effects";
import watcherFetchDataSaga from "./handlers/fetchData";
import watchFilterDataSaga from "./handlers/filterData";

export default function* rootSaga() {
  yield all([fork(watcherFetchDataSaga), fork(watchFilterDataSaga)]);
}