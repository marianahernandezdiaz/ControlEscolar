import { useEffect, useState } from "react";

import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import {
  router,
  useLocalSearchParams
} from "expo-router";

import {
  escucharAlumnosAsignacion
} from "../../../services/inscripcionService";

import {
  obtenerAsignacionPorId
} from "../../../services/asignacionService";

export default function DetalleGrupo() {

  const { id } =
    useLocalSearchParams();

  const [asignacion,
    setAsignacion] =
    useState<any>(null);

  const [alumnos,
    setAlumnos] =
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

        const datosAsignacion =

          await obtenerAsignacionPorId(
            id as string
          );

        setAsignacion(
          datosAsignacion
        );

        escucharAlumnosAsignacion(

          id as string,

          (datos) => {

            setAlumnos(datos);

          }

        );

      } catch (error) {

        console.log(error);

      }

    };

  const alumnosFiltrados =

    alumnos.filter(
      (alumno) =>

        alumno.alumnoNombre
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
        Alumnos Inscritos
      </Text>

      {asignacion && (

        <View style={styles.cardInfo}>

          <Text style={styles.materia}>
            {asignacion.materiaNombre}
          </Text>

          <Text style={styles.info}>
            🏷 Grupo: {asignacion.grupo}
          </Text>

          <Text style={styles.info}>
            🎓 {asignacion.carrera}
          </Text>

          <Text style={styles.info}>
            📚 Semestre {asignacion.semestre}
          </Text>

        </View>

      )}

      <TextInput
        placeholder="Buscar alumno..."
        value={busqueda}
        onChangeText={setBusqueda}
        style={styles.input}
      />

      <Text style={styles.total}>
        Total de alumnos:
        {" "}
        {alumnosFiltrados.length}
      </Text>

      {alumnosFiltrados.map(
        (alumno) => (

          <View
            key={alumno.id}
            style={styles.card}
          >

            <Text style={styles.nombre}>

              {alumno.alumnoNombre}

            </Text>

            <Text style={styles.control}>

              Número de Control:
              {" "}
              {alumno.numeroControl}

            </Text>

            <TouchableOpacity

              style={styles.boton}

              onPress={() =>

                  router.push({

                    pathname:
                      "/docente/misAlumnos/capturar",

                    params: {

                      alumnoId:
                        alumno.alumnoId,

                      alumnoNombre:
                        alumno.alumnoNombre,

                      asignacionId:
                        alumno.asignacionId,

                      materiaNombre:
                        asignacion.materiaNombre,

                      docenteNombre:
                        asignacion.docenteNombre,
                      
                      grupo:
                      asignacion.grupo,

                    }

                  })

              }

            >

              <Text
                style={styles.textoBoton}
              >

                Capturar Calificación

              </Text>

            </TouchableOpacity>

          </View>

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

    fontSize: 28,

    fontWeight: "bold",

    textAlign: "center",

    marginBottom: 20,

    color: "#0F172A"

  },

  cardInfo: {

    backgroundColor: "#FFFFFF",

    borderRadius: 18,

    padding: 20,

    marginBottom: 20,

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

  nombre: {

    fontSize: 18,

    fontWeight: "bold",

    color: "#1565C0",

    marginBottom: 5

  },

  control: {

    color: "#475569",

    marginBottom: 15

  },

  boton: {

    backgroundColor: "#1565C0",

    padding: 12,

    borderRadius: 10,

    alignItems: "center"

  },

  textoBoton: {

    color: "#FFFFFF",

    fontWeight: "bold"

  }

});