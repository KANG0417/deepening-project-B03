import React, { useState } from "react";
import styled from "styled-components";
// import OptionBox from "../components/writingLetter/OptionBox";
import LetterContent from "../components/writingLetter/LetterContent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addLetter } from "../api/letterList";
import { queryKeys } from "../query/keys.Constans";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase.config";

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
  const [letterContent, setLetterContent] = useState("");

  const CURRENT_DATE = dayjs().format("YYYY년MM월DD일 HH:MM:SS");
  console.log(auth);
  const currentTimestamp = dayjs().valueOf();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const addTodoMutation = useMutation({
    mutationFn: addLetter,
    onSuccess: async () => {
      alert("편지가 등록되었습니다!");
      await queryClient.invalidateQueries({ queryKey: [queryKeys.LETTERS] });
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

    if (letterContent?.trim() === "") {
      alert("내용을 입력해주세요!");
      return false;
    }

    const newLetter = {
      // tags: selectedTag ? [selectedTag] : [],
      // isSendImmediate,
      letterContent: letterContent,
      createAt: CURRENT_DATE,
      displayName: "테스트",
      userUid: "테스트",
      letterTitle: "테스트",
      letterCategory: selectedTag ? `${selectedTag}` : "",
      letterIsOpen,
      selectDate: `${selectedDate}`,
    };

    addTodoMutation.mutate(newLetter);
  };

  return (
    <>
      <SWritingFormContainer onSubmit={handleClickSubmitLetter}>
        <LetterContent setLetterContent={setLetterContent} />
        {/* <OptionBox /> */}
        <SSubmitLetterButton type="submit">편지 보내기</SSubmitLetterButton>
      </SWritingFormContainer>
    </>
  );
};

const SWritingFormContainer = styled.form`
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 20px;
  width: 75%;
  height: 90%;
  margin: 20px auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 10vw;
`;

const SSubmitLetterButton = styled.button``;

export default WritingLetterPage;
