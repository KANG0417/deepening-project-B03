import {
  DocumentData,
  OrderByDirection,
  Query,
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

export const getFirstLetters = async (
  letterSort: OrderByDirection,
): Promise<TAddLetterProps[]> => {
  const letterRef = collection(db, "letters");

  const q = query(letterRef, orderBy("createAt", letterSort), limit(5));

  const querySnapshot = await getDocs(q);
  // return querySnapshot;
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
};

export const getData = (docs: any) => {
  const data: TAddLetterProps[] = docs.map((doc: any) => {
    console.log(doc);
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

export const getNextLetters = async (
  letterSort: OrderByDirection,
  pageParam: Query<DocumentData>,
) => {
  const letterRef = collection(db, "letters");
  const q = pageParam
    ? query(
        letterRef,
        orderBy("createAt", letterSort),
        startAfter(pageParam),
        limit(5),
      )
    : query(letterRef, orderBy("createAt", letterSort), limit(5));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs;
};

// getPage()
// console.log("last :: ", querySnapshot.docs[querySnapshot.docs.length - 1]);

// getData()
// const data: TAddLetterProps[] = querySnapshot.docs.map((doc) => {
//   const docData = doc.data();
//   return {
//     letterId: doc.id, // 예시로 추가. Firestore 문서 ID가 필요한 경우
//     createAt: docData.createAt,
//     displayName: docData.displayName,
//     userUid: docData.userUid,
//     letterTitle: docData.letterTitle,
//     letterContent: docData.letterContent,
//     letterCategory: docData.letterCategory,
//     letterMod: docData.letterMod,
//     selectDate: docData.selectDate,
//   };
// });

// return data;

// export const documentSnapshot = getNextLetters();

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
