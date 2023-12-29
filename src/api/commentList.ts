import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "@firebase/firestore";
import { db } from "../firebase/firebase.config";
import { TAddCommentProps, TUpdateCommentProps } from "../types/comment";

export const addComment = async (newComment: TAddCommentProps[]) => {
  const newDocRef = doc(collection(db, "comments"));
  await setDoc(newDocRef, { ...newComment, commentId: newDocRef.id });
};

export const getComments = async () => {
  const querySnapshot = await getDocs(collection(db, "comments"));

  return querySnapshot.docs.map((doc) => ({
    commentId: doc.id,
    ...doc.data(),
  }));
};

export const getComment = async (id: string) => {
  const querySnapshot = await getDoc(doc(db, "comments", id));
  return querySnapshot;
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
