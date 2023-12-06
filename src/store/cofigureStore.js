import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

// const sagaMiddleware = createSagaMiddleware();
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  // middleware: [sagaMiddleware],
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(sagaMiddleware);
  },
});

sagaMiddleware.run(rootSaga);

export default store;
