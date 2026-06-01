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
  obtenerAsignacionPorId
} from "../../../services/asignacionService";

export default function DetalleAsignacion() {

  const { id } =
    useLocalSearchParams();

  const [asignacion,
    setAsignacion] =
    useState<any>(null);

  useEffect(() => {

    cargarAsignacion();

  }, []);

  const cargarAsignacion =
    async () => {

      const datos =
        await obtenerAsignacionPorId(
          id as string
        );

      setAsignacion(datos);

    };

  if (!asignacion) {

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
        Detalle de Asignación
      </Text>

      <View style={styles.card}>

        <Text style={styles.materia}>
          📚 {asignacion.materiaNombre}
        </Text>

        <Item
          label="👨‍🏫 Docente"
          value={
            asignacion.docenteNombre
          }
        />

        <Item
          label="🎓 Carrera"
          value={
            asignacion.carrera
          }
        />

        <Item
          label="📖 Semestre"
          value={
            asignacion.semestre
          }
        />

        <Item
          label="👥 Grupo"
          value={
            asignacion.grupo
          }
        />

        <Item
          label="🪑 Cupo"
          value={
            `${asignacion.cupo} alumnos`
          }
        />

        <Item
          label="📅 Periodo"
          value={
            asignacion.periodo
          }
        />

        <Item
          label="📌 Estatus"
          value={
            asignacion.estatus
          }
        />

        <Text style={styles.subtitulo}>
          🕒 Horarios
        </Text>

        {asignacion.horarios?.map(
          (
            horario: any,
            index: number
          ) => (

            <View
              key={index}
              style={
                styles.horarioCard
              }
            >

              <Text
                style={
                  styles.dia
                }
              >
                {horario.dia}
              </Text>

              <Text
                style={
                  styles.hora
                }
              >

                {horario.horaInicio}
                {" - "}
                {horario.horaFin}

              </Text>

            </View>

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
    backgroundColor: "#F5F7FA",
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
    marginBottom: 25,
    color: "#1E293B"
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3
    }
  },

  materia: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1565C0",
    textAlign: "center",
    marginBottom: 25
  },

  item: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ECECEC",
    paddingBottom: 8
  },

  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 3
  },

  valor: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222"
  },

  subtitulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 15,
    color: "#1565C0"
  },

  horarioCard: {
    backgroundColor: "#F7F9FC",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: "#1565C0"
  },

  dia: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1565C0"
  },

  hora: {
    marginTop: 5,
    fontSize: 15,
    color: "#444"
  }

});