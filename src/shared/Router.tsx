import React, {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import GlobalColor from "./styles/GlobalColor";
import GlobalFont from "./styles/GlobalFont";
import LayoutPage from "../pages/LayoutPage";
import LoginPage from "../pages/LoginPage";
import JoinPage from "../pages/JoinPage";
import MainPage from "../pages/MainPage";
import MyPage from "../pages/MyPage";
import LetterDetailPage from "../pages/LetterDetailPage";
import WritingLetterPage from "../pages/WritingLetterPage";
import { User } from "firebase/auth";
import { ReactNode } from "react";

const Router = ({ user }: { user: User | null }) => {
  return (
    <>
      <GlobalStyle />
      <GlobalColor />
      <GlobalFont />
      <BrowserRouter>
        {user ? (
          <Routes>
            <Route element={<LayoutPage />}>
              <Route path="/" element={<MainPage />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/writingLetter" element={<WritingLetterPage />} />
              <Route path="/letterDetail" element={<LetterDetailPage />} />
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

function PublicLayout({ user }: { user: User | null }) {
  const navigate = useNavigate();

  if (user) {
    navigate("/");

    return null;
  }

  return <Outlet />;
}

export default Router;
