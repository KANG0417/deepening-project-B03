import React from "react";
import styled from "styled-components";

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
        <span>💙좋아요</span>
        <span>✍댓글</span>
        <span>🛫공유</span>
      </SLikeCommentShare>
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
  width: 75%;
  margin: 40px 0;
`;

const SBackButton = styled.div`
  width: 50px;
  height: 50px;
  button {
    background: transparent;
    width: 5.5rem;
    height: 5.5rem;
    color: black;
    border: 2px solid black;
    border-radius: 30px;
  }
`;

const SLetterTitle = styled.div`
  border: 1px solid black;
  width: 300px;
`;
const SDate = styled.div`
  border: 1px solid black;
  div {
  }
`;
const SLetterContent = styled.div`
  border: 1px solid black;
`;
const SLikeCommentShare = styled.div`
  border: 1px solid black;
`;
