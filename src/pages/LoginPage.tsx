import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [displayName, setDisplayName] = useState<string | null>(null);

  const auth = getAuth();
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
    } catch (error) {
      console.error(error);
    }
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

        <button onClick={handleClickSignIn}>로그인</button>
      </form>
    </div>
  );
};

export default LoginPage;
