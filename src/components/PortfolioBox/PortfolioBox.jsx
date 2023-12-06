import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export function PortfolioBox({ num, title, category, description, repImg }) {
  const categories = useSelector((state) => state.category.categories);
  const selectedCategory = categories.find(
    (categories) => categories.num === category,
  ).name;

  return (
    <div className="container card lg:card-side bg-base-300 shadow-xl">
      <figure>
        <img
          src={`http://localhost:8001/api/file/${repImg}`}
          alt="Album"
          className={"w-96 h-96 fit-cover"}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{selectedCategory}</p>
        {description && <p className={"max-w-[30rem]"}>{description}</p>}
        <div className="card-actions justify-end">
          <Link to={`/portfolio/${num}`}>
            <button className="btn btn-primary">자세히 보기</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
