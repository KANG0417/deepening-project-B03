import React from "react";
import styled from "styled-components";

const CommentForm = () => {
  return (
    <SCommentWrapper>
      <SCommentInnerWrapper>
        <span>댓글쓰기</span>
        <SInputAndButtonWrapper>
          <input placeholder="코멘트를입력하세요" />
          <button>등록</button>
        </SInputAndButtonWrapper>
      </SCommentInnerWrapper>
    </SCommentWrapper>
  );
};

export default CommentForm;

const SCommentWrapper = styled.form`
  width: 550px;
  background-color: #fff;
  box-shadow: 0px 4px 23px 5px rgba(0, 0, 0, 0.05);
  padding: 30px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 30px;
`;

const SCommentInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  span {
    font-size: 14px;
    color: var(--button-background);
    text-align: left;
    width: 100%;
  }
`;

const SInputAndButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  input {
    font-family: Pretendard;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-left: 20px;
    border-radius: 12px;
    border: none;
    background-color: #f9fafb;
    input::placeholder {
      color: #e2e2e2;
    }
  }
  button {
    padding: 5px 15px;
    border-radius: 10px;
    font-size: 12px;
    text-align: center;
    background-color: var(--button-background);
    color: white;
    width: 80px;
  }
`;
