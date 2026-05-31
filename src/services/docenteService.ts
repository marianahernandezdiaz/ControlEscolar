import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  updateDoc
} from "firebase/firestore";

import { db } from "./firebase";

import { Docente } from "../models/Docentes";

export const crearDocente = async (
  docente: Docente
) => {

  await addDoc(
    collection(db, "docentes"),
    docente
  );

};

export const escucharDocentes = (
  callback: (docentes: any[]) => void
) => {

  return onSnapshot(

    collection(db, "docentes"),

    (snapshot) => {

      const docentes =
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

      callback(docentes);

    }

  );

};

export const obtenerDocentePorId = async (
  id: string
): Promise<Docente | null> => {

  const docRef =
    doc(db, "docentes", id);

  const docSnap =
    await getDoc(docRef);

  if (docSnap.exists()) {

    return {
      id: docSnap.id,
      ...docSnap.data()
    } as Docente;

  }

  return null;

};

export const actualizarDocente = async (
  id: string,
  datos: any
) => {

  await updateDoc(
    doc(db, "docentes", id),
    datos
  );

};

export const eliminarDocente = async (
  id: string
) => {

  await deleteDoc(
    doc(db, "docentes", id)
  );

};

export const escucharTotalDocentes = (
  callback: (total: number) => void
) => {

  return onSnapshot(

    collection(db, "docentes"),

    (snapshot) => {

      callback(
        snapshot.docs.length
      );

    }

  );

};
export const obtenerDocentes = (
  callback: (docentes: any[]) => void
) => {

  return onSnapshot(

    collection(db, "docentes"),

    (snapshot) => {

      callback(

        snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))

      );

    }

  );

};