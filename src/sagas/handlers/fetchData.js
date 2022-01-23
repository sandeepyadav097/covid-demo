import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import fetchData from "../requests/fetchData";

function* handleFetchData() {
  try {
    const data = yield call(fetchData);
    yield put({ type: "FETCH_DATA_SUCCESS", data: data });
  } catch (err) {
    yield put({ type: "FETCH_DATA_FAILED", message: err.message });
  }
}

function* watcherFetchDataSaga() {
  yield takeLatest("FETCH_DATA", handleFetchData);
}

export default watcherFetchDataSaga;