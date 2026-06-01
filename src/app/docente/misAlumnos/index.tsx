import { useEffect, useState } from "react";

import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";

import {
  collection,
  getDocs
} from "firebase/firestore";

import { db } from "../../../services/firebase";

import { router } from "expo-router";

import { auth } from "../../../services/firebase";

import {
  obtenerDocentePorCorreo
} from "../../../services/docenteService";

import {
  escucharInscripcionesDocente
} from "../../../services/inscripcionService";

export default function MisAlumnos() {

  const [grupos,
    setGrupos] =
    useState<any[]>([]);

  const [busqueda,
    setBusqueda] =
    useState("");

  useEffect(() => {

    cargarDatos();

  }, []);

  const cargarDatos =
    async () => {

      try {

        const correo =
          auth.currentUser?.email;

        if (!correo) return;

        const docente: any =
        await obtenerDocentePorCorreo(
            correo
        );

        if (!docente) return;

        console.log(
          "DOCENTE LOGIN:",
          docente
        );

        const snapshot =
          await getDocs(
            collection(
              db,
              "inscripciones"
            )
          );

        console.log(
          "TOTAL INSCRIPCIONES:",
          snapshot.docs.length
        );

        snapshot.docs.forEach(
          (doc) => {

            console.log(
              "INSCRIPCION:",
              doc.data()
            );

          }
        );

        const nombreCompleto =

        `${docente.nombre} ${docente.apellidoPaterno} ${docente.apellidoMaterno}`
          .trim()
          .replace(/\s+/g, " ");

        console.log(
          "Nombre construido:",
          nombreCompleto
        );

        escucharInscripcionesDocente(

           nombreCompleto,

          (inscripciones) => {

              console.log(
                "Inscripciones encontradas:",
                inscripciones
              );

            const gruposUnicos =
              Array.from(

                new Map(

                  inscripciones.map(
                    (item: any) => [

                      item.asignacionId,

                      {
                        asignacionId:
                          item.asignacionId,

                        materiaNombre:
                          item.materiaNombre,

                        grupo:
                          item.grupo,

                        carrera:
                          item.carrera,

                        totalAlumnos:
                          inscripciones.filter(
                            (i: any) =>
                              i.asignacionId ===
                              item.asignacionId
                          ).length

                      }

                    ]
                  )

                ).values()

              );

            setGrupos(
              gruposUnicos
            );

          }

        );

      } catch (error) {

        console.log(error);

      }

    };

  const gruposFiltrados =

    grupos.filter(
      (grupo) =>

        grupo.materiaNombre
          ?.toLowerCase()
          .includes(
            busqueda.toLowerCase()
          )

    );

  return (

    <ScrollView
      contentContainerStyle={
        styles.container
      }
    >

      <Text style={styles.titulo}>
        Mis Alumnos
      </Text>

      <TextInput
        placeholder="Buscar materia..."
        value={busqueda}
        onChangeText={setBusqueda}
        style={styles.input}
      />

      <Text style={styles.total}>
        Grupos encontrados:
        {" "}
        {gruposFiltrados.length}
      </Text>

      {gruposFiltrados.map(
        (grupo) => (

          <TouchableOpacity

            key={
              grupo.asignacionId
            }

            style={
              styles.card
            }

            onPress={() =>

              router.push({

                pathname:
                  "/docente/misAlumnos/[id]",

                params: {

                  id:
                    grupo.asignacionId

                }

              })

            }

          >

            <Text
              style={
                styles.materia
              }
            >

              {
                grupo.materiaNombre
              }

            </Text>

            <Text
              style={styles.info}
            >

              🏷 Grupo:
              {" "}
              {grupo.grupo}

            </Text>

            <Text
              style={styles.info}
            >

              🎓
              {" "}
              {grupo.carrera}

            </Text>

            <Text
              style={
                styles.alumnos
              }
            >

              👨‍🎓
              {" "}
              {
                grupo.totalAlumnos
              }
              {" "}
              alumnos inscritos

            </Text>

          </TouchableOpacity>

        )
      )}

    </ScrollView>

  );

}

const styles = StyleSheet.create({

  container: {

    flexGrow: 1,

    padding: 20,

    backgroundColor: "#F8FAFC"

  },

  titulo: {

    fontSize: 30,

    fontWeight: "bold",

    textAlign: "center",

    marginBottom: 20,

    color: "#0F172A"

  },

  input: {

    backgroundColor: "#FFFFFF",

    borderRadius: 12,

    padding: 14,

    marginBottom: 15,

    borderWidth: 1,

    borderColor: "#E2E8F0"

  },

  total: {

    marginBottom: 15,

    color: "#1565C0",

    fontWeight: "600"

  },

  card: {

    backgroundColor: "#FFFFFF",

    borderRadius: 18,

    padding: 20,

    marginBottom: 15,

    elevation: 4

  },

  materia: {

    fontSize: 22,

    fontWeight: "bold",

    color: "#1565C0",

    marginBottom: 10

  },

  info: {

    color: "#334155",

    marginBottom: 5

  },

  alumnos: {

    marginTop: 10,

    color: "#1565C0",

    fontWeight: "bold"

  }

});