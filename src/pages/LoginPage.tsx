import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase.config";
import styled from "styled-components";
import logo from "../assets/logos/logo.png";
import googleLogo from "../assets/logos/googleLogo.png";
import githubLogo from "../assets/logos/githubLogo.png";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [displayName, setDisplayName] = useState<string | null>(null);

  // const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user !== null) {
      setDisplayName(user.displayName || null);
    }
  }, [user]);

  const handleClickOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  };

  const handleClickSignIn = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log(userCredential);
      console.log("로그인완료");
      alert(`${displayName}님 안녕하세요`);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  // 구글 로그인
  const signInWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();

    signInWithPopup(auth, googleProvider)
      .then((res) => {
        const credential: any = GoogleAuthProvider.credentialFromResult(res);
        const token = credential.accessToken;
        const userName = res.user.displayName;

        // local storage에 token, username 저장해주기
        console.log(token);
        console.log(userName);

        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleClickGoogle = async (event: FormEvent) => {
    event.preventDefault();
    await signInWithGoogle();
  };

  // 깃허브 로그인
  const signInWithGithub = async () => {
    const githubProvider = new GithubAuthProvider();

    signInWithPopup(auth, githubProvider)
      .then((res) => {
        const credential: any = GithubAuthProvider.credentialFromResult(res);
        const token = credential.accessToken;
        const userName = res.user.displayName;

        // local storage에 token, username 저장해주기
        console.log(token);
        console.log(userName);

        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleClickGitHub = async (event: FormEvent) => {
    event.preventDefault();
    await signInWithGithub();
  };

  return (
    <SLoginPageWrapper>
      <SLoginPageLogo
        onClick={() => {
          navigate("/");
        }}
      />
      <SLoginPageSecondWrapper>
        <SLoginPageTitle>로그인</SLoginPageTitle>
        <SLoginPageForm>
          <SLoginPageInputWrapper>
            <label>이메일</label>
            <input
              type="email"
              value={email}
              name="email"
              onChange={handleClickOnChange}
              required
            ></input>
          </SLoginPageInputWrapper>
          <SLoginPageInputWrapper>
            <label>비밀번호</label>
            <input
              type="password"
              value={password}
              name="password"
              onChange={handleClickOnChange}
              required
            ></input>
          </SLoginPageInputWrapper>
          <SLoginPageLoginButton onClick={handleClickSignIn}>
            로그인
          </SLoginPageLoginButton>
          <SLoginPageInputWrapper>
            <label>소셜계정으로 로그인</label>
            <SLoginPageSocialButtonWrapper>
              <SLoginPageGoogleLogin
                onClick={handleClickGoogle}
              ></SLoginPageGoogleLogin>
              <SLoginPageGithubLogin
                onClick={handleClickGitHub}
              ></SLoginPageGithubLogin>
            </SLoginPageSocialButtonWrapper>
          </SLoginPageInputWrapper>

          <SLoginPageJoinButton
            onClick={() => {
              navigate("/join");
            }}
          >
            회원가입으로 이동
          </SLoginPageJoinButton>
        </SLoginPageForm>
      </SLoginPageSecondWrapper>
    </SLoginPageWrapper>
  );
};

export default LoginPage;

const SLoginPageWrapper = styled.div`
  background-color: var(--header-color);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const SLoginPageSecondWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: blue;
  width: 600px;
  height: 700px;
  border-radius: 40px;
  background: #fff;
  box-shadow: 0px 4px 23px 5px rgba(0, 0, 0, 0.05);
`;

const SLoginPageLogo = styled.div`
  background-image: url(${logo});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  width: 150px;
  height: 60px;
  flex-shrink: 0;
  margin: 30px;
  cursor: pointer;
`;

const SLoginPageTitle = styled.h2`
  color: var(--button-background);
  font-size: 28px;
  margin-bottom: 40px;
`;

const SLoginPageForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SLoginPageInputWrapper = styled.div`
  display: flex;
  flex-direction: column;

  label {
    color: var(--button-background);
    font-size: 20px;
    margin-bottom: 18px;
  }
  input {
    border-radius: 10px;
    background: #f9fafb;
    font-family: Pretendard;
    font-size: 18px;
    font-weight: 600;
    color: var(--button-background);
    border: none;
    width: 520px;
    height: 60px;
    flex-shrink: 0;
    padding-left: 20px;
    margin-bottom: 36px;
  }
`;

const SLoginPageSocialButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

const SLoginPageLoginButton = styled.button`
  border-radius: 20px;
  background: var(--button-background);
  color: #fff;
  font-size: 22px;
  width: 540px;
  height: 58px;
  padding: 0;
  cursor: pointer;
  margin-top: 19px;
  margin-bottom: 55px;
`;

const SLoginPageJoinButton = styled.button`
  font-family: Pretendard;
  margin-top: 30px;
  font-size: 16px;
  color: #b1b1b1;
`;

export const SLoginPageGoogleLogin = styled.button`
  background-image: url(${googleLogo});
  width: 75px;
  height: 75px;
  border: none;
  background-color: transparent;
  background-size: 100%;
  background-repeat: no-repeat;
  cursor: pointer;
`;

export const SLoginPageGithubLogin = styled.button`
  background-image: url(${githubLogo});
  width: 75px;
  height: 75px;
  border: none;
  background-color: transparent;
  background-size: 100%;
  background-repeat: no-repeat;
  cursor: pointer;
`;
