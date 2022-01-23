import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import filterData from "../requests/filterData";

function* handleFilterData(action) {
  try {
    const data = yield call(filterData, action.payload);
    yield put({ type: "FILTER_DATA_SUCCESS", data: data });
  } catch (err) {
    yield put({ type: "FILTER_DATA_FAILED", message: err.message });
  }
}

function* watchFilterDataSaga() {
  yield takeLatest("FILTER_DATA", handleFilterData);
}

export default watchFilterDataSaga;