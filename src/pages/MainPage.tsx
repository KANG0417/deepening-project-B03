import styled from "styled-components";

const MainPages = () => {
  

  return (
    <SMainWrapper>
      <ul>
        필터
        <li>최신순</li>
        <li>오래된순</li>
      </ul>
      <SLetterList>
        <li>제목: </li>
        <li>내용: </li>
        <li>태그: </li>
        <li>좋아요: 123</li>
      </SLetterList>
    </SMainWrapper>
  );
};

export default MainPages;

const SMainWrapper = styled.div``;

const SLetterList = styled.ul``;
