import { TuiEditor } from "@/components/Editor";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BackSvg from "@/assets/Icons/BackSvg";
import { useDispatch, useSelector } from "react-redux";
import { POST_PORTFOLIO } from "@/modules/portfolio.js";

export function Write() {
  const categories = useSelector((state) => state.category.categories);
  const navigate = useNavigate();
  const editorRef = useRef();
  const titleRef = useRef();
  const categoryRef = useRef();
  const descriptionRef = useRef();

  const [repImg, setRepImg] = useState();
  const addRepImg = (e) => {
    setRepImg(e.target.files[0]);
  };

  // 업로드된 모든 이미지의 경로를 저장하는 배열
  const [uploadedImages, setUploadedImages] = useState([]);
  const addUploadedImage = (image) => {
    setUploadedImages((prevImages) => [...prevImages, image]);
  };

  const extractFilenames = (content) => {
    // 정규식 패턴
    const pattern = /filename=([^&)]+)/g;

    // 정규식 매칭 결과를 담을 배열
    const filenames = [];
    let match;

    // 정규식에 맞는 모든 결과를 추출하여 배열에 담음
    while ((match = pattern.exec(content)) !== null) {
      filenames.push(match[1]);
    }

    return filenames;
  };
  const dispatch = useDispatch();

  const handleSave = () => {
    const markDownContent = editorRef.current.getInstance().getMarkdown();

    if (!titleRef.current?.value) {
      alert("제목을 입력하세요.");
      return;
    }
    if (categoryRef.current?.value === "카테고리 선택") {
      alert("카테고리를 선택하세요.");
      return;
    }
    if (!descriptionRef.current?.value) {
      alert("한 줄 설명을 입력하세요.");
      return;
    }
    if (!markDownContent || markDownContent === " ") {
      alert("내용을 입력하세요.");
      return;
    }
    if (!repImg) {
      alert("대표 사진을 선택하세요.");
      return;
    }
    const selectedCategory = categories.find(
      (categories) => categories.name === categoryRef.current.value,
    );
    const usedImages = extractFilenames(markDownContent);
    const portfolioRequest = {
      title: titleRef.current.value,
      category: selectedCategory.num,
      description: descriptionRef.current.value,
      content: markDownContent,
      uploadedImgs: uploadedImages,
      usedImgs: usedImages,
    };
    dispatch({ type: POST_PORTFOLIO, payload: { portfolioRequest, repImg } });
    alert("글쓰기가 완료되었습니다.");
    navigate("/");
  };

  return (
    <>
      <div className="container ">
        <div className="flex m-2 p-2 justify-between">
          <div className="flex items-center flex-row">
            <button className="mr-2">
              <Link to="/">
                <BackSvg />
              </Link>
            </button>
            <h1 className="text-3xl font-bold">글 작성</h1>
          </div>
        </div>
        <div className="flex items-center mx-4">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">제목</span>
            </div>
            <input
              type="text"
              placeholder="제목을 입력하세요."
              className="input input-bordered w-full"
              ref={titleRef}
            />
          </label>
          <label className="form-control w-full max-w-xs  ml-5">
            <div className="label">
              <span className="label-text">카테고리</span>
            </div>
            <select
              className="select select-bordered w-full max-w-xs"
              ref={categoryRef}
              key={"category-select"}
            >
              <option disabled selected key={"disabled"}>
                카테고리 선택
              </option>
              {categories.map((category) => (
                <option key={category.id}>{category.name}</option>
              ))}
            </select>
          </label>
        </div>
        <label className="form-control m-4">
          <div className="label">
            <span className="label-text">한 줄 설명</span>
          </div>
          <input
            type="text"
            placeholder="한 줄 설명을 입력하세요."
            className="input input-bordered"
            ref={descriptionRef}
          />
        </label>
        <TuiEditor
          editorRef={editorRef}
          addImage={addUploadedImage}
          theme="dark"
        />
      </div>
      <div className="flex justify-between">
        <label className="form-control w-full max-w-xs m-2">
          <div className="label">
            <span className="label-text">대표 사진</span>
          </div>
          <input
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
            onChange={addRepImg}
          />
        </label>
        <button className="btn m-4 btn-primary self-end" onClick={handleSave}>
          등록
        </button>
      </div>
    </>
  );
}
