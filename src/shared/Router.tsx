import React, {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import GlobalColor from "./styles/GlobalColor";
import GlobalFont from "./styles/GlobalFont";
import UserLayout from "../components/layouts/UserLayout";
import LoginPage from "../pages/LoginPage";
import JoinPage from "../pages/JoinPage";
import MainPage from "../pages/MainPage";
import LetterDetailPage from "../pages/LetterDetailPage";
import WritingLetterPage from "../pages/WritingLetterPage";
import { User } from "firebase/auth";
import PublicLayout from "../components/layouts/PublicLayout";
import MyPage from "../pages/MyPage";

const Router = ({ user }: { user: User | null }) => {
  return (
    <>
      <GlobalStyle />
      <GlobalColor />
      <GlobalFont />
      <BrowserRouter>
        {user ? (
          <Routes>
            <Route element={<UserLayout />}>
              <Route path="/" element={<MainPage />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/writingLetter" element={<WritingLetterPage />} />
              <Route path="/letterDetail" element={<LetterDetailPage />} />
              <Route path="/letterDetail/:id" element={<LetterDetailPage />} />
              <Route path="*" element={<Navigate to={"/"} replace />} />
            </Route>
          </Routes>
        ) : (
          <Routes>
            <Route element={<PublicLayout user={user} />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/join" element={<JoinPage />} />
              <Route path="*" element={<Navigate to={"login"} replace />} />
            </Route>
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
};

export default Router;
