import { TuiViewer } from "@/components/Viewer";
import { Link, useParams } from "react-router-dom";
import BackSvg from "@/assets/Icons/BackSvg";
import { useDispatch, useSelector } from "react-redux";
import { GET_PORTFOLIO } from "@/modules/portfolio.js";
import { useEffect, useRef } from "react";
import { makePDFWithImage } from "@/lib/getPdf.js";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function Portfolio() {
  const dispatch = useDispatch();
  const viewerRef = useRef();
  useEffect(() => {
    dispatch({ type: GET_PORTFOLIO });
  }, [dispatch]);

  const exportAsPdf = () => {
    const element = document.getElementById("tui-viewer");
    html2canvas(element, {
      backgroundColor: "#ffffff",
      logging: true,
      letterRendering: 1,
      useCORS: true,
      height: element.scrollHeight,
      windowHeight: element.scrollHeight,
    }).then((canvas) => {
      const pdf = new jsPDF("p", "mm", "a4");
      const imgData = canvas.toDataURL("img/png");
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      // 출처: https://soye0n.tistory.com/247 [코린이의 기록:티스토리]
      // 출처: https://soye0n.tistory.com/247 [코린이의 기록:티스토리]
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      //soye0n.tistory.com/247 [코린이의 기록:티스토리]
      // pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("download.pdf");
    });
    // const asdf = makePDFWithImage(
    //   "asdfasdf",
    //   document.getElementById("tui-viewer"),
    // );
    // console.log(asdf);
  };

  const { num } = useParams();
  const portfolios = useSelector((state) => state.portfolio.portfolios);
  const categories = useSelector((state) => state.category.categories);

  console.log(portfolios);
  console.log(num);

  // 주의: num은 문자열일 수 있으므로 num을 숫자로 변환하여 비교합니다.
  const selectedPortfolio = portfolios.find(
    (portfolio) => portfolio.num === parseInt(num, 10),
  );
  const selectedCategory = categories.find(
    (category) => category.num === selectedPortfolio.category,
  );
  console.log(selectedPortfolio);

  return (
    <>
      <div className="container h-fit">
        <div className="flex m-2 p-2 justify-between">
          <div className="flex items-center flex-row">
            <button className="mr-2">
              <Link to="/">
                <BackSvg />
              </Link>
            </button>
            <h1 className="text-3xl font-bold">{selectedPortfolio.title}</h1>
          </div>
          <div className="text-2xl breadcrumbs">
            <ul>
              <li>
                <a>Category</a>
              </li>
              <li>{selectedCategory.name}</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col m-2 p-2">
          <TuiViewer
            content={selectedPortfolio.content}
            viewerRef={viewerRef}
          />
          <div className="self-end mt-5">
            <button className="btn btn-primary" onClick={exportAsPdf}>
              PDF로 출력
            </button>
            <button className="btn ml-3 btn-primary">수정하기</button>
          </div>
        </div>
      </div>
    </>
  );
}
