import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import GlobalColor from "./styles/GlobalColor";
import GlobalFont from "./styles/GlobalFont";
import LayoutPage from "../pages/LayoutPage";
import LoginPage from "../pages/LoginPage";
import JoinPage from "../pages/JoinPage";
import MainPage from "../pages/MainPage";
import MyPage from "../pages/MyPage";
import LetterDetailPage from "../pages/LetterDetailPage";
import WritingLetter from "../pages/WritingLetter";

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
            <Route path="/my" element={<MyPage />} />
            <Route path="/writingLetter" element={<WritingLetter />} />
          </Route>
          {/* ReadLetterPage : 임시경로 */}
          <Route path="/letterDetail" element={<LetterDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/join" element={<JoinPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
