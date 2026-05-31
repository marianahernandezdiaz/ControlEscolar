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

import { Asignacion } from "../models/Asignacion";

export const crearAsignacion = async (
  asignacion: Asignacion
) => {

  await addDoc(
    collection(db, "asignaciones"),
    asignacion
  );

};

export const escucharAsignaciones = (
  callback: (asignaciones: any[]) => void
) => {

  return onSnapshot(

    collection(db, "asignaciones"),

    (snapshot) => {

      const asignaciones =
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

      callback(asignaciones);

    }

  );

};

export const obtenerAsignacionPorId = async (
  id: string
): Promise<Asignacion | null> => {

  const docRef =
    doc(db, "asignaciones", id);

  const docSnap =
    await getDoc(docRef);

  if (docSnap.exists()) {

    return {
      id: docSnap.id,
      ...docSnap.data()
    } as Asignacion;

  }

  return null;

};

export const actualizarAsignacion = async (
  id: string,
  datos: any
) => {

  await updateDoc(
    doc(db, "asignaciones", id),
    datos
  );

};

export const eliminarAsignacion = async (
  id: string
) => {

  await deleteDoc(
    doc(db, "asignaciones", id)
  );

};

export const escucharTotalAsignaciones = (
  callback: (total: number) => void
) => {

  return onSnapshot(

    collection(db, "asignaciones"),

    (snapshot) => {

      callback(
        snapshot.docs.length
      );

    }

  );

};

export const obtenerAsignaciones = (
  callback: (asignaciones: any[]) => void
) => {

  return onSnapshot(

    collection(db, "asignaciones"),

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