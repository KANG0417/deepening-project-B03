import styled from "styled-components";
import { queryKeys } from "../query/keys.Constans";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addLetter, getLetters } from "../api/letterList";
import { useState } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router";

const MainPages = () => {
  const [letterSort, setLetterSort] = useState<boolean>(true);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const sort = letterSort ? "desc" : "asc";

  const addTodoMutation = useMutation({
    mutationFn: addLetter,
    onSuccess: async () => {
      alert("게시물이 등록되었습니다!");
      await queryClient.invalidateQueries({ queryKey: [queryKeys.LETTERS] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // 정렬 분기처리
  const {
    data: letters,
    isLoading,
    isError,
    error,
  } = useQuery({
    // key에 sort를 추가해줌으로써 상태값이 바뀔때마다 렌더링
    queryKey: [queryKeys.LETTERS, sort],
    queryFn: () => getLetters(sort),
  });

  // isPending && <div>로딩중</div>;
  // isError && <div>에러</div>;

  const onClickHandler = () => {
    const newLetter = {
      createAt: dayjs().format("YYYY년MM월DD일 hh:mm:ss"),
      displayName: "테스트",
      userUid: "테스트",
      letterTitle: "테스트11",
      letterContent: "테스트11",
      letterCategory: "테스트",
      letterMod: "테스트",
      selectDate: "테스트",
    };

    addTodoMutation.mutate(newLetter);
  };

  const handleClickSort = (sortValue: string) => {
    switch (sortValue) {
      case "latest":
        setLetterSort(true);
        queryClient.invalidateQueries({ queryKey: [queryKeys.LETTERS] });
        break;
      case "oldest":
        setLetterSort(false);
        queryClient.invalidateQueries({ queryKey: [queryKeys.LETTERS] });
        break;
      default:
        console.log("존재하지 않는 정렬입니다!");
    }
  };

  const handleClickGoToDetail = (mod: string) => {
    switch (mod) {
      case "public":
        navigate("/detail");
        break;
      case "private":
        alert("비공개 된 메세지 입니다!");
        break;
      default:
        console.log("접근권한이 없습니다. 관리자에게 문의하세요.");
    }
  };

  if (isLoading) {
    return <div>로딩중</div>;
  }

  return (
    <SMainWrapper>
      <ul>
        정렬
        <button onClick={() => handleClickSort("latest")}>최신순</button>
        <button onClick={() => handleClickSort("oldest")}>오래된순</button>
      </ul>
      <ul>
        {letters?.map((letter) => {
          return (
            <SLetterList
              key={letter.letterId}
              onClick={() => handleClickGoToDetail(letter.letterMod)}
            >
              {letter.letterMod === "public" ? (
                <ul>
                  <li>제목: {letter.letterTitle}</li>
                  <li>날짜: {letter.createAt}</li>
                  <li>태그: </li>
                  <li>좋아요: </li>
                  <li></li>
                </ul>
              ) : (
                <ul>
                  <li>비공개 모드입니다!</li>
                </ul>
              )}
            </SLetterList>
          );
        })}
        <button onClick={onClickHandler}>등록</button>
      </ul>
    </SMainWrapper>
  );
};

export default MainPages;

const SMainWrapper = styled.div`
  font-size: 2.5rem;
  height: 800px;
  border: 1px solid black;
  margin: 0 auto 5rem auto;
`;

const SLetterList = styled.div`
  cursor: pointer;
`;
