import { useState, ChangeEvent, FormEvent } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase/firebase.config";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import styled from "styled-components";
import logo from "../assets/logos/logo.png";

const JoinPage = () => {
  const navigate = useNavigate();

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
    console.log("emailQuery", emailQuery);

    const emailSnapshot = await getDocs(emailQuery);
    console.log("emailSnapshot", emailSnapshot.docs);
    console.log("이거이거", emailSnapshot.empty);

    if (!emailSnapshot.empty) {
      alert("이미 사용 중인 이메일입니다");
      console.log("사용중임");
      window.location.reload();
      return false;
    } else {
      console.log("이메일 사용 가능");
    }

    // 닉네임 중복 확인
    const displayNameQuery = query(
      collection(db, "users"),
      where("displayName", "==", displayName),
    );

    const displayNameSnapshot = await getDocs(displayNameQuery);

    if (!displayNameSnapshot.empty) {
      alert("이미 사용 중인 닉네임입니다");
      window.location.reload();
      return false;
    }

    try {
      // 회원가입 후 Firestore 데이터베이스에 사용자 정보 추가
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      // Firestore 데이터베이스에 사용자 정보 추가
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

      console.log("회원가입 완료");
      alert(`${displayName}님 환영합니다`);
      navigate("/login");
    } catch (error) {
      console.error("회원가입 실패", error);
    }
  };

  return (
    <SJoinPageWrapper>
      <SJoinPageLogo
        onClick={() => {
          navigate("/");
        }}
      />
      <SJoinPageSecondWrapper>
        <SJoinPageTitle>회원가입</SJoinPageTitle>
        <SJoinPageForm>
          <SJoinPageInputWrapper>
            <label>이메일</label>
            <input
              type="email"
              value={email}
              name="email"
              onChange={handleClickOnChange}
              required
            ></input>
          </SJoinPageInputWrapper>
          <SJoinPageInputWrapper>
            <label>비밀번호</label>
            <input
              type="password"
              value={password}
              name="password"
              onChange={handleClickOnChange}
              required
            ></input>
          </SJoinPageInputWrapper>
          <SJoinPageInputWrapper>
            <label>닉네임</label>
            <input
              type="text"
              value={displayName}
              name="displayName"
              onChange={handleClickOnChange}
              required
            ></input>
          </SJoinPageInputWrapper>
          <SJoinPageJoinButton onClick={handleClickSignUp}>
            회원가입
          </SJoinPageJoinButton>
          <SJoinpageLoginButton
            onClick={() => {
              navigate("/login");
            }}
          >
            로그인하기
          </SJoinpageLoginButton>
        </SJoinPageForm>
      </SJoinPageSecondWrapper>
    </SJoinPageWrapper>
  );
};

export default JoinPage;

const SJoinPageWrapper = styled.div`
  background-color: var(--header-color);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const SJoinPageSecondWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: blue;
  width: 600px;
  height: 650px;
  border-radius: 40px;
  background: #fff;
  box-shadow: 0px 4px 23px 5px rgba(0, 0, 0, 0.05);
`;

const SJoinPageLogo = styled.div`
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

const SJoinPageTitle = styled.h2`
  color: var(--button-background);
  font-size: 28px;
  margin-bottom: 40px;
`;

const SJoinPageForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SJoinPageInputWrapper = styled.div`
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

const SJoinPageJoinButton = styled.button`
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

const SJoinpageLoginButton = styled.button`
  font-family: Pretendard;
  margin-top: 30px;
  font-size: 16px;
  color: #b1b1b1;
`;
