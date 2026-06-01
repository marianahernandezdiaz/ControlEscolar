import { useEffect, useState } from "react";

import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";

import { auth } from "../../services/firebase";

import {
  obtenerDocentePorCorreo
} from "../../services/docenteService";

export default function DashboardDocente() {

  const [docente,
    setDocente] =
    useState<any>(null);

  const [correo,
    setCorreo] =
    useState("");

  useEffect(() => {

    cargarDocente();

  }, []);

  const cargarDocente =
    async () => {

      try {

        const email =
          auth.currentUser?.email || "";

        setCorreo(email);

        console.log(
          "Correo usuario:",
          email
        );

        if (!email) {

          console.log(
            "No hay usuario autenticado"
          );

          return;

        }

        const datos =

          await obtenerDocentePorCorreo(
            email
          );

        console.log(
          "Docente encontrado:",
          datos
        );

        setDocente(datos);

      } catch (error) {

        console.log(
          "Error:",
          error
        );

      }

    };

  return (

    <ScrollView
      contentContainerStyle={
        styles.container
      }
    >

      <Text style={styles.titulo}>
        Dashboard Docente
      </Text>

      <Text style={styles.subtitulo}>
        Prueba de autenticación
      </Text>

      <View style={styles.card}>

        <Text style={styles.label}>
          Correo autenticado:
        </Text>

        <Text style={styles.valor}>
          {correo}
        </Text>

      </View>

      {docente ? (

        <View style={styles.card}>

          <Text style={styles.label}>
            ID:
          </Text>

          <Text style={styles.valor}>
            {docente.id}
          </Text>

          <Text style={styles.label}>
            Nombre:
          </Text>

          <Text style={styles.valor}>
            {docente.nombre}
            {" "}
            {docente.apellidoPaterno}
            {" "}
            {docente.apellidoMaterno}
          </Text>

          <Text style={styles.label}>
            Número de empleado:
          </Text>

          <Text style={styles.valor}>
            {docente.numeroEmpleado}
          </Text>

          <Text style={styles.label}>
            Correo:
          </Text>

          <Text style={styles.valor}>
            {docente.correo}
          </Text>

          <Text style={styles.label}>
            Especialidad:
          </Text>

          <Text style={styles.valor}>
            {docente.especialidad}
          </Text>

          <Text style={styles.label}>
            Estatus:
          </Text>

          <Text style={styles.valor}>
            {docente.estatus}
          </Text>

        </View>

      ) : (

        <View style={styles.card}>

          <Text
            style={{
              color: "red"
            }}
          >

            No se encontró el docente.

          </Text>

        </View>

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

    marginBottom: 10

  },

  subtitulo: {

    textAlign: "center",

    marginBottom: 25,

    color: "#64748B"

  },

  card: {

    backgroundColor: "#FFFFFF",

    padding: 20,

    borderRadius: 15,

    marginBottom: 20,

    elevation: 3

  },

  label: {

    fontWeight: "bold",

    marginTop: 10

  },

  valor: {

    fontSize: 16,

    marginTop: 2

  }

});