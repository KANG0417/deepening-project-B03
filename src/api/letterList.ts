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
import { TAddLetterProps, TUpdateLetterProps } from "../types/letter";

export const addLetter = async (newLetter: TAddLetterProps[]) => {
  const newDocRef = doc(collection(db, "letters"));
  await setDoc(newDocRef, { ...newLetter, letterId: newDocRef.id });
};

export const getLetters = async () => {
  const querySnapshot = await getDocs(collection(db, "letters"));

  return querySnapshot.docs.map((doc) => ({
    letterId: doc.id,
    ...doc.data(),
  }));
};

export const getLetter = async (id: string) => {
  const querySnapshot = await getDoc(doc(db, "letters", id));
  return querySnapshot;
};

export const updateLetter = async (
  id: string,
  setLetter: TUpdateLetterProps[],
) => {
  const letterDoc = doc(db, "letters", id);

  try {
    await updateDoc(letterDoc, { ...setLetter });
  } catch (error) {
    console.error(error);
  }
};

export const deleteLetter = async (id: string) => {
  const letterDoc = doc(db, "letters", id);

  try {
    await deleteDoc(letterDoc);
  } catch (error) {
    console.error(error);
  }
};
