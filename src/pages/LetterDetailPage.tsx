import React from "react";
import styled from "styled-components";
import LetterCommentList from "../components/comment/LetterCommentList";
import CommentForm from "../components/comment/CommentForm";

const LetterDetailPage = () => {
  return (
    <SContainer>
      <SBackButton>
        <button>뒤로가기</button>
      </SBackButton>
      <SDate>
        <div>여행한시간 - 10년</div>
      </SDate>
      <SLetterTitle>
        <div>2013년 12월로부터 온 편지</div>
      </SLetterTitle>
      <SDate>
        <span>2013년 12월26일</span>
        <span>▶</span>
        <span>2023년 12월31일</span>
      </SDate>
      <SLetterContent>
        <div>10년뒤 안나에게 어쩌구저쩌구 내용들</div>
      </SLetterContent>
      <SLikeCommentShare>
        <button>💙좋아요</button>
        <button>✍댓글</button>
        <button>🛫공유</button>
      </SLikeCommentShare>
      <LetterCommentList />
      <CommentForm />
    </SContainer>
  );
};

export default LetterDetailPage;

const SContainer = styled.div`
  border: solid 3px black;
  gap: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 700px;
  margin-top: 40px;
  margin-bottom: 40px;
`;

const SBackButton = styled.div`
  width: 50px;
  height: 50px;
  margin-right: auto;
  button {
    float: left;
    align-content: left;
    width: 5.5rem;
    height: 5.5rem;
    color: black;
    border: 2px solid black;
    border-radius: 30px;
  }
`;

const SLetterTitle = styled.div`
  border: 2px solid lightpink;
  width: 60%;
  font-size: 25px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    margin: auto;
  }
`;
const SDate = styled.div`
  div {
    border: 2px solid lightblue;
  }
  span {
    padding: 0.5rem;
    border: 2px solid lightblue;
  }
`;
const SLetterContent = styled.div`
  border: 2px solid purple;
  width: 60%;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    margin: auto;
  }
`;
const SLikeCommentShare = styled.div`
  button {
    border: 2px solid lightcoral;
  }
`;
