// App.js
import { useState, ChangeEvent, FormEvent } from "react";
import { JoinPageProps } from "../type/joinPage";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const JoinPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
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

  const signUp = (event: FormEvent) => {
    console.log("여인준");
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // 회원가입 성공시
        console.log(userCredential);
      })
      .catch((error) => {
        // 회원가입 실패시
        console.error(error);
      });
  };
  const signIn = (event: FormEvent) => {
    event.preventDefault();
  };
  const logOut = (event: FormEvent) => {
    event.preventDefault();
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
            onChange={onChange}
            required
          ></input>
        </div>
        <div>
          <label>비밀번호 : </label>
          <input
            type="password"
            value={password}
            name="password"
            onChange={onChange}
            required
          ></input>
        </div>
        <button onClick={signUp}>회원가입</button>
        <button onClick={signIn}>로그인</button>
        <button onClick={logOut}>로그아웃</button>
      </form>
    </div>
  );
};

export default JoinPage;
