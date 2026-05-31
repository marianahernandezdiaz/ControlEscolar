import { useEffect, useState } from "react";

import {
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native";

import { useLocalSearchParams } from "expo-router";

import {
    obtenerMateriaPorId
} from "../../../services/materiaService";

export default function DetalleMateria() {

  const { id } =
    useLocalSearchParams();

  const [materia, setMateria] =
    useState<any>(null);

  useEffect(() => {

    cargarMateria();

  }, []);

  const cargarMateria = async () => {

    const datos =
      await obtenerMateriaPorId(
        id as string
      );

    setMateria(datos);

  };

  if (!materia) {

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
        Información de la Materia
      </Text>

      <View style={styles.card}>

        <Text style={styles.nombre}>
          {materia.nombre}
        </Text>

        <Item
          label="Clave"
          value={materia.clave}
        />

        <Item
          label="Semestre"
          value={materia.semestre}
        />

        <Item
          label="Créditos"
          value={materia.creditos}
        />

        <Item
          label="Estatus"
          value={materia.estatus}
        />

        <Text style={styles.subtitulo}>
          Carreras
        </Text>

        {materia.carreras?.map(
          (carrera: string) => (

            <Text
              key={carrera}
              style={styles.carrera}
            >
              • {carrera}
            </Text>

          )
        )}

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
    color: "#1565C0",
    marginBottom: 20,
    textAlign: "center"
  },

  subtitulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10
  },

  carrera: {
    fontSize: 16,
    marginBottom: 5
  },

  item: {
    marginBottom: 12
  },

  label: {
    fontWeight: "bold"
  },

  valor: {
    fontSize: 16
  }

});