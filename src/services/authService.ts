import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";

import {
    doc,
    getDoc,
    setDoc
} from "firebase/firestore";

import { auth, db } from "./firebase";

export const registerUser = async (
  nombre: string,
  correo: string,
  password: string,
  rol: string
) => {

  const userCredential =
    await createUserWithEmailAndPassword(
      auth,
      correo,
      password
    );

  const uid = userCredential.user.uid;

  await setDoc(
    doc(db, "usuarios", uid),
    {
      uid,
      nombre,
      correo,
      rol,
      fechaRegistro: new Date()
    }
  );

  return uid;
};

export const loginUser = async (
  correo: string,
  password: string
) => {

  const userCredential =
    await signInWithEmailAndPassword(
      auth,
      correo,
      password
    );

  const uid =
    userCredential.user.uid;

  const docRef =
    doc(db, "usuarios", uid);

  const docSnap =
    await getDoc(docRef);

  return docSnap.data();
};

export const logoutUser = async () => {
  await signOut(auth);
};