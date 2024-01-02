import React from "react";
import styled from "styled-components";

const LetterCommentList = () => {
  return (
    <SCommentContainer>
      <CommentWrapper>
        <CommentCard>
          <NickNameandDate>
            <p>오늘은김볶밥</p>
            <time>2023.11.28 목</time>
          </NickNameandDate>
          <Comment>
            고양이 결국 키우게 됐나요? 궁금하네요 고양이 결국 키우게 됐나요?
            궁금하네요 고양이 결국 키우게 됐나요? 궁금하네요
          </Comment>
        </CommentCard>
      </CommentWrapper>
      <CommentWrapper>
        <CommentCard>
          <NickNameandDate>
            <p>소삼이</p>
            <time>2023.11.28 목</time>
          </NickNameandDate>
          <Comment>미래에서 당신의 생일축하합니다</Comment>
        </CommentCard>
      </CommentWrapper>
    </SCommentContainer>
  );
};

export default LetterCommentList;

const SCommentContainer = styled.div`
  /* border: solid 3px lightgreen; */
  gap: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 40px;
  margin-bottom: 40px;
`;
const CommentWrapper = styled.ul`
  background-color: #fff;
  box-shadow: 0px 4px 23px 5px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 5px;
  width: 570px;
  height: 100px;
  padding: 20px;
  border-radius: 10px;
`;
const CommentCard = styled.li`
  background-color: #f9fafb;
  display: flex;
  flex-direction: column;
  width: 520px;
  border-radius: 5px;
  padding: 30px;
  gap: 20px;
`;
const NickNameandDate = styled.div`
  display: flex;
  justify-content: space-between;

  p {
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 700;
    color: var(--button-background);
  }
  time {
    font-family: Pretendard;
    font-size: 10px;
    color: #dadada;
  }
`;

const Comment = styled.p`
  color: #000;
  font-family: Pretendard;
  font-size: 18px;
  width: 450px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
