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
    obtenerDocentePorId
} from "../../../services/docenteService";

export default function DetalleDocente() {

  const { id } =
    useLocalSearchParams();

  const [docente, setDocente] =
    useState<any>(null);

  useEffect(() => {

    cargarDocente();

  }, []);

  const cargarDocente = async () => {

    const datos =
      await obtenerDocentePorId(
        id as string
      );

    setDocente(datos);

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
        Información del Docente
      </Text>

      <View style={styles.card}>

        <Text style={styles.nombre}>

          {docente.nombre}
          {" "}
          {docente.apellidoPaterno}
          {" "}
          {docente.apellidoMaterno}

        </Text>

        <Item
          label="Número de Empleado"
          value={
            docente.numeroEmpleado
          }
        />

        <Item
          label="Correo"
          value={
            docente.correo
          }
        />

        <Item
          label="Teléfono"
          value={
            docente.telefono
          }
        />

        <Item
          label="Especialidad"
          value={
            docente.especialidad
          }
        />

        <Item
          label="Estatus"
          value={
            docente.estatus
          }
        />

        <Text style={styles.subtitulo}>
          Carreras
        </Text>

        {docente.carreras?.map(
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