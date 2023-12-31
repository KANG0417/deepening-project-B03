import {
  OrderByDirection,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  updateDoc,
} from "@firebase/firestore";
import { db } from "../firebase/firebase.config";
import { TAddLetterProps, TUpdateLetterProps } from "../types/letter";

export const addLetter = async (newLetter: TAddLetterProps) => {
  const newDocRef = doc(collection(db, "letters"));
  await setDoc(newDocRef, { ...newLetter, letterId: newDocRef.id });
};

export const getLetters = async (
  letterSort: OrderByDirection,
): Promise<TAddLetterProps[]> => {
  const letterRef = collection(db, "letters");
  const q = query(letterRef, orderBy("createAt", letterSort));
  const querySnapshot = await getDocs(q);

  // Get the last visible document
  // const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
  // console.log("last", lastVisible);

  // Construct a new query starting at this document,
  // get the next 25 cities.
  // const next = query(
  //   collection(db, "cities"),
  //   orderBy("population"),
  //   startAfter(lastVisible),
  //   limit(25),
  // );

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
};

export const getLetter = async (id: string) => {
  const querySnapshot = await getDoc(doc(db, "letters", id));
  return querySnapshot.data();
};

export const updateLetter = async (
  id: string,
  setLetter: TUpdateLetterProps,
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
