import { call, put } from "redux-saga/effects";
import { finishLoading, startLoading } from "@/modules/loading.js";

export default function createRequestSaga(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action) {
    yield put(startLoading(type)); // 로딩 시작
    try {
      const response = yield call(request, action.payload);
      yield put({
        type: SUCCESS,
        payload: response.data,
      }); // 성공
    } catch (e) {
      yield put({
        type: FAILURE,
        payload: e,
        error: true,
      }); // 실패
    }
    yield put(finishLoading(type)); // 로딩 완료
  };
}
