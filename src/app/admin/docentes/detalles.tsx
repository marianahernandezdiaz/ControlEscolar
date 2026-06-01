import { useEffect, useState } from "react";

import {
  Image,
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

  const [docente,
    setDocente] =
    useState<any>(null);

  useEffect(() => {

    cargarDocente();

  }, []);

  const cargarDocente =
    async () => {

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

        <Image
          source={{
            uri:
              docente.foto ||
              "https://via.placeholder.com/120"
          }}
          style={styles.avatar}
        />

        <Text style={styles.nombre}>

          {docente.nombre}
          {" "}
          {docente.apellidoPaterno}
          {" "}
          {docente.apellidoMaterno}

        </Text>

        <Text style={styles.numeroEmpleado}>
          {docente.numeroEmpleado}
        </Text>

        <View style={styles.chipsContainer}>

          <View style={styles.chipEspecialidad}>

            <Text style={styles.chipText}>

              {docente.especialidad}

            </Text>

          </View>

          <View style={styles.chipEstatus}>

            <Text style={styles.chipText}>

              {docente.estatus}

            </Text>

          </View>

        </View>

        <Item
          label="Correo"
          value={docente.correo}
        />

        <Item
          label="Teléfono"
          value={docente.telefono}
        />

        <Text style={styles.subtitulo}>
          Carreras Asignadas
        </Text>

        <View style={styles.carrerasContainer}>

          {docente.carreras?.map(
            (
              carrera: string
            ) => (

              <View
                key={carrera}
                style={styles.carreraChip}
              >

                <Text
                  style={
                    styles.carreraText
                  }
                >

                  {carrera}

                </Text>

              </View>

            )
          )}

        </View>

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

    textAlign: "center",

    color: "#0F172A",

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

  avatar: {

    width: 130,

    height: 130,

    borderRadius: 65,

    alignSelf: "center",

    marginBottom: 15

  },

  nombre: {

    fontSize: 24,

    fontWeight: "bold",

    textAlign: "center",

    color: "#1565C0",

    marginBottom: 5

  },

  numeroEmpleado: {

    textAlign: "center",

    color: "#64748B",

    marginBottom: 15,

    fontSize: 15

  },

  chipsContainer: {

    flexDirection: "row",

    justifyContent: "center",

    flexWrap: "wrap",

    gap: 10,

    marginBottom: 20

  },

  chipEspecialidad: {

    backgroundColor: "#DBEAFE",

    paddingHorizontal: 14,

    paddingVertical: 8,

    borderRadius: 20

  },

  chipEstatus: {

    backgroundColor: "#DCFCE7",

    paddingHorizontal: 14,

    paddingVertical: 8,

    borderRadius: 20

  },

  chipText: {

    fontWeight: "600",

    color: "#1E40AF"

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

  subtitulo: {

    fontSize: 18,

    fontWeight: "bold",

    color: "#0F172A",

    marginTop: 15,

    marginBottom: 12

  },

  carrerasContainer: {

    flexDirection: "row",

    flexWrap: "wrap",

    gap: 10

  },

  carreraChip: {

    backgroundColor: "#E0E7FF",

    paddingHorizontal: 14,

    paddingVertical: 8,

    borderRadius: 20

  },

  carreraText: {

    color: "#4338CA",

    fontWeight: "600"

  }

});