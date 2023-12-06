import AddSvg from "@/assets/Icons/AddSvg.jsx";
import { useState } from "react";
import XSvg from "@/assets/Icons/XSvg.jsx";
import { useDispatch } from "react-redux";
import { postCategory } from "@/modules/category.js";

const AddCategoryButton = () => {
  const dispatch = useDispatch();
  const [isClicked, setIsClicked] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const handleOnClick = () => {
    setIsClicked(!isClicked);
  };
  const addCategoryHandler = () => {
    dispatch(postCategory(categoryName));
    setCategoryName("");
    handleOnClick();
  };

  return (
    <div className={"w-full h-full justify-center"}>
      {isClicked ? (
        <>
          <button onClick={handleOnClick}>
            <XSvg />
          </button>
          <input
            type="text"
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <button onClick={addCategoryHandler}>
            <AddSvg />
          </button>
        </>
      ) : (
        <button onClick={handleOnClick}>
          <AddSvg />
        </button>
      )}
    </div>
  );
};

export default AddCategoryButton;
