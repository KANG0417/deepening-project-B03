import React from "react";
import styled from "styled-components";

const CommentForm = () => {
  return (
    <Form>
      <InputWrapper>
        <label>댓글쓰기</label>
        <textarea placeholder="코멘트를입력하세요" />
      </InputWrapper>
      <ButtonWrapper>
        <button>등록</button>
      </ButtonWrapper>
    </Form>
  );
};

export default CommentForm;

const Form = styled.form`
  width: 500px;
  border: solid 3px lightsalmon;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  gap: 12px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  & label {
    width: 80px;
    margin: 10px 10px;
  }
  & textarea {
    width: 90%;
    height: 50px;
    resize: none;
    padding: 12px;
    padding-left: 20px;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  & button {
    background-color: lightblue;
    color: white;
    font-size: 16px;
  }
`;
