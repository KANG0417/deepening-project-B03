import styled from "styled-components";
import { queryKeys } from "../query/keys.Constans";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router";

import { TAddLetterProps } from "../types/letter";
import {
  DocumentData,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import InfiniteScroll from "react-infinite-scroll-component";
import { auth, db } from "../firebase/firebase.config";
import ScrollToTopButton from "../components/buttons/ScrollToTopButton";

const MainPages = () => {
  const [letterSort, setLetterSort] = useState<boolean>(true);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const sort = letterSort ? "desc" : "asc";
  const [lastPage, setLastPage] = useState<DocumentData>();

  // 정렬 분기처리
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [queryKeys.LETTERS, sort],
    queryFn: async ({ pageParam }) => {
      const letterRef = collection(db, "letters");

      const q = lastPage
        ? query(
            letterRef,
            orderBy("createAt", sort),
            startAfter(lastPage),
            limit(2),
          )
        : query(letterRef, orderBy("createAt", sort), limit(2));
      const querySnapshot = await getDocs(q);

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
          letterIsOpen: docData.letterIsOpen,
          selectDate: docData.selectDate,
        };
      });

      return data;
    },
    initialPageParam: "",
    getNextPageParam: (lastPage) => {
      return lastPage.length !== 2
        ? lastPage[lastPage.length - 1].letterId
        : // undefined가 되어야 NextPageParam 이 false
          undefined;
    },
  });

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
        alert("존재하지 않는 정렬입니다!");
    }
  };

  const handleClickGoToDetail = (letter: TAddLetterProps) => {
    switch (letter.letterIsOpen || letter.letterId === auth.currentUser?.uid) {
      case true:
        navigate(`/letterDetail/${letter.letterId}`);
        break;
      case false:
        alert("작성자만 편지를 열람할 수 있습니다!");
        break;
      default:
        alert("접근권한이 없습니다. 관리자에게 문의하세요.");
    }
  };

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
      <InfiniteScroll
        dataLength={data?.pages.length ? data?.pages.length : 0}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={<h4>Loading...</h4>}
      >
        <SLetterListWrapper>
          {data?.pages.map((page) => {
            return page.map((letter) => {
              return (
                <SLetterList
                  key={letter.letterId}
                  onClick={() => handleClickGoToDetail(letter)}
                >
                  {letter.letterIsOpen ? (
                    <>
                      <SLetterInforWrapper>
                        <STitleAndDayWrapper>
                          <SLetterDay>{letter.createAt}</SLetterDay>
                          <STag>{letter.letterCategory}</STag>
                          <SLetterNickName>
                            {letter.displayName}
                          </SLetterNickName>
                        </STitleAndDayWrapper>
                        <STagAndLikeWrapper>
                          <li>💙: 123</li>
                        </STagAndLikeWrapper>
                      </SLetterInforWrapper>
                      <SLetterContentWrapper>
                        <li>{letter.letterTitle}</li>
                      </SLetterContentWrapper>
                    </>
                  ) : (
                    <>
                      <SLetterInforWrapper>
                        <STitleAndDayWrapper>
                          <SLetterDay>{letter.createAt}</SLetterDay>
                          <STag>{letter.letterCategory}</STag>
                          <SLetterNickName>
                            {letter.displayName}
                          </SLetterNickName>
                        </STitleAndDayWrapper>
                        <STagAndLikeWrapper>
                          <li>💙: 123</li>
                        </STagAndLikeWrapper>
                      </SLetterInforWrapper>
                      <SLetterContentWrapper>
                        <li>
                          작성자만 열람
                          <br />
                          가능한 편지입니다!
                        </li>
                      </SLetterContentWrapper>
                    </>
                  )}
                </SLetterList>
              );
            });
          })}
        </SLetterListWrapper>
      </InfiniteScroll>

      <ScrollToTopButton />
    </SMainWrapper>
  );
};

export default MainPages;

const SMainWrapper = styled.div`
  font-size: 2.5rem;
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
    color: #a2a2a2;
    font-size: 16px;
  }
`;

const SLetterListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 40px;
`;

const SLetterList = styled.ul`
  width: 630px;
  padding: 30px;
  border-radius: 30px;
  background-color: #fff;
  box-shadow: 0px 4px 30px 5px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-bottom: 30px;
  transition: all 0.5s ease;
  &:hover {
    transform: scale(1.08);
  }
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

  margin: 0 auto 5rem auto;
`;
