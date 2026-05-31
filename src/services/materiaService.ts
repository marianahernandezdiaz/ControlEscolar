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

import { Materia } from "../models/Materias";

export const crearMateria = async (
  materia: Materia
) => {

  await addDoc(
    collection(db, "materias"),
    materia
  );

};

export const obtenerMateriaPorId = async (
  id: string
): Promise<Materia | null> => {

  const docRef =
    doc(db, "materias", id);

  const docSnap =
    await getDoc(docRef);

  if (docSnap.exists()) {

    return {
      id: docSnap.id,
      ...docSnap.data()
    } as Materia;

  }

  return null;

};

export const actualizarMateria = async (
  id: string,
  datos: any
) => {

  await updateDoc(
    doc(db, "materias", id),
    datos
  );

};

export const eliminarMateria = async (
  id: string
) => {

  await deleteDoc(
    doc(db, "materias", id)
  );

};

export const escucharTotalMaterias = (
  callback: (total: number) => void
) => {

  return onSnapshot(

    collection(db, "materias"),

    (snapshot) => {

      callback(
        snapshot.docs.length
      );

    }

  );

};
export const escucharMaterias = (
  callback: (materias: any[]) => void
) => {

  return onSnapshot(
    collection(db, "materias"),

    (snapshot) => {

      const materias =
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

      callback(materias);

    }
  );

};
export const obtenerMaterias = (
  callback: (materias: any[]) => void
) => {

  return onSnapshot(

    collection(db, "materias"),

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