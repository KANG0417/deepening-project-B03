import styled from "styled-components";
import { queryKeys } from "../query/keys.Constans";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { addLetter, getFirstLetters, getNextLetters } from "../api/letterList";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router";
import ScrollOnTheTop from "../components/scrollOnTheTop";
import { TAddLetterProps } from "../types/letter";
import {
  DocumentData,
  DocumentSnapshot,
  OrderByDirection,
  Query,
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

const getQuery = (lastVisible: Query<DocumentData>) =>
  lastVisible
    ? query(
        collection(db, "cities"),
        orderBy("population"),
        startAfter(lastVisible),
        limit(25),
      )
    : query(collection(db, "cities"), orderBy("population"), limit(25));

const MainPages = () => {
  const [letterSort, setLetterSort] = useState<boolean>(true);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const sort = letterSort ? "desc" : "asc";
  const [lastPage, setLastPage] = useState<DocumentData>();

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

      const data: TAddLetterProps[] = querySnapshot.docs.map((doc) => {
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
      console.log("마지막 페이지", lastPage);
      // console.log(
      //   "마지막 페이지 아이디",
      //   lastPage[lastPage.length - 1].letterId,
      // );
      // console.log(lastPage);
      return lastPage.length > 0
        ? lastPage[lastPage.length - 1].letterId
        : // undefined가 되어야 NextPageParam 이 false
          undefined;
    },
  });

  // const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
  //   queryKey: ["letters", sort],
  //   queryFn: async ({ pageParam }) => {
  //     // const lastLetterId = pageParam;
  //     // const query = getQuery(lastLetterId, "desc");
  //     // const documentSnapshots = await getDocs(query);
  //     // const documentSnapshots = getFirstLetters(sort);

  //     // const letters = documentSnapshots.docs.map((doc) => ({
  //     //   ...doc.data(),
  //     //   id: doc.id,
  //     // }));
  //     // return letters;
  //     console.log("pageParam", pageParam);

  //     const documentSnapshot = await getNextLetters(sort, pageParam);
  //     // console.log(querySnapshot.docs[querySnapshot.docs.length - 1]);

  //     setLastPage(documentSnapshot[documentSnapshot.length - 1]);

  //     const data: TAddLetterProps[] = documentSnapshot.map((doc: any) => {
  //       const docData = doc.data();
  //       return {
  //         letterId: doc.id, // 예시로 추가. Firestore 문서 ID가 필요한 경우
  //         createAt: docData.createAt,
  //         displayName: docData.displayName,
  //         userUid: docData.userUid,
  //         letterTitle: docData.letterTitle,
  //         letterContent: docData.letterContent,
  //         letterCategory: docData.letterCategory,
  //         letterMod: docData.letterMod,
  //         selectDate: docData.selectDate,
  //       };
  //     });

  //     return data;

  //     // return getNextLetters(sort, undefined);
  //   },
  //   initialPageParam: `${Query<DocumentData>}`,
  //   getNextPageParam: (lastPage) => {
  //     console.log("마지막 페이지", lastPage);
  //     // console.log(
  //     //   "마지막 페이지 아이디",
  //     //   lastPage[lastPage.length - 1].letterId,
  //     // );
  //     // console.log(lastPage);
  //     return lastPage.length > 0
  //       ? lastPage[lastPage.length - 1].letterId
  //       : // undefined가 되어야 NextPageParam 이 false
  //         null;
  //   },
  // });

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
      <SMainSentenceWrapper>
        <li>"소중한 편지를 오래 기억해요"</li>
      </SMainSentenceWrapper>
      <SFilterLocationWrapper>
        <SFilterWrapper>
          정렬
          <ul>
            <button onClick={() => handleClickSort("latest")}>최신순</button>
            <button onClick={() => handleClickSort("oldest")}>오래된순</button>
          </ul>
        </SFilterWrapper>
      </SFilterLocationWrapper>
      <SLetterListWrapper>
        <SLetterList>
          <SLetterInforWrapper>
            <STitleAndDayWrapper>
              <SLetterDay>2023년 12월 26일 08:11</SLetterDay>
              <STag>#졸림</STag>
              <SLetterNickName>아보카도샐러드</SLetterNickName>
            </STitleAndDayWrapper>
            <STagAndLikeWrapper>
              {/* 여기 다시 손 봐야 됩니다 */}
              <li>💙: 123</li>
            </STagAndLikeWrapper>
          </SLetterInforWrapper>
          <SLetterContentWrapper>
            <li>25살의 안나가 10년뒤 35살의 안나에게 보내는 편지</li>
          </SLetterContentWrapper>
        </SLetterList>
      </SLetterListWrapper>

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
  /* border: 1px solid black; */
  margin: 0 auto 5rem auto;
`;

const SFilterLocationWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const SFilterWrapper = styled.div`
  color: var(--button-background);
  width: 790px;

  ul {
    margin-top: 20px;
    display: flex;
    gap: 20px;
    font-size: 18px;
  }
  button {
    color: #e5e5e5;
  }
`;

const SLetterListWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 40px;
`;

const SLetterList = styled.ul`
  width: 630px;
  /* height: 435px; */
  padding: 30px;
  border-radius: 30px;
  background-color: #fff;
  box-shadow: 0px 4px 30px 5px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const SLetterInforWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const STitleAndDayWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SLetterDay = styled.li`
  color: #dadada;

  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const SLetterNickName = styled.li`
  font-size: 30px;
  color: var(--button-background);
`;

const STagAndLikeWrapper = styled.ul`
  display: flex;
  gap: 10px;
  li {
    font-family: Pretendard;
    font-size: 20px;
    color: var(--button-background);
  }
`;

const STag = styled.ul`
  font-weight: 700;
  font-family: Pretendard;
  font-size: 20px;
  color: var(--header-color);
`;

const SLetterContentWrapper = styled.ul`
  background-color: #f9fafb;
  margin-top: 15px;
  border-radius: 25px;

  height: 323px;
  display: flex;
  justify-content: center;
  align-items: center;
  li {
    font-size: 32px;
    text-align: center;
    color: var(--button-background);
    margin-left: 78px;
    margin-right: 78px;
    line-height: 48px;
  }
`;

const SMainSentenceWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  li {
    color: #c9e2ff;
    font-size: 36px;
    margin-top: 100px;
    margin-bottom: 100px;
  }

  /* border: 1px solid black; */
  margin: 0 auto 5rem auto;
`;
