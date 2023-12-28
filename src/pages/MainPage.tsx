import { getDocs } from "firebase/firestore";
import styled from "styled-components";

const MainPages = () => {
  getDocs();

  return (
    <SMainWrapper>
      <ul>
        필터
        <li>최신순</li>
        <li>오래된순</li>
      </ul>
      <SLetterList>
        <li>제목: </li>
      </SLetterList>
    </SMainWrapper>
  );
};

export default MainPages;

const SMainWrapper = styled.div`
  font-size: 2.5rem;
  border: 1px solid black;
  margin: 0 auto 5rem auto;
`;

const SLetterList = styled.ul``;
