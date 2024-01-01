import styled from "styled-components";
import { queryKeys } from "../query/keys.Constans";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { addLetter, getFirstLetters, getNextLetters } from "../api/letterList";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router";
import ScrollOnTheTop from "../components/scrollOnTheTop";
import { TAddLetterProps } from "../types/letter";
import { useInView } from "react-intersection-observer";
import {
  OrderByDirection,
  QuerySnapshot,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import InfiniteScroll from "react-infinite-scroll-component";
import { db } from "../firebase/firebase.config";

const MainPages = () => {
  const [letterSort, setLetterSort] = useState<boolean>(true);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const sort = letterSort ? "desc" : "asc";
  const [lastPage, setLastPage] = useState<any>();

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
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["letters", sort],
    queryFn: async ({ pageParam }) => {
      // const lastLetterId = pageParam;
      // const query = getQuery(lastLetterId, "desc");
      // const documentSnapshots = await getDocs(query);
      // const documentSnapshots = getFirstLetters(sort);

      // const letters = documentSnapshots.docs.map((doc) => ({
      //   ...doc.data(),
      //   id: doc.id,
      // }));
      // return letters;
      const letterRef = collection(db, "letters");

      const q = lastPage
        ? query(
            letterRef,
            orderBy("createAt", sort),
            startAfter(lastPage),
            limit(5),
          )
        : query(letterRef, orderBy("createAt", sort), limit(5));
      const querySnapshot = await getDocs(q);
      // console.log(querySnapshot.docs[querySnapshot.docs.length - 1]);

      setLastPage(querySnapshot.docs[querySnapshot.docs.length - 1]);

      const data: TAddLetterProps[] = querySnapshot.docs.map((doc: any) => {
        const docData = doc.data();
        return {
          letterId: doc.id, // 예시로 추가. Firestore 문서 ID가 필요한 경우
          createAt: docData.createAt,
          displayName: docData.displayName,
          userUid: docData.userUid,
          letterTitle: docData.letterTitle,
          letterContent: docData.letterContent,
          letterCategory: docData.letterCategory,
          letterMod: docData.letterMod,
          selectDate: docData.selectDate,
        };
      });

      return data;

      // return getNextLetters(sort, undefined);
    },
    initialPageParam: "",
    getNextPageParam: (lastPage) => {
      // console.log(
      //   "마지막 페이지 아이디",
      //   lastPage[lastPage.length - 1].letterId,
      // );
      // console.log(lastPage);
      return lastPage.length !== 0
        ? lastPage[lastPage.length - 1].letterId
        : // undefined가 되어야 NextPageParam 이 false
          undefined;
    },
  });

  // isError && <div>에러</div>;

  const onClickHandler = () => {
    const newLetter = {
      createAt: dayjs().format("YYYY년MM월DD일 hh:mm:ss"),
      displayName: "테스트",
      userUid: "테스트",
      letterTitle: "테스트11",
      letterContent: "테스트11",
      letterCategory: "테스트",
      letterMod: "public",
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

  // if (isLoading) {
  //   return <div>로딩중</div>;
  // }

  // console.log("data", data?.pages);

  return (
    <SMainWrapper>
      <ul>
        정렬
        <button onClick={() => handleClickSort("latest")}>최신순</button>
        <button onClick={() => handleClickSort("oldest")}>오래된순</button>
      </ul>
      <InfiniteScroll
        dataLength={data?.pages.length ? data.pages.length : 0}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={<h4>Loading...</h4>}
      >
        <ul>
          {data?.pages.map((page) => {
            return page.map((letter) => {
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
            });
          })}
        </ul>
      </InfiniteScroll>
      <ScrollOnTheTop />
      {/* <button onClick={onClickHandler}>등록</button> */}
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
