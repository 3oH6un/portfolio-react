import { Link } from "react-router-dom";
import WriteSvg from "@/assets/Icons/WriteSvg";

export function NavBar() {
  return (
    <header id="navbar" className="navbar nav-bar">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          웅회's Portfolio
        </Link>
      </div>
      <div className="flex-none gap-2">
        <button className="mr-2">
          <Link to="/write">
            <WriteSvg />
          </Link>
        </button>
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
        <div className="dropdown dropdown-end">
          {/* <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
              />
            </div>
          </div> */}
          <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
