import { useState, ChangeEvent, FormEvent } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase.config";
import styled from "styled-components";
import fullLogo from "../assets/logos/fullLogo.png";
import googleLogo from "../assets/logos/googleLogo.png";
import githubLogo from "../assets/logos/githubLogo.png";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

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

  const handleBlur = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name },
    } = event;

    // 에러 메시지 초기화
    if (name === "email") {
      setEmailError("");
    } else if (name === "password") {
      setPasswordError("");
    }

    // 이메일 형식이 아닌 경우
    const emailRegEx =
      /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
    const isEmailValid = emailRegEx.test(email);

    if (!isEmailValid) {
      setEmailError("유효하지 않은 이메일 형식입니다");
      return false;
    }

    // 비밀번호 길이 조건이 안 맞는 경우
    const isPasswordValid = password.length >= 5;

    if (!isPasswordValid) {
      setPasswordError("비밀번호는 6자 이상 사용해야 합니다");

      return false;
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

      alert(`${userCredential.user.displayName}님 안녕하세요`);
      navigate("/");
    } catch (error) {
      alert("로그인에 실패했습니다");
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

        alert(`${userName}님 환영합니다!`);
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

        console.log(token);

        alert(`${userName}님 환영합니다!`);

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
      <SLoginPageLogo />
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
              placeholder="example@zum.com"
              onBlur={handleBlur}
            ></input>
          </SLoginPageInputWrapper>
          {emailError && <SErrorMessage>{emailError}</SErrorMessage>}
          <SLoginPageInputWrapper>
            <label>비밀번호</label>
            <input
              type="password"
              value={password}
              name="password"
              onChange={handleClickOnChange}
              required
              placeholder="영문 + 숫자 조합으로 6자 이상 입력해주세요 :)"
              onBlur={handleBlur}
            ></input>
          </SLoginPageInputWrapper>
          {passwordError && <SErrorMessage>{passwordError}</SErrorMessage>}
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
  background-image: url(${fullLogo});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  width: 418px;
  height: 61px;
  flex-shrink: 0;
  margin: 30px;
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
  align-items: center;
  gap: 30px;
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
    /* margin-bottom: 36px; */
  }
  input::placeholder {
    color: #e2e2e2;
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
`;

const SLoginPageJoinButton = styled.button`
  font-family: Pretendard;

  font-size: 16px;
  color: #b1b1b1;
  width: 140px;
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

const SErrorMessage = styled.div`
  color: #ff6d6d;
  font-size: 14px;
  margin-top: -22px;
  margin-bottom: -22px;
  font-family: Pretendard;
  width: 100%;
`;
