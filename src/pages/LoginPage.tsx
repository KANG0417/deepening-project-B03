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
    <div className="App">
      <h2>로그인 페이지</h2>
      <form>
        <div>
          <label>이메일 : </label>
          <input
            type="email"
            value={email}
            name="email"
            onChange={handleClickOnChange}
            required
          ></input>
        </div>
        <div>
          <label>비밀번호 : </label>
          <input
            type="password"
            value={password}
            name="password"
            onChange={handleClickOnChange}
            required
          ></input>
        </div>
        <div>
          <label>소셜계정으로 로그인</label>
          <div>
            <button onClick={handleClickGoogle}>구글 로그인</button>
            <button onClick={handleClickGitHub}>깃허브 로그인</button>
          </div>
        </div>
        <button onClick={handleClickSignIn}>로그인</button>
        <button
          onClick={() => {
            navigate("/join");
          }}
        >
          회원가입으로 이동
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
