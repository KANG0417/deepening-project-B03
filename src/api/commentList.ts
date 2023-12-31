import {
  OrderByDirection,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "@firebase/firestore";
import { db } from "../firebase/firebase.config";
import { TAddCommentProps, TUpdateCommentProps } from "../types/comment";

export const addComment = async (newComment: TAddCommentProps[]) => {
  const newDocRef = doc(collection(db, "comments"));
  await setDoc(newDocRef, { ...newComment, commentId: newDocRef.id });
};

export const getComments = async (): Promise<TAddCommentProps[]> => {
  const letterRef = collection(db, "comments");
  const q = query(letterRef, orderBy("createAt", "desc"));
  const querySnapshot = await getDocs(q);

  const data: TAddCommentProps[] = querySnapshot.docs.map((doc) => {
    const docData = doc.data();
    return {
      commentId: docData.commentId,
      userUid: docData.userUid,
      displayName: docData.displayName,
      commentContent: docData.commentContent,
      createAt: docData.createAt,
    };
  });

  return data;
};

export const getComment = async (id: string) => {
  const querySnapshot = await getDoc(doc(db, "comments", id));
  return querySnapshot.data();
};

export const updateComment = async (
  id: string,
  setComment: TUpdateCommentProps[],
) => {
  const commentDoc = doc(db, "comments", id);

  try {
    await updateDoc(commentDoc, { ...setComment });
  } catch (error) {
    console.error(error);
  }
};

export const deleteComment = async (id: string) => {
  const commentDoc = doc(db, "comments", id);

  try {
    await deleteDoc(commentDoc);
  } catch (error) {
    console.error(error);
  }
};
