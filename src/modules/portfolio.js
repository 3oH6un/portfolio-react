import { createAction, handleActions } from "redux-actions";
import * as api from "@/lib/api";
import { takeLatest } from "redux-saga/effects";
import createRequestSaga from "@/lib/createRequestSaga";

export const GET_PORTFOLIO = "portfolio/GET_PORTFOLIO";
export const POST_PORTFOLIO = "portfolio/POST_PORTFOLIO";
export const PUT_PORTFOLIO = "portfolio/PUT_PORTFOLIO";
export const DELETE_PORTFOLIO = "portfolio/DELETE_PORTFOLIO";

export const GET_PORTFOLIO_SUCCESS = "portfolio/GET_PORTFOLIO_SUCCESS";
export const POST_PORTFOLIO_SUCCESS = "portfolio/POST_PORTFOLIO_SUCCESS";
export const PUT_PORTFOLIO_SUCCESS = "portfolio/PUT_PORTFOLIO_SUCCESS";
export const DELETE_PORTFOLIO_SUCCESS = "portfolio/DELETE_PORTFOLIO_SUCCESS";

export const getPortfolio = createAction(GET_PORTFOLIO);
export const postPortfolio = createAction(POST_PORTFOLIO);
export const putPortfolio = createAction(PUT_PORTFOLIO);
export const deletePortfolio = createAction(DELETE_PORTFOLIO);

const getPortfolioSaga = createRequestSaga(GET_PORTFOLIO, api.getPortfolios);
const postPortfolioSaga = createRequestSaga(POST_PORTFOLIO, api.postPortfolio);
const putPortfolioSaga = createRequestSaga(PUT_PORTFOLIO, api.putPortfolio);
const deletePortfolioSaga = createRequestSaga(
  DELETE_PORTFOLIO,
  api.deletePortfolio,
);

export function* portfolioSaga() {
  yield takeLatest(GET_PORTFOLIO, getPortfolioSaga);
  yield takeLatest(POST_PORTFOLIO, postPortfolioSaga);
  yield takeLatest(PUT_PORTFOLIO, putPortfolioSaga);
  yield takeLatest(DELETE_PORTFOLIO, deletePortfolioSaga);
}

const initialState = {
  portfolios: [],
};

const portfolio = handleActions(
  {
    [GET_PORTFOLIO_SUCCESS]: (state, action) => ({
      ...state,
      portfolios: action.payload,
    }),
    [POST_PORTFOLIO_SUCCESS]: (state, action) => ({
      ...state,
      portfolios: [...state.portfolios, action.payload],
    }),
    [PUT_PORTFOLIO_SUCCESS]: (state, action) => ({
      ...state,
      portfolios: state.portfolios.map((portfolio) =>
        portfolio.id === action.payload.id ? action.payload : portfolio,
      ),
    }),
    [DELETE_PORTFOLIO_SUCCESS]: (state, action) => ({
      ...state,
      portfolios: state.portfolios.filter(
        (portfolio) => portfolio.id !== action.payload,
      ),
    }),
  },
  initialState,
);

export default portfolio;
