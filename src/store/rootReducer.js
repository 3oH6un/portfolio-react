import { combineReducers } from "redux";
import category from "@/modules/category";
import file from "@/modules/file.js";
import portfolio from "@/modules/portfolio.js";

const rootReducers = combineReducers({
  portfolio,
  category,
  file,
});

export default rootReducers;
