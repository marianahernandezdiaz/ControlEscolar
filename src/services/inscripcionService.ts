import {
  addDoc,
  collection,
  getDocs,
  query,
  where
} from "firebase/firestore";

import { db } from "./firebase";

import { Inscripcion } from "../models/Inscripcion";

import {
  onSnapshot
} from "firebase/firestore";

const inscripcionesRef =
  collection(
    db,
    "inscripciones"
  );

export const crearInscripcion =
  async (
    inscripcion: Inscripcion
  ) => {

    return await addDoc(
      inscripcionesRef,
      inscripcion
    );

  };

export const obtenerInscripciones =
  async () => {

    const snapshot =
      await getDocs(
        inscripcionesRef
      );

    return snapshot.docs.map(
      doc => ({

        id: doc.id,

        ...doc.data()

      })
    );

  };

export const obtenerInscripcionesAlumno =
  async (
    alumnoId: string
  ) => {

    const q = query(

      inscripcionesRef,

      where(
        "alumnoId",
        "==",
        alumnoId
      )

    );

    const snapshot =
      await getDocs(q);

    return snapshot.docs.map(
      doc => ({

        id: doc.id,

        ...doc.data()

      })
    );

  };

export const obtenerInscripcionPorAsignacion =
  async (
    alumnoId: string,
    asignacionId: string
  ) => {

    const q = query(

      inscripcionesRef,

      where(
        "alumnoId",
        "==",
        alumnoId
      ),

      where(
        "asignacionId",
        "==",
        asignacionId
      )

    );

    const snapshot =
      await getDocs(q);

    return !snapshot.empty;

  };

  export const obtenerInscripcionPorMateria =
  async (
    alumnoId: string,
    materiaId: string
  ) => {

    const q = query(

      inscripcionesRef,

      where(
        "alumnoId",
        "==",
        alumnoId
      ),

      where(
        "materiaId",
        "==",
        materiaId
      )

    );

    const snapshot =
      await getDocs(q);

    return !snapshot.empty;

  };

  export const escucharInscripcionesAlumno =
  (
    alumnoId: string,
    callback: (datos: any[]) => void
  ) => {

    const q = query(

      inscripcionesRef,

      where(
        "alumnoId",
        "==",
        alumnoId
      )

    );

    return onSnapshot(
      q,
      (snapshot) => {

        callback(

          snapshot.docs.map(
            doc => ({

              id: doc.id,

              ...doc.data()

            })
          )

        );

      }
    );

  };