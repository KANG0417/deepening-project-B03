import { getDocs } from "firebase/firestore";
import styled from "styled-components";

const MainPages = () => {
  // getDocs();

  return (
    <SMainWrapper>
      <SMainSentenceWrapper>
        <li>"소중한 편지를 오래 기억해요"</li>
      </SMainSentenceWrapper>
      <SFilterLocationWrapper>
        <SFilterWrapper>
          필터
          <ul>
            <li>최신순</li>
            <li>오래된순</li>
          </ul>
        </SFilterWrapper>
      </SFilterLocationWrapper>
      <SLetterListWrapper>
        <SLetterList>
          <li>제목: </li>

          <li>내용: </li>
          <li>태그: </li>
          <li>좋아요: 123</li>
        </SLetterList>
      </SLetterListWrapper>
    </SMainWrapper>
  );
};

export default MainPages;

// const SMainWrapper = styled.div``;

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
  li {
    color: #e5e5e5;
  }
`;

const SLetterListWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 40px;
`;

const SLetterList = styled.ul`
  width: 630px;
  height: 435px;
  padding: 27px;
  border-radius: 30px;
  background-color: #fff;
  box-shadow: 0px 4px 30px 5px rgba(0, 0, 0, 0.05);
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
`;
