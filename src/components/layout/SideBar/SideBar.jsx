import { Link } from "react-router-dom";
import ProfileSvg from "../../../assets/Icons/ProfileSvg";
import DocsSvg from "@/assets/Icons/DocsSvg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCategory } from "@/modules/category";
import AddCategoryButton from "@/components/common/AddCategoryButton";

export function SideBar() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  return (
    <aside id="sidebar" className="side-bar">
      <ul id="category-list" className=" flex-col menu menu-lg">
        <li>카테고리</li>
        <li id="category-list-item-2">
          <Link to="/profile">
            <ProfileSvg />
            프로필
          </Link>
        </li>
        <li>
          <details open>
            <summary>
              <DocsSvg />
              포트폴리오
            </summary>
            <ul>
              <Link to={"/"}>
                <li key="view-all">
                  <button>전체보기</button>
                </li>
              </Link>
              {categories.map((category) => (
                <li key={category.num}>
                  <Link to={`/${category.num}`}>
                    <button>{category.name}</button>
                  </Link>
                </li>
              ))}
              <li key="add-category">
                <AddCategoryButton />
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </aside>
  );
}
