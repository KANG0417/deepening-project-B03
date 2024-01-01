import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "@firebase/firestore";
import { TAddUserProps, TUpdateUserProps } from "../types/user";
import { db } from "../firebase/firebase.config";

export const addUser = async (newUser: TAddUserProps) => {
  const newDocRef = doc(collection(db, "users"));
  await setDoc(newDocRef, { ...newUser });
};

export const getUser = async (id: string) => {
  const querySnapshot = await getDoc(doc(db, "users", id));
  return querySnapshot.data();
};

export const updateUser = async (id: string, setUser: TUpdateUserProps) => {
  const letterDoc = doc(db, "users", id);

  try {
    await updateDoc(letterDoc, { ...setUser });
  } catch (error) {
    console.error(error);
  }
};
