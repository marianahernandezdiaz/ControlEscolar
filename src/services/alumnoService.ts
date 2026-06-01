import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  updateDoc
} from "firebase/firestore";

import { Alumno } from "../models/Alumnos";
import { db } from "./firebase";

import {
  query,
  where
} from "firebase/firestore";

const alumnosRef = collection(db, "alumnos");

export const crearAlumno = async (
  alumno: Alumno
) => {

  return await addDoc(
    alumnosRef,
    alumno
  );
};

export const eliminarAlumno = async (
  id: string
) => {

  await deleteDoc(
    doc(db, "alumnos", id)
  );
};

export const obtenerAlumnos = async () => {

  const snapshot =
    await getDocs(
      collection(db, "alumnos")
    );

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};


export const escucharAlumnos = (
  callback: (alumnos: any[]) => void
) => {

  return onSnapshot(
    collection(db, "alumnos"),

    (snapshot) => {

      const alumnos =
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

      callback(alumnos);

    }

  );

};

export const escucharTotalAlumnos = (
  callback: (total: number) => void
) => {

  return onSnapshot(
    collection(db, "alumnos"),

    (snapshot) => {

      callback(
        snapshot.docs.length
      );

    }
  );

};

export const obtenerAlumnoPorId = async (
  id: string
): Promise<Alumno | null> => {

  const docRef =
    doc(db, "alumnos", id);

  const docSnap =
    await getDoc(docRef);

  if (docSnap.exists()) {

    return {
      id: docSnap.id,
      ...docSnap.data()
    } as Alumno;

  }

  return null;
};

export const actualizarAlumno = async (
  id: string,
  datos: any
) => {

  await updateDoc(
    doc(db, "alumnos", id),
    {
      ...datos,
      fechaActualizacion:
        new Date()
    }
  );

};

export const obtenerAlumnoPorCorreo =
  async (
    correo: string
  ) => {

    const q = query(
      alumnosRef,
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
