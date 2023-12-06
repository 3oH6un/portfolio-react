import { createAction, handleActions } from "redux-actions";
import * as api from "@/lib/api";
import { takeLatest } from "redux-saga/effects";
import createRequestSaga from "@/lib/createRequestSaga";

export const GET_CATEGORY = "category/GET_CATEGORY";
export const POST_CATEGORY = "category/POST_CATEGORY";
export const PUT_CATEGORY = "category/PUT_CATEGORY";
export const DELETE_CATEGORY = "category/DELETE_CATEGORY";
export const GET_CATEGORY_SUCCESS = "category/GET_CATEGORY_SUCCESS";
export const POST_CATEGORY_SUCCESS = "category/POST_CATEGORY_SUCCESS";
export const PUT_CATEGORY_SUCCESS = "category/PUT_CATEGORY_SUCCESS";
export const DELETE_CATEGORY_SUCCESS = "category/DELETE_CATEGORY_SUCCESS";

export const getCategory = createAction(GET_CATEGORY);
export const postCategory = createAction(POST_CATEGORY);
export const putCategory = createAction(PUT_CATEGORY);
export const deleteCategory = createAction(DELETE_CATEGORY);

const getCategorySaga = createRequestSaga(GET_CATEGORY, api.getCategories);
const postCategorySaga = createRequestSaga(POST_CATEGORY, api.postCategory);
const putCategorySaga = createRequestSaga(PUT_CATEGORY, api.putCategory);
const deleteCategorySaga = createRequestSaga(
  DELETE_CATEGORY,
  api.deleteCategory,
);

export function* categorySaga() {
  yield takeLatest(GET_CATEGORY, getCategorySaga);
  yield takeLatest(POST_CATEGORY, postCategorySaga);
  yield takeLatest(PUT_CATEGORY, putCategorySaga);
  yield takeLatest(DELETE_CATEGORY, deleteCategorySaga);
}

const initialState = {
  categories: [],
};

const category = handleActions(
  {
    [GET_CATEGORY_SUCCESS]: (state, action) => ({
      ...state,
      categories: action.payload,
    }),
    [POST_CATEGORY_SUCCESS]: (state, action) => ({
      ...state,
      categories: [...state.categories, action.payload],
    }),
    [PUT_CATEGORY_SUCCESS]: (state, action) => ({
      ...state,
      categories: state.categories.map((category) =>
        category.id === action.payload.id ? action.payload : category,
      ),
    }),
    [DELETE_CATEGORY_SUCCESS]: (state, action) => ({
      ...state,
      categories: state.categories.filter(
        (category) => category.id !== action.payload,
      ),
    }),
  },
  initialState,
);

export default category;
