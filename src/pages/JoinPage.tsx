import { useState, ChangeEvent, FormEvent } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase/firebase.config";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const JoinPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");

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
    if (name === "displayName") {
      setDisplayName(value);
    }
  };

  const handleClickSignUp = async (event: FormEvent) => {
    event.preventDefault();
    console.log("test");
    const nowDate = dayjs().format("YY년 MM월 DD일 HH:mm:ss");

    // 이메일 형식이 아닌 경우
    const emailRegEx =
      /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
    const isEmailValid = emailRegEx.test(email);

    if (!isEmailValid) {
      alert("유효하지 않은 이메일 형식입니다");
      return false;
    }

    // 비밀번호 길이 조건이 안 맞는 경우
    const isPasswordValid = password.length >= 5;

    if (!isPasswordValid) {
      alert("비밀번호는 6자 이상 사용해야 합니다");
      return false;
    }

    // 닉네임 글씨 제한
    const isNicknameValid = displayName.length > 1 && displayName.length <= 10;

    if (!isNicknameValid) {
      alert("닉네임은 2자 이상 10자 이하로 설정해야 합니다");
      return false;
    }

    // 이메일 중복 확인
    const emailQuery = query(
      collection(db, "users"),
      where("email", "==", email),
    );
    const emailSnapshot = await getDocs(emailQuery);
    console.log(emailQuery);
    if (!emailQuery) {
      alert("이미 사용 중인 이메일입니다");
      console.log("사용중임");
      return false;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      await addDoc(collection(db, "users"), {
        userUid: user.uid,
        email,
        displayName,
        createAt: nowDate,
      });

      // Firebase 프로필 업데이트
      await updateProfile(user, {
        displayName: displayName,
      });
      console.log(userCredential);
      console.log("회원가입 완료");
      alert(`${displayName}님 환영합니다`);
    } catch (error) {
      console.error("회원가입 실패", error);
    }
  };

  return (
    <div className="App">
      <h2>회원가입 페이지</h2>
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
          <label>닉네임 : </label>
          <input
            type="text"
            value={displayName}
            name="displayName"
            onChange={handleClickOnChange}
            required
          ></input>
        </div>
        <button onClick={handleClickSignUp}>회원가입</button>
      </form>
    </div>
  );
};

export default JoinPage;
