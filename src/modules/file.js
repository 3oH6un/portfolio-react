import { createAction, handleActions } from "redux-actions";
import * as api from "@/lib/api";
import { takeLatest } from "redux-saga/effects";
import createRequestSaga from "@/lib/createRequestSaga";

export const GET_FILE = "file/GET_FILE";
export const GET_FILE_SUCCESS = "file/GET_FILE_SUCCESS";
export const POST_FILE = "file/POST_FILE";
export const POST_FILE_SUCCESS = "file/POST_FILE_SUCCESS";

export const getFile = createAction(GET_FILE);
export const postFile = createAction(POST_FILE, (file) => file);

const getFileSaga = createRequestSaga(GET_FILE, api.getFile);
const postFileSaga = createRequestSaga(POST_FILE, api.postFile);

export function* fileSaga() {
  yield takeLatest(GET_FILE, getFileSaga);
  yield takeLatest(POST_FILE, postFileSaga);
}

const initialState = {
  fileName: null,
};

const file = handleActions(
  {
    [GET_FILE_SUCCESS]: (state, action) => ({
      ...state,
      fileName: action.payload.fileName,
    }),
    [POST_FILE_SUCCESS]: (state, action) => ({
      ...state,
      fileName: action.payload,
    }),
  },
  initialState,
);

export default file;
