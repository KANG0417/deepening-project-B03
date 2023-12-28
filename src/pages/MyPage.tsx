import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/firebase.config';
import { collection, getDocs } from 'firebase/firestore';

interface TPost {
  title: string;
  contents: string;
  createdAt: number;
}

interface PostWithId extends TPost {
  id: string;
}

interface SButtonProps {
  active: boolean;
}


const getFormattedDate = (date: number) =>
  new Date(date).toLocaleDateString('ko', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });

const MyPage = () => {
  const [posts, setPosts] = useState<PostWithId[]>([]);
  const [viewMode, setViewMode] = useState('letters');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const postsCollectionRef = collection(db, 'posts');
      const postsSnapshot = await getDocs(postsCollectionRef);
      const postsList: PostWithId[] = postsSnapshot.docs.map(doc => {
        const data = doc.data() as TPost;
        return {
          id: doc.id,
          ...data
        };
      });
      setPosts(postsList);
    };

    fetchPosts();
  }, []);
  const isTwoDaysOld = (createdAt: number) => {
    const twoDays = 2 * 24 * 60 * 60 * 1000; // 2일을 밀리초로 환산
    return (Date.now() - createdAt) > twoDays;
  };
  

  const showLetters = () => {
    setViewMode('letters');
  };

  const showComments = () => {
    setViewMode('comments');
  };

  const goToDetailPage = (post: PostWithId) => {
   
    const timeDiff = Date.now() - post.createdAt;
    const twoDays = 2 * 24 * 60 * 60 * 1000; 

    if (timeDiff > twoDays) {
      
      alert('편지를 작성하신지 2일이 경과되어 수정 / 삭제가 불가능합니다.');
    } else {
      
      navigate(`/detail/${post.id}`);
    }
  };

  return (
    <SWrapper>
    <SContainer>
    <SButtonGroup>
          <SButton onClick={showLetters} active={viewMode === 'letters'}>
            내가 작성한 편지들
          </SButton>
          <SButton onClick={showComments} active={viewMode === 'comments'}>
            내가 작성한 댓글들
          </SButton>
        </SButtonGroup>
      <SPostsGrid>
      {posts.map((post) => (
        <SPostCard
         key={post.id}
         onClick={() => goToDetailPage(post)}
         className={isTwoDaysOld(post.createdAt) && viewMode === 'letters' ? 'uneditable' : ''}
         style={{ order: isTwoDaysOld(post.createdAt) ? 1 : 0 }}
         >
          {viewMode === 'letters' ? (
            <>
              <SPostTitle>{post.title}</SPostTitle>
              {isTwoDaysOld(post.createdAt) ? (
                <SPostStatus>
                <SPlaneIcon>✈️</SPlaneIcon>
                <div>편지가 배송중이에요!</div>
              </SPostStatus>
              ) : (
                <SPostEditLink>편지를 수정할 수 있어요!</SPostEditLink>
              )}
              <SPostDate>{getFormattedDate(post.createdAt)}</SPostDate>
            </>
          ) : (              
            <SPostComments>댓글 내용...</SPostComments>
          )}
        </SPostCard>
      ))}
    </SPostsGrid>
    </SContainer>
    </SWrapper>
  );
};

export default MyPage;


const SWrapper = styled.div`
`

const SContainer = styled.div`
  padding: 4rem;
  background-color: #ffffff; 
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 3rem;
`;

const SPostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  width: 100%;
  max-width: 1000px;
  margin-top: 5rem;
`;

const SPostCard = styled.div`
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column; 
  justify-content: space-between; 
  height: 100%; 

  cursor: pointer;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }
  &.uneditable {
    background-color: #FFF2AD;
  }
`;


const SPostTitle = styled.h2`
  color: #90C3FF;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;


const SPostEditLink = styled.div`
  color: #D0D0D0;
  font-size: 1.5rem;
  margin-top: auto; 
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const SPostDate = styled.div`
  color: #999;
  font-size: 1.3rem;
  margin-top: 1rem;
`;

const SButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const SButton = styled.button<SButtonProps>`
  background-color: ${(props) => (props.active ? '#90C3FF' : '#ffffff')};
  color: ${(props) => (props.active ? '#ffffff' : '#90C3FF')};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 15px;
  cursor: pointer;
  font-size: 2rem;
  font-weight: bold;
  &:hover {
    background-color: ${(props) => (props.active ? '#90C3FF' : '#e9e9e9')};
  }
  
`;

const SPostComments = styled.div`
font-size: 2rem;
`;

const SPostStatus = styled.div`
  color: #D0D0D0;
  font-size: 1.5rem;
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SPlaneIcon = styled.span`
  margin-right: 0.5rem;
  font-size: 2rem;
`;
