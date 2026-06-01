import { useEffect, useState } from "react";

import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";

import { auth } from "../../../services/firebase";

import {
    obtenerAlumnoPorCorreo
} from "../../../services/alumnoService";

import {
    escucharCalificacionesAlumno
} from "../../../services/calificacionService";

export default function CalificacionesAlumno() {

  const [calificaciones,
    setCalificaciones] =
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

        const alumno: any =

          await obtenerAlumnoPorCorreo(
            correo
          );

        if (!alumno) return;

        escucharCalificacionesAlumno(

          alumno.id,

          (datos) => {

            setCalificaciones(
              datos
            );

          }

        );

      } catch (error) {

        console.log(error);

      }

    };

  const filtradas =

    calificaciones.filter(
      (item) =>

        item.materiaNombre
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
        Mis Calificaciones
      </Text>

      <TextInput
        placeholder="Buscar materia..."
        value={busqueda}
        onChangeText={setBusqueda}
        style={styles.input}
      />

      <Text style={styles.total}>
        Materias:
        {" "}
        {filtradas.length}
      </Text>

      {filtradas.map(
        (item) => (

          <View
            key={item.id}
            style={styles.card}
          >

            <Text
              style={styles.materia}
            >

              📚
              {" "}
              {item.materiaNombre}

            </Text>

            <Text style={styles.unidad}>
              Unidad 1:
              {" "}
              {item.unidad1}
            </Text>

            <Text style={styles.unidad}>
              Unidad 2:
              {" "}
              {item.unidad2}
            </Text>

            <Text style={styles.unidad}>
              Unidad 3:
              {" "}
              {item.unidad3}
            </Text>

            <View
              style={styles.boxPromedio}
            >

              <Text
                style={
                  styles.promedio
                }
              >

                Promedio Final:
                {" "}
                {item.promedio}

              </Text>

            </View>

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

    borderColor: "#CBD5E1"

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

    marginBottom: 15

  },

  unidad: {

    fontSize: 16,

    color: "#334155",

    marginBottom: 8

  },

  boxPromedio: {

    marginTop: 15,

    backgroundColor: "#DBEAFE",

    padding: 15,

    borderRadius: 12

  },

  promedio: {

    fontSize: 18,

    fontWeight: "bold",

    color: "#1565C0",

    textAlign: "center"

  }

});