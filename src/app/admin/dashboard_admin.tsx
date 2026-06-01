import { router } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import {
  FontAwesome5,
  Ionicons,
  MaterialIcons
} from "@expo/vector-icons";
import { useEffect, useState } from "react";

import {
  escucharTotalAlumnos
} from "../../services/alumnoService";

import {
  escucharTotalDocentes
} from "../../services/docenteService";

import {
  escucharTotalAsignaciones
} from "../../services/asignacionService";

export default function DashboardAdmin() {

  const [totalAlumnos,
  setTotalAlumnos] =
  useState(0);

  const [totalDocentes,
  setTotalDocentes] =
  useState(0);

  const [totalAsignaciones,
  setTotalAsignaciones] =
  useState(0);

  useEffect(() => {

  const unsubscribe =
    escucharTotalAlumnos(
      (total) => {

        setTotalAlumnos(total);

      }
    );

  const unsubscribeDocentes =
    escucharTotalDocentes(
      (total) => {

        setTotalDocentes(total);

      }
    );

  const unsubscribeAsignaciones =
    escucharTotalAsignaciones(
      (total) => {

        setTotalAsignaciones(total);

      }
    );

  return () => {

    unsubscribe();
    unsubscribeDocentes();
    unsubscribeAsignaciones();

  };

}, []);

  const cards = [
    {
      titulo: "Alumnos",
      icono: <Ionicons name="people" size={50} color="white" />,
      color: "#4CAF50",
      ruta: "admin/alumnos"
    },
    {
      titulo: "Docentes",
      icono: <FontAwesome5 name="chalkboard-teacher" size={40} color="white" />,
      color: "#FF9800",
      ruta: "/admin/docentes"
    },
    {
      titulo: "Materias",
      icono: <Ionicons name="book" size={50} color="white" />,
      color: "#9C27B0",
      ruta: "/admin/materias"
    },
    {
      titulo: "Asignaciones",
      icono: <Ionicons name="calendar" size={50} color="white" />,
      color: "#2196F3",
      ruta: "/admin/asignaciones"
    },
    {
      titulo: "Calificaciones",
      icono: <MaterialIcons name="grading" size={50} color="white" />,
      color: "#F44336",
      ruta: "/admin/calificaciones"
    },
    {
      titulo: "Acerca de",
      icono: <Ionicons name="cube" size={50} color="white" />,
      color: "#009688",
      ruta: "/admin/ar"
    }
  ];

  return (
    <ScrollView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.titulo}>
            Bienvenido, Administrador
          </Text>

          <Text style={styles.subtitulo}>
            Panel de Control Escolar
          </Text>
        </View>

        <Ionicons
          name="person-circle"
          size={70}
          color="#3F51B5"
        />
      </View>

      {/* Resumen */}
      <View style={styles.resumen}>

        <Text style={styles.resumenTitulo}>
          Resumen General
        </Text>
<View style={styles.estadisticas}>

  <View style={styles.item}>

    <Ionicons
      name="people"
      size={28}
      color="white"
    />

    <Text style={styles.textoStats}>
      {totalAlumnos}
    </Text>

    <Text
      style={styles.textoLabel}
    >
      Alumnos
    </Text>

  </View>

  <View style={styles.item}>

    <Ionicons
      name="school"
      size={28}
      color="white"
    />

    <Text style={styles.textoStats}>
      {totalDocentes}
    </Text>

    <Text
      style={styles.textoLabel}
    >
      Docentes
    </Text>

  </View>

  <View style={styles.item}>

    <Ionicons
      name="calendar"
      size={28}
      color="white"
    />

    <Text style={styles.textoStats}>
      {totalAsignaciones}
    </Text>

    <Text
      style={styles.textoLabel}
    >
      Asignaciones
    </Text>

  </View>

</View>
      </View>

      {/* Tarjetas */}
      <View style={styles.grid}>
        {cards.map((card, index) => (

          <TouchableOpacity
            key={index}
            style={[
              styles.card,
              { backgroundColor: card.color }
            ]}
            onPress={() =>
              router.push(card.ruta as any)
            }
          >

            {card.icono}

            <Text style={styles.cardText}>
              {card.titulo}
            </Text>

          </TouchableOpacity>

        ))}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 15
  },

  header: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2C3E50"
  },

  subtitulo: {
    fontSize: 18,
    color: "#555"
  },

  resumen: {
    backgroundColor: "#1565C0",
    borderRadius: 15,
    padding: 20,
    marginTop: 20
  },

  resumenTitulo: {
    color: "white",
    fontSize: 20,
    marginBottom: 15
  },

  estadisticas: {
    flexDirection: "row",
    justifyContent: "space-around"
  },

  item: {
    alignItems: "center"
  },

  textoStats: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 20
  },

  card: {
    width: "48%",
    height: 150,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    elevation: 5
  },

  cardText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10
  },
  textoLabel: {

  color: "#E3F2FD",

  fontSize: 12,

  marginTop: 4

},

});