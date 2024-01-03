import React, { useState } from "react";
import styled from "styled-components";
import LetterCommentList from "../components/comment/LetterCommentList";
import CommentForm from "../components/comment/CommentForm";
import detailNote from "../assets/notes/detailNote.png";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../query/keys.Constans";
import { getLetter } from "../api/letterList";

const LetterDetailPage = () => {
  const [like, setLike] = useState<number>(0);
  const { id } = useParams();

  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: [queryKeys.LETTERS],
    queryFn: () => getLetter(id),
  });

  const handleClickCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("클립보드에 링크가 복사되었습니다.");
    } catch (e) {
      alert("복사에 실패하였습니다");
    }
  };

  const handleClickLikeUp = () => {
    setLike(like + 1);
  };

  const handleClickGoToList = () => {
    navigate("/");
  };

  return (
    <SContainer>
      <SContentsWrapper>
        <SContentsLocalWrapper>
          <SBackButtonWrapper>
            <SBackButton onClick={handleClickGoToList}>목록으로</SBackButton>
          </SBackButtonWrapper>
          <SDate>여행한시간 - 10년</SDate>
          <SLetterTitle>{data?.letterTitle}</SLetterTitle>
          <SDateWrapper>
            <li>2013년 12월26일</li>
            <li>▶</li>
            <li>2023년 12월31일</li>
          </SDateWrapper>
          <SLetterContent>{data?.letterContent}</SLetterContent>
          <SLineAndButtonWrapper>
            <SDividingLine />
            <SLikeCommentShareWrapper>
              <button onClick={handleClickLikeUp}>
                💙 좋아요 {like === 0 ? undefined : like}
              </button>
              <button
                onClick={() =>
                  handleClickCopyClipBoard("http://localhost:3000/letterDetail")
                }
              >
                ✈️ 공유
              </button>
            </SLikeCommentShareWrapper>
          </SLineAndButtonWrapper>
        </SContentsLocalWrapper>
      </SContentsWrapper>
      <LetterCommentList />
      <CommentForm />
    </SContainer>
  );
};

export default LetterDetailPage;

const SContainer = styled.div`
  /* border: solid 3px black; */
  gap: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* height: 700px; */
  margin-top: 40px;
  margin-bottom: 40px;
`;

const SContentsWrapper = styled.div`
  background-image: url(${detailNote});
  background-position: center;
  background-size: 100%;
  background-repeat: no-repeat;
  width: 800px;
  height: 798px;
  display: flex;
  justify-content: center;
  /* align-items: center; */
`;

const SContentsLocalWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  margin-top: 120px;
  align-items: center;
  /* background-color: red; */
`;

const SBackButton = styled.button`
  background-color: #fff;
  box-shadow: 0px 4px 23px 5px rgba(0, 0, 0, 0.05);
  color: var(--button-background);
  padding: 5px 15px;
  border-radius: 20px;
  margin-bottom: 20px;
  transition: 0.3s ease-in-out;
  &:hover {
    color: #fff;
    background-color: var(--button-background);
  }
`;

const SBackButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: left;
`;

const SLetterTitle = styled.h3`
  color: var(--button-background);
  text-align: center;
  font-size: 32px;
  margin-bottom: 47px;
`;

const SDate = styled.span`
  color: #c8c8c8;
  text-align: center;
  font-size: 16px;
  margin-bottom: 15px;
`;

const SDateWrapper = styled.ul`
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-bottom: 41px;
  li {
    font-size: 20px;
    color: var(--button-background);
    text-align: center;
  }
`;
const SLetterContent = styled.div`
  /* border: 2px solid purple; */
  width: 500px;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #7c7c7c;
  text-align: center;
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
  line-height: 33px; /* 150% */
  margin-bottom: 42px;
`;

const SLineAndButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SDividingLine = styled.hr`
  width: 100%;
  border: 0px;
  border-top: 5px dashed var(--button-background);
  margin-bottom: 15px;
`;

const SLikeCommentShareWrapper = styled.div`
  display: flex;
  gap: 10px;
  button {
    font-family: Pretendard;
    font-size: 20px;
    cursor: pointer;
    background-color: #fff;
    color: #000;
    border-radius: 30px;
    padding: 5px 10px;
    box-shadow: 0px 4px 23px 5px rgba(0, 0, 0, 0.05);
    transition: 0.3s ease-in-out;
    &:hover {
      color: #fff;
      background-color: var(--button-background);
    }
  }
`;
