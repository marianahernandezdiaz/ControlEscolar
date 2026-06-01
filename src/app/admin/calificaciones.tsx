import { useEffect, useState } from "react";

import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

import {
  escucharCalificaciones
} from "../../services/calificacionService";

export default function CalificacionesAdmin() {

  const [calificaciones,
    setCalificaciones] =
    useState<any[]>([]);

  const [busqueda,
    setBusqueda] =
    useState("");

  useEffect(() => {

    const unsubscribe =

      escucharCalificaciones(

        (datos) => {

          setCalificaciones(
            datos
          );

        }

      );

    return unsubscribe;

  }, []);

  const filtradas =

    calificaciones.filter(
      (item) =>

        item.materiaNombre
          ?.toLowerCase()
          .includes(
            busqueda.toLowerCase()
          )
    );

  const agrupadas =

    filtradas.reduce(

      (acc: any, item: any) => {

        if (
          !acc[item.materiaNombre]
        ) {

          acc[item.materiaNombre] = {};

        }

        const grupo =

          item.grupo ||
          "Sin Grupo";

        if (
          !acc[item.materiaNombre][grupo]
        ) {

          acc[item.materiaNombre][grupo] = [];

        }

        acc[item.materiaNombre][grupo]
          .push(item);

        return acc;

      },

      {}

    );

  return (

    <ScrollView
      contentContainerStyle={
        styles.container
      }
    >

      <Text style={styles.titulo}>
        Calificaciones
      </Text>

      <TextInput

        style={styles.input}

        placeholder=
          "Buscar materia..."

        value={busqueda}

        onChangeText={
          setBusqueda
        }

      />

      {

        Object.entries(
          agrupadas
        ).map(

          ([materia, grupos]: any) => (

            <View

              key={materia}

              style={
                styles.cardMateria
              }

            >

              <Text
                style={
                  styles.materia
                }
              >

                📚 {materia}

              </Text>

              {

                Object.entries(
                  grupos
                ).map(

                  ([grupo, alumnos]: any) => {

                    const promedioGrupo =

                      (
                        alumnos.reduce(

                          (
                            suma: number,
                            alumno: any
                          ) =>

                            suma +
                            alumno.promedio,

                          0

                        )
                        /
                        alumnos.length

                      ).toFixed(1);

                    return (

                      <View

                        key={grupo}

                        style={
                          styles.cardGrupo
                        }

                      >

                        <Text
                          style={
                            styles.grupo
                          }
                        >

                          🏷 Grupo {grupo}

                        </Text>

                        <Text
                          style={
                            styles.promedioGrupo
                          }
                        >

                          Promedio grupal:
                          {" "}
                          {promedioGrupo}

                        </Text>

                        {

                          alumnos.map(
                            (
                              alumno: any
                            ) => (

                              <View

                                key={
                                  alumno.id
                                }

                                style={
                                  styles.cardAlumno
                                }

                              >

                                <Text
                                  style={
                                    styles.nombreAlumno
                                  }
                                >

                                  👨‍🎓
                                  {" "}
                                  {
                                    alumno.alumnoNombre
                                  }

                                </Text>

                                <Text>

                                  Unidad 1:
                                  {" "}
                                  {
                                    alumno.unidad1
                                  }

                                </Text>

                                <Text>

                                  Unidad 2:
                                  {" "}
                                  {
                                    alumno.unidad2
                                  }

                                </Text>

                                <Text>

                                  Unidad 3:
                                  {" "}
                                  {
                                    alumno.unidad3
                                  }

                                </Text>

                                <Text
                                  style={
                                    styles.promedioAlumno
                                  }
                                >

                                  Promedio:
                                  {" "}
                                  {
                                    alumno.promedio
                                  }

                                </Text>

                              </View>

                            )

                          )

                        }

                      </View>

                    );

                  }

                )

              }

            </View>

          )

        )

      }

    </ScrollView>

  );

}

const styles = StyleSheet.create({

  container: {

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

    backgroundColor: "#FFF",

    borderRadius: 12,

    padding: 14,

    marginBottom: 20,

    borderWidth: 1,

    borderColor: "#CBD5E1"

  },

  cardMateria: {

    backgroundColor: "#FFF",

    borderRadius: 20,

    padding: 20,

    marginBottom: 20,

    elevation: 4,

    borderLeftWidth: 5,

    borderLeftColor: "#1565C0"

  },

  materia: {

    fontSize: 22,

    fontWeight: "bold",

    color: "#1565C0",

    marginBottom: 15

  },

  cardGrupo: {

    backgroundColor: "#F8FAFC",

    borderRadius: 15,

    padding: 15,

    marginBottom: 15,

    borderWidth: 1,

    borderColor: "#E2E8F0"

  },

  grupo: {

    fontSize: 18,

    fontWeight: "bold",

    color: "#1565C0",

    marginBottom: 8

  },

  promedioGrupo: {

    color: "#16A34A",

    fontWeight: "bold",

    marginBottom: 12

  },

  cardAlumno: {

    backgroundColor: "#FFFFFF",

    borderRadius: 12,

    padding: 12,

    marginBottom: 10

  },

  nombreAlumno: {

    fontWeight: "bold",

    color: "#334155",

    marginBottom: 6

  },

  promedioAlumno: {

    marginTop: 6,

    fontWeight: "bold",

    color: "#16A34A"

  }

});