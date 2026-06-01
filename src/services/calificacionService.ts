import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where
} from "firebase/firestore";

import {
  onSnapshot
} from "firebase/firestore";
import { db } from "./firebase";

const calificacionesRef =
  collection(
    db,
    "calificaciones"
  );

export const guardarCalificacion =
async (
  datos: any
) => {

  const q = query(

    calificacionesRef,

    where(
      "alumnoId",
      "==",
      datos.alumnoId
    ),

    where(
      "asignacionId",
      "==",
      datos.asignacionId
    )

  );

  const snapshot =
    await getDocs(q);

  if (!snapshot.empty) {

    const documento =
      snapshot.docs[0];

    await updateDoc(

      doc(
        db,
        "calificaciones",
        documento.id
      ),

      datos

    );

    return;
  }

  await addDoc(
    calificacionesRef,
    datos
  );

};

export const obtenerCalificacion =
async (
  alumnoId: string,
  asignacionId: string
) => {

  const q = query(

    calificacionesRef,

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

export const escucharCalificacionesDocente =
(
  docenteNombre: string,
  callback: (datos: any[]) => void
) => {

  return onSnapshot(

    calificacionesRef,

    (snapshot) => {

      const datos =

        snapshot.docs
          .map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
          .filter((item: any) => {

            const nombreFirestore =

              item.docenteNombre
                ?.replace(/\s+/g, " ")
                .trim()
                .toLowerCase();

            const nombreDocente =

              docenteNombre
                .replace(/\s+/g, " ")
                .trim()
                .toLowerCase();

            return (
              nombreFirestore ===
              nombreDocente
            );

          });

      callback(datos);

    }

  );

};