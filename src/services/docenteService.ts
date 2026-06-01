import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where
} from "firebase/firestore";

import { db } from "./firebase";

import { Docente } from "../models/Docentes";

const docentesRef =
  collection(
    db,
    "docentes"
  );

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


export const obtenerDocentePorCorreo =
  async (
    correo: string
  ) => {

    const q = query(

      docentesRef,

      where(
        "correo",
        "==",
        correo
      )

    );

    const snapshot =
      await getDocs(q);

    if (
      snapshot.empty
    ) {

      return null;

    }

    return {

      id:
        snapshot.docs[0].id,

      ...snapshot.docs[0].data()

    };

  };

