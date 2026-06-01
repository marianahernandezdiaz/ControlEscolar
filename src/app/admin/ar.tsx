import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { router } from "expo-router";

import {
  logoutUser
} from "../../services/authService";

export default function PerfilAdmin() {

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

              await logoutUser();

              router.replace(
                "/auth/login"
              );

            }

          }

        ]

      );

    };

  return (

    <ScrollView
      contentContainerStyle={
        styles.container
      }
    >

      <Text style={styles.titulo}>
        Acerca del Proyecto
      </Text>

      <View style={styles.card}>

        <Text style={styles.nombreProyecto}>
          📱 Control Escolar
        </Text>

        <Text style={styles.descripcion}>

          Aplicación móvil de control escolar

        </Text>

      </View>

      <View style={styles.card}>

        <Text style={styles.label}>
          👩‍💻 Desarrolladora
        </Text>

        <Text style={styles.valor}>
          Mariana Sinaí Hernández Díaz
        </Text>

        <Text style={styles.label}>
          🎓 Carrera
        </Text>

        <Text style={styles.valor}>
          Ingeniería en Sistemas Computacionales
        </Text>

        <Text style={styles.label}>
          📚 Materia
        </Text>

        <Text style={styles.valor}>
          Tecnología Móvil
        </Text>

        <Text style={styles.label}>
          🏫 Institución
        </Text>

        <Text style={styles.valor}>
          Instituto Tecnológico de Toluca
        </Text>

        <Text style={styles.label}>
          📅 Periodo
        </Text>

        <Text style={styles.valor}>
          2026-B
        </Text>

      </View>

      <TouchableOpacity

        style={styles.botonSalir}

        onPress={cerrarSesion}

      >

        <Text style={styles.textoBoton}>
          Cerrar Sesión
        </Text>

      </TouchableOpacity>

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

  card: {

    backgroundColor: "#FFFFFF",

    borderRadius: 20,

    padding: 20,

    marginBottom: 20,

    elevation: 4

  },

  nombreProyecto: {

    fontSize: 24,

    fontWeight: "bold",

    color: "#1565C0",

    marginBottom: 10,

    textAlign: "center"

  },

  descripcion: {

    textAlign: "justify",

    color: "#475569",

    lineHeight: 22

  },

  label: {

    fontWeight: "bold",

    color: "#1565C0",

    marginTop: 12

  },

  valor: {

    color: "#334155",

    marginTop: 3

  },

  botonSalir: {

    backgroundColor: "#DC2626",

    padding: 15,

    borderRadius: 15,

    alignItems: "center",

    marginTop: 10,

    marginBottom: 30

  },

  textoBoton: {

    color: "#FFFFFF",

    fontWeight: "bold",

    fontSize: 16

  }

});