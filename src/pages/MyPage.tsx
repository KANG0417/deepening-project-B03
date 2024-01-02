import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/firebase.config';
import { collection, getDocs } from 'firebase/firestore';

interface TPost {
  title: string;
  comment: string;
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
  const [comments, setComments] = useState<PostWithId[]>([]); 
  const [viewMode, setViewMode] = useState('letters');
  const [timers, setTimers] = useState<{ [postId: string]: number }>({});
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

    const fetchComments = async () => {
      const commentsCollectionRef = collection(db, 'comments'); 
  
      try {
        const commentsSnapshot = await getDocs(commentsCollectionRef);
        const commentsList: PostWithId[] = commentsSnapshot.docs.map((doc) => {
          const data = doc.data() as TPost; 
          return {
            id: doc.id,
            ...data,
          };
        });
        setComments(commentsList);
      } catch (error) {
        console.error('댓글 데이터를 불러오는 도중 오류가 발생했습니다.', error);
      }
    };
    console.log(comments);
    fetchPosts();
    fetchComments();
  }, []);
  

  const isTwoDaysOld = (createdAt: number) => {
    const twoDays = 2 * 24 * 60 * 60 * 1000; 
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


  const itemsToRender = viewMode === 'letters' ? posts : comments;

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
          {itemsToRender.map((item) => (
            <SPostCard
              key={item.id}
              onClick={() => goToDetailPage(item)}
              className={isTwoDaysOld(item.createdAt) ? 'uneditable' : ''}
              style={{ order: isTwoDaysOld(item.createdAt) ? 1 : 0 }}
            >
              {viewMode === 'letters' ? (
                <>
                  <SPostTitle>{item.title}</SPostTitle>
                  {isTwoDaysOld(item.createdAt) ? (
                    <SPostStatus>
                      <SPlaneIcon>✈️</SPlaneIcon>
                      <div>편지가 배송중이에요!</div>
                    </SPostStatus>
                  ) : (
                    <SPostEditLink>편지를 수정할 수 있어요!</SPostEditLink>
                  )}
                  <SPostDate>{getFormattedDate(item.createdAt)}</SPostDate>
                </>
              ) : (
                <SPostComments>
                   {/* 댓글 데이터 렌더링 */}
                {comments.map((comment) => (
                  <div key={comment.id}>
                    {/* 댓글 내용을 여기에 출력 */}
                    {comment.comment}
                  </div>
                ))}
                </SPostComments>
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
