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
          <Comment>고양이 결국 키우게 됐나요? 궁금하네요</Comment>
        </CommentCard>
      </CommentWrapper>
      <CommentWrapper>
        <CommentCard>
          <NickNameandDate>
            <p>소삼이</p>
            <time>2023.11.28 </time>
          </NickNameandDate>
          <Comment>미래에서 당신의 생일축하합니다</Comment>
        </CommentCard>
      </CommentWrapper>
    </SCommentContainer>
  );
};

export default LetterCommentList;

const SCommentContainer = styled.div`
  border: solid 3px lightgreen;
  gap: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 40px;
  margin-bottom: 40px;
`;
const CommentWrapper = styled.ul`
  border: solid 1px lightslategrey;
  display: flex;
  flex-direction: column;
  padding: 5px;
  margin-top: 5px;
  width: 500px;
  border-radius: 10px;
`;
const CommentCard = styled.li`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-left: 10px;
`;
const NickNameandDate = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 4px 5px 0px 5px;
`;

const Comment = styled.p`
  background-color: gray;
  border-radius: 12px;
  padding: 12px;
`;
