import { useEffect, useState } from "react";

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { router } from "expo-router";

import { auth } from "../../services/firebase";

import {
  obtenerAlumnoPorCorreo
} from "../../services/alumnoService";

import {
  logoutUser
} from "../../services/authService";

export default function DashboardAlumno() {

  const [alumno,
    setAlumno] =
    useState<any>(null);

  useEffect(() => {

    cargarAlumno();

  }, []);

  const cargarAlumno =
    async () => {

      const correo =
        auth.currentUser?.email;

      if (!correo) return;

      const datos =

        await obtenerAlumnoPorCorreo(
          correo
        );

      setAlumno(datos);

    };

  const cerrarSesion =
    async () => {

      await logoutUser();

      router.replace("/auth/login");

    };

  return (

    <ScrollView
      contentContainerStyle={
        styles.container
      }
    >

      <Text style={styles.titulo}>
        Portal del Alumno
      </Text>

      {alumno && (

        <View style={styles.perfilCard}>

          <Image
            source={{
              uri: alumno.foto
            }}
            style={styles.foto}
          />

          <Text style={styles.nombre}>

            {alumno.nombre}
            {" "}
            {alumno.apellidoPaterno}

          </Text>

          <Text style={styles.info}>

            {alumno.carrera}

          </Text>

          <Text style={styles.info}>

            Semestre {alumno.semestre}

          </Text>

        </View>

      )}

      <MenuCard
        titulo="📚 Inscripciones"
        onPress={() =>
          router.push(
            "/alumno/inscripciones"
          )
        }
      />

      <MenuCard
        titulo="📖 Mis Materias"
        onPress={() =>
          router.push(
            "/alumno/misMaterias"
          )
        }
      />

      <MenuCard
        titulo="🕒 Mi Horario"
        onPress={() =>
          router.push(
            "/alumno/horario"
          )
        }
      />

      <MenuCard
        titulo="📝 Mis Calificaciones"
        onPress={() =>
          router.push(
            "/alumno/calificaciones"
          )
        }
      />

      <MenuCard
        titulo="👤 Mi Perfil"
        onPress={() =>
          router.push(
            "/alumno/perfil"
          )
        }
      />


    </ScrollView>

  );

}

function MenuCard({
  titulo,
  onPress
}: any) {

  return (

    <TouchableOpacity
      style={styles.menuCard}
      onPress={onPress}
    >

      <Text
        style={styles.menuText}
      >
        {titulo}
      </Text>

    </TouchableOpacity>

  );

}

const styles = StyleSheet.create({

  container: {

    padding: 20,

    backgroundColor: "#F8FAFC",

    flexGrow: 1

  },

  titulo: {

    fontSize: 30,

    fontWeight: "bold",

    textAlign: "center",

    marginBottom: 20,

    color: "#0F172A"

  },

  perfilCard: {

    backgroundColor: "#FFFFFF",

    borderRadius: 20,

    padding: 20,

    alignItems: "center",

    marginBottom: 25,

    elevation: 4

  },

  foto: {

    width: 120,

    height: 120,

    borderRadius: 60,

    marginBottom: 15

  },

  nombre: {

    fontSize: 22,

    fontWeight: "bold",

    color: "#1565C0"

  },

  info: {

    marginTop: 5,

    color: "#64748B"

  },

  menuCard: {

    backgroundColor: "#FFFFFF",

    borderRadius: 15,

    padding: 20,

    marginBottom: 15,

    elevation: 3

  },

  menuText: {

    fontSize: 18,

    fontWeight: "600",

    color: "#0F172A"

  },

  logout: {

    marginTop: 20,

    backgroundColor: "#1565C0",

    padding: 15,

    borderRadius: 15,

    alignItems: "center"

  },

  logoutText: {

    color: "#FFFFFF",

    fontWeight: "bold",

    fontSize: 16

  }

});