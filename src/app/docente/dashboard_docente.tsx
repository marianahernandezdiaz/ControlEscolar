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
  obtenerDocentePorCorreo
} from "../../services/docenteService";

import {
  logoutUser
} from "../../services/authService";

export default function DashboardDocente() {

  const [docente,
    setDocente] =
    useState<any>(null);

  useEffect(() => {

    cargarDocente();

  }, []);

  const cargarDocente =
    async () => {

      try {

        const correo =
          auth.currentUser?.email;

        if (!correo) return;

        const datos =

          await obtenerDocentePorCorreo(
            correo
          );

        setDocente(datos);

      } catch (error) {

        console.log(error);

      }

    };

  const cerrarSesion =
    async () => {

      await logoutUser();

      router.replace(
        "/auth/login"
      );

    };

  return (

    <ScrollView
      contentContainerStyle={
        styles.container
      }
    >

      <Text style={styles.titulo}>
        Portal del Docente
      </Text>

      {docente && (

        <View style={styles.cardPerfil}>

          <Image
            source={{
              uri: docente.foto
            }}
            style={styles.foto}
          />

          <Text style={styles.nombre}>

            {docente.nombre}
            {" "}
            {docente.apellidoPaterno}

          </Text>

          <Text style={styles.especialidad}>
            {docente.especialidad}
          </Text>

          <Text style={styles.estatus}>
            {docente.estatus}
          </Text>

        </View>

      )}

      <MenuCard
        titulo="📚 Mis Asignaciones"
        subtitulo="Consultar materias asignadas"
        onPress={() =>
          router.push(
            "/docente/misAsignaciones"
          )
        }
      />

      <MenuCard
        titulo="👨‍🎓 Mis Alumnos"
        subtitulo="Ver alumnos inscritos"
        onPress={() =>
          router.push(
            "/docente/misAlumnos"
          )
        }
      />

      <MenuCard
        titulo="📝 Calificaciones"
        subtitulo="Capturar y consultar"
        onPress={() =>
          router.push(
            "/docente/calificaciones"
          )
        }
      />

      <MenuCard
        titulo="👤 Mi Perfil"
        subtitulo="Información personal"
        onPress={() =>
          router.push(
            "/docente/perfil"
          )
        }
      />



    </ScrollView>

  );

}

function MenuCard({
  titulo,
  subtitulo,
  onPress
}: any) {

  return (

    <TouchableOpacity
      style={styles.menuCard}
      onPress={onPress}
    >

      <Text style={styles.menuTitulo}>
        {titulo}
      </Text>

      <Text style={styles.menuSubtitulo}>
        {subtitulo}
      </Text>

    </TouchableOpacity>

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

  cardPerfil: {

    backgroundColor: "#FFFFFF",

    borderRadius: 20,

    padding: 25,

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

    color: "#1565C0",

    textAlign: "center"

  },

  especialidad: {

    marginTop: 5,

    color: "#475569",

    fontSize: 16

  },

  estatus: {

    marginTop: 5,

    color: "#22C55E",

    fontWeight: "600"

  },

  menuCard: {

    backgroundColor: "#FFFFFF",

    borderRadius: 18,

    padding: 20,

    marginBottom: 15,

    elevation: 3

  },

  menuTitulo: {

    fontSize: 18,

    fontWeight: "bold",

    color: "#1565C0"

  },

  menuSubtitulo: {

    marginTop: 4,

    color: "#64748B"

  },

  logout: {

    backgroundColor: "#1565C0",

    padding: 16,

    borderRadius: 15,

    alignItems: "center",

    marginTop: 10,

    marginBottom: 40

  },

  logoutText: {

    color: "#FFFFFF",

    fontWeight: "bold",

    fontSize: 16

  }

});