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

import {
  Image
} from "react-native";

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

 <Image
  source={{
    uri:
      alumno.foto ||
      "https://via.placeholder.com/120"
  }}
  style={styles.avatar}
/>
  <Text style={styles.nombre}>
    {alumno.nombre}
    {" "}
    {alumno.apellidoPaterno}
    {" "}
    {alumno.apellidoMaterno}
  </Text>

  <Text style={styles.numeroControl}>
    {alumno.numeroControl}
  </Text>

  <View style={styles.chipsContainer}>

    <View style={styles.chip}>
      <Text style={styles.chipText}>
        {alumno.carrera}
      </Text>
    </View>

    <View style={styles.chip}>
      <Text style={styles.chipText}>
        {alumno.semestre}° Semestre
      </Text>
    </View>

  </View>

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

  padding: 20,

  backgroundColor: "#F8FAFC",

  flexGrow: 1

},

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  titulo: {

  fontSize: 30,

  fontWeight: "bold",

  color: "#0F172A",

  textAlign: "center",

  marginBottom: 20

},

  card: {

  backgroundColor: "#FFFFFF",

  borderRadius: 20,

  padding: 20,

  elevation: 5,

  shadowColor: "#000",

  shadowOpacity: 0.08,

  shadowRadius: 10

},

  nombre: {

  fontSize: 24,

  fontWeight: "bold",

  textAlign: "center",

  color: "#1565C0",

  marginBottom: 5

},
item: {

  marginBottom: 15,

  borderBottomWidth: 1,

  borderBottomColor: "#F1F5F9",

  paddingBottom: 10

},

  label: {

  color: "#64748B",

  fontSize: 14

},

  valor: {

  fontSize: 16,

  fontWeight: "600",

  color: "#0F172A",

  marginTop: 3

},
  avatar: {

  width: 120,

  height: 120,

  borderRadius: 60,

  alignSelf: "center",

  marginBottom: 15

},

numeroControl: {

  textAlign: "center",

  color: "#64748B",

  marginBottom: 15

},

chipsContainer: {

  flexDirection: "row",

  justifyContent: "center",

  flexWrap: "wrap",

  gap: 10,

  marginBottom: 20

},

chip: {

  backgroundColor: "#DBEAFE",

  paddingHorizontal: 14,

  paddingVertical: 8,

  borderRadius: 20

},

chipText: {

  color: "#2563EB",

  fontWeight: "600"

}



});