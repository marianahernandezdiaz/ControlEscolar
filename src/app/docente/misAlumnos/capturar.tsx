import { useState } from "react";

import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import {
  useLocalSearchParams
} from "expo-router";

import {
  guardarCalificacion
} from "../../../services/calificacionService";

export default function Calificaciones() {

const {

  alumnoId,
  alumnoNombre,
  asignacionId,
  materiaNombre,
  docenteNombre,
  grupo

} = useLocalSearchParams();

  const [unidad1,
    setUnidad1] =
    useState("");

  const [unidad2,
    setUnidad2] =
    useState("");

  const [unidad3,
    setUnidad3] =
    useState("");

  const calcularPromedio =
    () => {

      const u1 =
        Number(unidad1) || 0;

      const u2 =
        Number(unidad2) || 0;

      const u3 =
        Number(unidad3) || 0;

      return (
        (
          u1 +
          u2 +
          u3
        ) / 3
      ).toFixed(1);

    };

  const guardar =
    async () => {

      try {

        const u1 =
          Number(unidad1);

        const u2 =
          Number(unidad2);

        const u3 =
          Number(unidad3);

        if (

          isNaN(u1) ||

          isNaN(u2) ||

          isNaN(u3)

        ) {

          Alert.alert(

            "Error",

            "Captura todas las unidades"

          );

          return;

        }

        if (

          u1 < 0 || u1 > 100 ||

          u2 < 0 || u2 > 100 ||

          u3 < 0 || u3 > 100

        ) {

          Alert.alert(

            "Error",

            "Las calificaciones deben estar entre 0 y 100"

          );

          return;

        }

        const promedio =

          Number(
            calcularPromedio()
          );
await guardarCalificacion({

  alumnoId,

  alumnoNombre,

  asignacionId,

  materiaNombre,

  docenteNombre,

  grupo,

  unidad1: u1,

  unidad2: u2,

  unidad3: u3,

  promedio,

  fechaRegistro:
    new Date()

});
        Alert.alert(

          "Éxito",

          "Calificación guardada correctamente"

        );

      } catch (error) {

        console.log(error);

        Alert.alert(

          "Error",

          "No fue posible guardar"

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
        Captura de Calificaciones
      </Text>

      <View style={styles.cardInfo}>

        <Text style={styles.nombre}>
          {alumnoNombre}
        </Text>

        <Text style={styles.info}>
          📚 {materiaNombre}
        </Text>

        <Text style={styles.info}>
          👨‍🏫 {docenteNombre}
        </Text>

      </View>

      <View style={styles.card}>

        <Text style={styles.label}>
          Unidad 1
        </Text>

        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={unidad1}
          onChangeText={setUnidad1}
          placeholder="0 - 100"
        />

        <Text style={styles.label}>
          Unidad 2
        </Text>

        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={unidad2}
          onChangeText={setUnidad2}
          placeholder="0 - 100"
        />

        <Text style={styles.label}>
          Unidad 3
        </Text>

        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={unidad3}
          onChangeText={setUnidad3}
          placeholder="0 - 100"
        />

        <View
          style={styles.promedioBox}
        >

          <Text
            style={styles.promedio}
          >

            Promedio Final:
            {" "}
            {calcularPromedio()}

          </Text>

        </View>

        <TouchableOpacity
          style={styles.boton}
          onPress={guardar}
        >

          <Text
            style={styles.textoBoton}
          >

            Guardar Calificación

          </Text>

        </TouchableOpacity>

      </View>

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

  nombre: {

    fontSize: 22,

    fontWeight: "bold",

    color: "#1565C0",

    marginBottom: 10

  },

  info: {

    color: "#475569",

    marginBottom: 5

  },

  card: {

    backgroundColor: "#FFFFFF",

    borderRadius: 18,

    padding: 20,

    elevation: 4

  },

  label: {

    fontWeight: "600",

    marginBottom: 5,

    color: "#334155"

  },

  input: {

    borderWidth: 1,

    borderColor: "#CBD5E1",

    borderRadius: 12,

    padding: 12,

    marginBottom: 15,

    backgroundColor: "#FFF"

  },

  promedioBox: {

    backgroundColor: "#DBEAFE",

    padding: 15,

    borderRadius: 12,

    marginBottom: 20

  },

  promedio: {

    fontSize: 18,

    fontWeight: "bold",

    color: "#1565C0",

    textAlign: "center"

  },

  boton: {

    backgroundColor: "#1565C0",

    padding: 15,

    borderRadius: 12,

    alignItems: "center"

  },

  textoBoton: {

    color: "#FFFFFF",

    fontWeight: "bold",

    fontSize: 16

  }

});