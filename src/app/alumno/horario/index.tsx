import { useEffect, useState } from "react";

import {
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native";

import { auth } from "../../../services/firebase";

import {
    obtenerAlumnoPorCorreo
} from "../../../services/alumnoService";

import {
    escucharInscripcionesAlumno
} from "../../../services/inscripcionService";

import * as ScreenOrientation from "expo-screen-orientation";



export default function Horario() {

  const [alumno,
    setAlumno] =
    useState<any>(null);

  const [inscripciones,
    setInscripciones] =
    useState<any[]>([]);


    useEffect(() => {

  ScreenOrientation.lockAsync(
    ScreenOrientation.OrientationLock.LANDSCAPE
  );

  return () => {

    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT
    );

  };

}, []);

  const dias = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes"
  ];

  const horas = [
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00"
  ];

  useEffect(() => {

    cargarHorario();

  }, []);

  const cargarHorario =
    async () => {

      try {

        const correo =
          auth.currentUser?.email;

        if (!correo) return;

        const alumnoData =
          await obtenerAlumnoPorCorreo(
            correo
          );

        if (!alumnoData) return;

        setAlumno(alumnoData);

        escucharInscripcionesAlumno(

          alumnoData.id,

          (datos) => {

            setInscripciones(datos);

          }

        );

      } catch (error) {

        console.log(error);

      }

    };

  const obtenerMateria =
    (
      dia: string,
      hora: string
    ) => {

      for (
        const inscripcion
        of inscripciones
      ) {

        for (
          const horario
          of inscripcion.horarios
        ) {

          if (

            horario.dia === dia &&

            hora >= horario.horaInicio &&

            hora < horario.horaFin

          ) {

            return {

              materia:
                inscripcion.materiaNombre,

              grupo:
                inscripcion.grupo

            };

          }

        }

      }

      return null;

    };

  return (

    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
    >

      <ScrollView
        contentContainerStyle={
          styles.container
        }
      >

        <Text style={styles.titulo}>
          Mi Horario
        </Text>

        {alumno && (

          <View
            style={styles.cardAlumno}
          >

            <Text
              style={styles.nombre}
            >

              {alumno.nombre}
              {" "}
              {alumno.apellidoPaterno}

            </Text>

            <Text>

              {alumno.carrera}

            </Text>

            <Text>

              Semestre {alumno.semestre}

            </Text>

          </View>

        )}

        <View
          style={styles.tabla}
        >

          <View
            style={styles.fila}
          >

            <View
              style={styles.headerHora}
            >

              <Text
                style={styles.headerText}
              >

                Hora

              </Text>

            </View>

            {dias.map(
              (dia) => (

                <View
                  key={dia}
                  style={
                    styles.headerDia
                  }
                >

                  <Text
                    style={
                      styles.headerText
                    }
                  >

                    {dia}

                  </Text>

                </View>

              )
            )}

          </View>

          {horas.map(
            (hora) => (

              <View
                key={hora}
                style={
                  styles.fila
                }
              >

                <View
                  style={
                    styles.celdaHora
                  }
                >

                  <Text>
                    {hora}
                  </Text>

                </View>

                {dias.map(
                  (dia) => {

                    const clase =

                      obtenerMateria(
                        dia,
                        hora
                      );

                    return (

                      <View
                        key={`${dia}-${hora}`}
                        style={
                          clase
                            ? styles.celdaMateria
                            : styles.celda
                        }
                      >

                        {clase && (

                          <>

                            <Text
                              style={
                                styles.nombreMateria
                              }
                            >

                              {
                                clase.materia
                              }

                            </Text>

                            <Text
                              style={
                                styles.grupo
                              }
                            >

                              {
                                clase.grupo
                              }

                            </Text>

                          </>

                        )}

                      </View>

                    );

                  }
                )}

              </View>

            )
          )}

        </View>

      </ScrollView>

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

  cardAlumno: {

    backgroundColor: "#FFF",

    borderRadius: 15,

    padding: 20,

    marginBottom: 20,

    elevation: 3

  },

  nombre: {

    fontSize: 20,

    fontWeight: "bold",

    color: "#1565C0"

  },

  tabla: {

    borderWidth: 1,

    borderColor: "#CBD5E1"

  },

  fila: {

    flexDirection: "row"

  },

  headerHora: {

    width: 80,

    backgroundColor: "#1565C0",

    padding: 10,

    justifyContent: "center",

    alignItems: "center"

  },

  headerDia: {

    width: 120,

    backgroundColor: "#1565C0",

    padding: 10,

    justifyContent: "center",

    alignItems: "center"

  },

  headerText: {

    color: "#FFF",

    fontWeight: "bold"

  },

  celdaHora: {

    width: 80,

    height: 70,

    borderWidth: 1,

    borderColor: "#E2E8F0",

    justifyContent: "center",

    alignItems: "center",

    backgroundColor: "#F8FAFC"

  },

  celda: {

    width: 120,

    height: 70,

    borderWidth: 1,

    borderColor: "#E2E8F0"

  },

  celdaMateria: {

    width: 120,

    height: 70,

    borderWidth: 1,

    borderColor: "#E2E8F0",

    backgroundColor: "#DBEAFE",

    justifyContent: "center",

    alignItems: "center",

    padding: 4

  },

  nombreMateria: {

    fontSize: 11,

    fontWeight: "bold",

    textAlign: "center",

    color: "#1565C0"

  },

  grupo: {

    fontSize: 10,

    textAlign: "center"

  }

});