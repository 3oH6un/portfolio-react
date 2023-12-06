import { Board } from "@/components/layout/Board";
import { GET_PORTFOLIO } from "@/modules/portfolio.js";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { GET_CATEGORY } from "@/modules/category.js";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: GET_PORTFOLIO });
  }, [dispatch]);
  useEffect(() => {
    dispatch({ type: GET_CATEGORY });
  }, [dispatch]);

  return (
    <>
      <Board />
    </>
  );
}
