import { useEffect, useState } from "react";

import {
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native";

import {
    useLocalSearchParams
} from "expo-router";

import {
    obtenerAlumnoPorId
} from "../../../services/alumnoService";

export default function DetalleAlumno() {

  const { id } =
    useLocalSearchParams();

  const [alumno, setAlumno] =
    useState<any>(null);

  useEffect(() => {

    cargarAlumno();

  }, []);

  const cargarAlumno = async () => {

    const datos =
      await obtenerAlumnoPorId(
        id as string
      );

    setAlumno(datos);

  };

  if (!alumno) {

    return (
      <View style={styles.center}>
        <Text>Cargando...</Text>
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
        Información del Alumno
      </Text>

      <View style={styles.card}>

        <Text style={styles.nombre}>
          {alumno.nombre}
          {" "}
          {alumno.apellidoPaterno}
          {" "}
          {alumno.apellidoMaterno}
        </Text>

        <Item
          label="Número de Control"
          value={alumno.numeroControl}
        />

        <Item
          label="Edad"
          value={alumno.edad}
        />

        <Item
          label="Género"
          value={alumno.genero}
        />

        <Item
          label="Teléfono"
          value={alumno.telefono}
        />

        <Item
          label="Correo"
          value={alumno.correo}
        />

        <Item
          label="Dirección"
          value={alumno.direccion}
        />

        <Item
          label="Carrera"
          value={alumno.carrera}
        />

        <Item
          label="Semestre"
          value={alumno.semestre}
        />

        <Item
          label="Estatus"
          value={alumno.estatus}
        />

      </View>

    </ScrollView>

  );

}

function Item({
  label,
  value
}: {
  label: string;
  value: any;
}) {

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
    padding: 20
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center"
  },

  card: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    elevation: 4
  },

  nombre: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#1565C0"
  },

  item: {
    marginBottom: 15
  },

  label: {
    fontWeight: "bold",
    color: "#555"
  },

  valor: {
    fontSize: 16,
    marginTop: 3
  }

});