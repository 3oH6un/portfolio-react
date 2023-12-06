import jsPDF from "jspdf";
import html2canvas from "html2canvas";

/**
 * 이미지 파일 데이터를 pdf에 담고 저장
 * @param fieName : 파일명
 * @param imageData : 이미지파일 데이터
 */
export async function makePDFWithImage(fieName, htmlTag) {
  // convert html to canvas then get dataUrl of image
  const imageData = await getImgDataUrlFromHTML2Canvas(htmlTag);

  const imgOriginWidthmm = htmlTag.clientWidth * 0.2646; // px to mm
  const imgOriginHeightmm = htmlTag.clientHeight * 0.2646; // px to mm

  // pdf 생성 ('landscape' || 'portrait')
  const pdfDoc = new jsPDF(
    imgOriginWidthmm > imgOriginHeightmm ? "landscape" : "portrait",
    "mm",
    "a4",
  );
  const pdfDocA4Widthmm = pdfDoc.internal.pageSize.getWidth();
  const pdfDocA4Heightmm = pdfDoc.internal.pageSize.getHeight();

  let imgSizeWidth = 0;
  let imgSizeHeight = 0;
  imgSizeWidth = pdfDocA4Widthmm - 10 * 2;
  imgSizeHeight = imgSizeWidth * (imgOriginHeightmm / imgOriginWidthmm);
  imgSizeHeight =
    imgSizeHeight > pdfDocA4Heightmm
      ? pdfDocA4Heightmm - 20 * 2
      : imgSizeHeight;
  pdfDoc.addImage(imageData, "PNG", 10, 20, imgSizeWidth, imgSizeHeight);
  pdfDoc.save(`${fieName}.pdf`);
}

/**
 * html 태그 영역을 이미지파일로 생성 후 해당 dataUrl 스트링 반환
 * @param htmlTag 캡쳐 영역의 html tag
 * @returns
 */
export async function getImgDataUrlFromHTML2Canvas(htmlTag) {
  const canvas = await html2canvas(htmlTag, {
    backgroundColor: "#ffffff",
    logging: true,
    letterRendering: 1,
    useCORS: true,
  });
  const imgDataUrl = canvas.toDataURL("image/png", 1);
  return imgDataUrl;
}

// https://velog.io/@darcyu83/React-%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7-pdf
