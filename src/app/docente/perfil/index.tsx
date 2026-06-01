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
    obtenerDocentePorCorreo
} from "../../../services/docenteService";

import {
    logoutUser
} from "../../../services/authService";

export default function PerfilDocente() {

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

      Alert.alert(

        "Cerrar Sesión",

        "¿Deseas cerrar sesión?",

        [

          {
            text: "Cancelar",
            style: "cancel"
          },

          {

            text: "Salir",

            style: "destructive",

            onPress: async () => {

              try {

                await logoutUser();

                router.replace(
                  "/auth/login"
                );

              } catch (error) {

                console.log(error);

              }

            }

          }

        ]

      );

    };

  if (!docente) {

    return (

      <View style={styles.center}>

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
            uri: docente.foto
          }}

          style={styles.foto}

        />

        <Text style={styles.nombre}>

          {docente.nombre}
          {" "}
          {docente.apellidoPaterno}
          {" "}
          {docente.apellidoMaterno}

        </Text>

        <Text style={styles.especialidad}>
          {docente.especialidad}
        </Text>

      </View>

      <View style={styles.cardInfo}>

        <Item
          label="Número de Empleado"
          value={docente.numeroEmpleado}
        />

        <Item
          label="Correo"
          value={docente.correo}
        />

        <Item
          label="Teléfono"
          value={docente.telefono}
        />

        <Item
          label="Especialidad"
          value={docente.especialidad}
        />

        <Item
          label="Estatus"
          value={docente.estatus}
        />

        <Item
          label="Carreras"
          value={
            docente.carreras?.join(", ")
          }
        />

      </View>

      <TouchableOpacity

        style={styles.botonSalir}

        onPress={cerrarSesion}

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

    <View style={styles.item}>

      <Text style={styles.label}>
        {label}
      </Text>

      <Text style={styles.valor}>
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

  especialidad: {

    marginTop: 5,

    color: "#64748B",

    textAlign: "center"

  },

  cardInfo: {

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

    backgroundColor: "#DC2626",

    padding: 15,

    borderRadius: 15,

    marginTop: 25,

    marginBottom: 40,

    alignItems: "center"

  },

  textoSalir: {

    color: "#FFFFFF",

    fontSize: 16,

    fontWeight: "bold"

  }

});