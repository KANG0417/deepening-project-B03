import React, { useState } from "react";
import styled from "styled-components";
// import OptionBox from "../components/writingLetter/OptionBox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addLetter } from "../api/letterList";
import { queryKeys } from "../query/keys.Constans";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase.config";
import LetterOption from "../components/writingLetter/LetterOption";
import LetterEditer from "../components/writingLetter/LetterEditer";

const WritingLetterPage = () => {
  const [tags, setTags] = useState<string[]>([
    "신년인사",
    "연인에게",
    "익명에게",
  ]);
  const [isSendImmediate, setIsSendImmediate] = useState<boolean>(true);
  const [letterIsOpen, setLetterIsOpen] = useState<boolean>(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [letterContent, setLetterContent] = useState<string>("");
  const [letterTitle, setLetterTitle] = useState<string>("");

  const current_date = dayjs().format("YYYY년MM월DD일 hh:mm:ss");
  const currentTimestamp = dayjs().valueOf();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const addTodoMutation = useMutation({
    mutationFn: addLetter,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.LETTERS],
      });
      alert("편지가 등록되었습니다!");
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleClickSubmitLetter: React.FormEventHandler<HTMLFormElement> = (
    e,
  ) => {
    e.preventDefault();
    if (letterTitle?.trim() === "") {
      alert("제목을 입력해주세요!");
      return false;
    }

    if (letterContent?.trim() === "") {
      alert("내용을 입력해주세요!");
      return false;
    }

    const newLetter = {
      isSendImmediate: isSendImmediate,
      letterContent: letterContent,
      createAt: current_date,
      displayName: auth.currentUser?.displayName,
      userUid: auth.currentUser?.uid,
      letterTitle,
      letterCategory: selectedTag ? `${selectedTag}` : "",
      letterIsOpen,
      selectDate: `${selectedDate}`,
    };

    addTodoMutation.mutate(newLetter);
  };

  return (
    <>
      <SLetterEditWrapper onSubmit={handleClickSubmitLetter}>
        <SLetterEditContainer>
          <LetterEditer
            setLetterTitle={setLetterTitle}
            letterTitle={letterTitle}
            setLetterContent={setLetterContent}
          />
        </SLetterEditContainer>
        <LetterOption
          tags={tags}
          letterIsOpen={letterIsOpen}
          isSendImmediate={isSendImmediate}
          setIsSendImmediate={setIsSendImmediate}
          setSelectedDate={setSelectedDate}
          setSelectedTag={setSelectedTag}
          setLetterIsOpen={setLetterIsOpen}
          selectedTag={selectedTag}
        />
        <SSubmitLetterButton type="submit">편지 보내기</SSubmitLetterButton>
      </SLetterEditWrapper>
    </>
  );
};

const SLetterEditWrapper = styled.form`
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 20px;
  width: 80%;
  height: 90%;
  margin: 20px auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
`;

const SLetterEditContainer = styled.div`
  padding: 20px;
  width: 80%;
  height: 90%;
  display: flex;
  flex-direction: column;
  gap: 1vw;
`;

const SSubmitLetterButton = styled.button`
  position: absolute;
  border: 2px solid #90c3ff;
  border-radius: 15px;
  margin: 23vw 0 0 63vw;
  width: 10vw;
  height: 5vh;
  &:hover {
    background-color: #90c3ff;
    color: #fff;
  }
`;

export default WritingLetterPage;
