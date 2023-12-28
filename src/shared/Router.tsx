import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import GlobalColor from "./styles/GlobalColor";
import GlobalFont from "./styles/GlobalFont";
import LayoutPage from "../pages/LayoutPage";
import LoginPage from "../pages/LoginPage";
import JoinPage from "../pages/JoinPage";
import MainPage from "../pages/MainPage";
import MyPage from "../pages/MyPage";

const Router = () => {
  return (
    <>
      <GlobalStyle />
      <GlobalColor />
      <GlobalFont />
      <BrowserRouter>
        <Routes>
          <Route element={<LayoutPage />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/My" element={<MyPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/join" element={<JoinPage />} />
          
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
