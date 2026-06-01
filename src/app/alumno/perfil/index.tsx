import { useEffect, useState } from "react";

import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import { router } from "expo-router";

import { auth } from "../../../services/firebase";

import {
    obtenerAlumnoPorCorreo
} from "../../../services/alumnoService";

import {
    logoutUser
} from "../../../services/authService";

export default function Perfil() {

  const [alumno,
    setAlumno] =
    useState<any>(null);

  useEffect(() => {

    cargarAlumno();

  }, []);

  const cargarAlumno =
    async () => {

      try {

        const correo =
          auth.currentUser?.email;

        if (!correo) return;

        const datos =

          await obtenerAlumnoPorCorreo(
            correo
          );

        setAlumno(datos);

      } catch (error) {

        console.log(error);

      }

    };

  const cerrarSesion =
    async () => {

      Alert.alert(

        "Cerrar Sesión",

        "¿Deseas salir de tu cuenta?",

        [

          {
            text: "Cancelar",
            style: "cancel"
          },

          {

            text: "Salir",

            onPress: async () => {

              await logoutUser();

              router.replace(
                "/auth/login"
              );

            }

          }

        ]

      );

    };

  if (!alumno) {

    return (

      <View
        style={styles.center}
      >

        <Text>
          Cargando...
        </Text>

      </View>

    );

  }

  return (

    <ScrollView
      contentContainerStyle={
        styles.container
      }
    >

      <Text style={styles.titulo}>
        Mi Perfil
      </Text>

      <View style={styles.cardPerfil}>

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
          {" "}
          {alumno.apellidoMaterno}

        </Text>

        <Text style={styles.carrera}>
          {alumno.carrera}
        </Text>

      </View>

      <View style={styles.card}>

        <Item
          label="Número de Control"
          value={
            alumno.numeroControl
          }
        />

        <Item
          label="Correo"
          value={
            alumno.correo
          }
        />

        <Item
          label="Teléfono"
          value={
            alumno.telefono
          }
        />

        <Item
          label="Edad"
          value={
            alumno.edad
          }
        />

        <Item
          label="Género"
          value={
            alumno.genero
          }
        />

        <Item
          label="Dirección"
          value={
            alumno.direccion
          }
        />

        <Item
          label="Semestre"
          value={
            alumno.semestre
          }
        />

        <Item
          label="Estatus"
          value={
            alumno.estatus
          }
        />

      </View>

      <TouchableOpacity
        style={styles.botonSalir}
        onPress={
          cerrarSesion
        }
      >

        <Text
          style={styles.textoSalir}
        >

          Cerrar Sesión

        </Text>

      </TouchableOpacity>

    </ScrollView>

  );

}

function Item({
  label,
  value
}: any) {

  return (

    <View
      style={styles.item}
    >

      <Text
        style={styles.label}
      >

        {label}

      </Text>

      <Text
        style={styles.valor}
      >

        {value}

      </Text>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {

    flexGrow: 1,

    padding: 20,

    backgroundColor: "#F8FAFC"

  },

  center: {

    flex: 1,

    justifyContent: "center",

    alignItems: "center"

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

    marginBottom: 20,

    elevation: 4

  },

  foto: {

    width: 130,

    height: 130,

    borderRadius: 65,

    marginBottom: 15

  },

  nombre: {

    fontSize: 22,

    fontWeight: "bold",

    color: "#1565C0",

    textAlign: "center"

  },

  carrera: {

    marginTop: 5,

    color: "#64748B",

    textAlign: "center"

  },

  card: {

    backgroundColor: "#FFFFFF",

    borderRadius: 20,

    padding: 20,

    elevation: 4

  },

  item: {

    marginBottom: 15,

    borderBottomWidth: 1,

    borderBottomColor: "#E2E8F0",

    paddingBottom: 10

  },

  label: {

    fontWeight: "bold",

    color: "#475569",

    marginBottom: 4

  },

  valor: {

    fontSize: 16,

    color: "#0F172A"

  },

  botonSalir: {

    backgroundColor: "#1565C0",

    marginTop: 25,

    padding: 16,

    borderRadius: 15,

    alignItems: "center",

    marginBottom: 40

  },

  textoSalir: {

    color: "#FFFFFF",

    fontWeight: "bold",

    fontSize: 16

  }

});