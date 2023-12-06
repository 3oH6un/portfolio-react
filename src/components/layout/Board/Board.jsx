import { PortfolioBox } from "@/components/PortfolioBox";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { GET_PORTFOLIO } from "@/modules/portfolio";
import { useParams } from "react-router-dom";

export function Board() {
  const dispatch = useDispatch();

  let portfolios = useSelector((state) => state.portfolio.portfolios);

  useEffect(() => {
    dispatch({ type: GET_PORTFOLIO });
  }, [dispatch]);
  const { num } = useParams();

  let filteredPortfolios = portfolios;

  if (num) {
    filteredPortfolios = portfolios.filter(
      (portfolio) => portfolio.category === parseInt(num, 10),
    );
  }

  useEffect(() => {
    console.log(portfolios);
  }, [portfolios]);

  return (
    <>
      <div id="portfolio-list" className="flex flex-col w-fit h-fit">
        {filteredPortfolios.map((portfolio) => (
          <PortfolioBox
            key={portfolio.num}
            num={portfolio.num}
            title={portfolio.title}
            category={portfolio.category}
            description={portfolio.description}
            repImg={portfolio.repImg}
          />
        ))}
      </div>
    </>
  );
}
