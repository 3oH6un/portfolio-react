import "./App.css";
import { NavBar } from "./components/layout/NavBar";
import { SideBar } from "./components/layout/SideBar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { Write } from "./pages/Write";
import { Portfolio } from "./pages/Portfolio";
import { Profile } from "./pages/Profile";
import { GET_PORTFOLIO } from "@/modules/portfolio.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GET_CATEGORY } from "@/modules/category.js";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: GET_PORTFOLIO });
  }, [dispatch]);
  useEffect(() => {
    dispatch({ type: GET_CATEGORY });
  }, [dispatch]);
  return (
    <>
      <SideBar />
      <div className="flex flex-col">
        <NavBar />
        <article className="main-container flex-col float-right">
          <main className="flex flex-col">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/write" element={<Write />} />
              <Route path="/portfolio/:num" element={<Portfolio />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/:num" element={<Home />} />
              <Route path="*" element={<>hi</>}></Route>
            </Routes>
          </main>
        </article>
      </div>
    </>
  );
}

export default App;
