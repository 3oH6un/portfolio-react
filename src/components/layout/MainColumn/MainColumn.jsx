import { PortfolioBox } from "@/components/PortfolioBox";

export function Board() {
  return (
    <>
      <div id="portfolio-list" className="flex flex-col w-fit h-fit">
        <PortfolioBox />
        <PortfolioBox />
      </div>
    </>
  );
}
