import { all } from "redux-saga/effects";
import { categorySaga } from "@/modules/category";
import { fileSaga } from "@/modules/file.js";
import { portfolioSaga } from "@/modules/portfolio.js";

function* rootSaga() {
  yield all([
    // 다른 모듈의 사가 추가
    categorySaga(),
    portfolioSaga(),
    fileSaga(),
  ]);
}

export default rootSaga;
