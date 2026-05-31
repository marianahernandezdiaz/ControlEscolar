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
          {asignacion.materiaNombre}
        </Text>

        <Item
          label="Docente"
          value={
            asignacion.docenteNombre
          }
        />

        <Item
          label="Grupo"
          value={
            asignacion.grupo
          }
        />

        <Item
          label="Periodo"
          value={
            asignacion.periodo
          }
        />

        <Item
          label="Estatus"
          value={
            asignacion.estatus
          }
        />

        <Text style={styles.subtitulo}>
          Horarios
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

              <Text>

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
    textAlign: "center",
    marginBottom: 20
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    elevation: 4
  },

  materia: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1565C0",
    textAlign: "center",
    marginBottom: 20
  },

  item: {
    marginBottom: 12
  },

  label: {
    fontWeight: "bold"
  },

  valor: {
    fontSize: 16
  },

  subtitulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10
  },

  horarioCard: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10
  },

  dia: {
    fontWeight: "bold",
    marginBottom: 4
  }

});