import { useEffect, useState } from "react";

import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";

import { auth } from "../../../services/firebase";

import {
    obtenerDocentePorCorreo
} from "../../../services/docenteService";

import {
    escucharAsignacionesDocente
} from "../../../services/asignacionService";

export default function MisAsignaciones() {

  const [docente,
    setDocente] =
    useState<any>(null);

  const [asignaciones,
    setAsignaciones] =
    useState<any[]>([]);

  const [busqueda,
    setBusqueda] =
    useState("");

  useEffect(() => {

    cargarAsignaciones();

  }, []);

  const cargarAsignaciones =
    async () => {

      try {

        const correo =
          auth.currentUser?.email;

        if (!correo) return;

        const docenteData =

          await obtenerDocentePorCorreo(
            correo
          );

        if (!docenteData) return;

        setDocente(docenteData);

        escucharAsignacionesDocente(

          docenteData.id,

          (datos) => {

            setAsignaciones(datos);

          }

        );

      } catch (error) {

        console.log(error);

      }

    };

  const asignacionesFiltradas =

    asignaciones.filter(
      (asignacion) =>

        asignacion.materiaNombre
          ?.toLowerCase()
          .includes(
            busqueda.toLowerCase()
          )

    );

  return (

    <ScrollView
      contentContainerStyle={
        styles.container
      }
    >

      <Text style={styles.titulo}>
        Mis Asignaciones
      </Text>

      {docente && (

        <View style={styles.cardDocente}>

          <Text style={styles.nombre}>

            {docente.nombre}
            {" "}
            {docente.apellidoPaterno}

          </Text>

          <Text>
            {docente.especialidad}
          </Text>

        </View>

      )}

      <TextInput
        placeholder="Buscar materia..."
        value={busqueda}
        onChangeText={setBusqueda}
        style={styles.input}
      />

      <Text style={styles.total}>
        Total:
        {" "}
        {asignacionesFiltradas.length}
      </Text>

      {asignacionesFiltradas.map(
        (asignacion) => (

          <View
            key={asignacion.id}
            style={styles.card}
          >

            <Text
              style={
                styles.materia
              }
            >

              {
                asignacion.materiaNombre
              }

            </Text>

            <Text style={styles.info}>
              🏷 Grupo: {asignacion.grupo}
            </Text>

            <Text style={styles.info}>
              📚 Semestre: {asignacion.semestre}
            </Text>

            <Text style={styles.info}>
              🎓 {asignacion.carrera}
            </Text>

            <Text style={styles.info}>
              📅 {asignacion.periodo}
            </Text>

            <Text
              style={
                styles.subtitulo
              }
            >

              🕒 Horarios

            </Text>

            {
              asignacion.horarios?.map(
                (
                  horario: any,
                  index: number
                ) => (

                  <Text
                    key={index}
                    style={
                      styles.horario
                    }
                  >

                    {horario.dia}
                    {" "}
                    {horario.horaInicio}
                    {" - "}
                    {horario.horaFin}

                  </Text>

                )
              )
            }

          </View>

        )
      )}

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

  cardDocente: {

    backgroundColor: "#FFFFFF",

    borderRadius: 18,

    padding: 20,

    marginBottom: 20,

    elevation: 4

  },

  nombre: {

    fontSize: 22,

    fontWeight: "bold",

    color: "#1565C0"

  },

  input: {

    backgroundColor: "#FFFFFF",

    borderRadius: 12,

    padding: 14,

    marginBottom: 15,

    borderWidth: 1,

    borderColor: "#E2E8F0"

  },

  total: {

    fontWeight: "600",

    color: "#1565C0",

    marginBottom: 15

  },

  card: {

    backgroundColor: "#FFFFFF",

    borderRadius: 18,

    padding: 20,

    marginBottom: 15,

    elevation: 4

  },

  materia: {

    fontSize: 22,

    fontWeight: "bold",

    color: "#1565C0",

    marginBottom: 10

  },

  info: {

    marginBottom: 5,

    color: "#334155"

  },

  subtitulo: {

    marginTop: 12,

    marginBottom: 6,

    fontWeight: "bold",

    color: "#1565C0"

  },

  horario: {

    color: "#475569",

    marginBottom: 4

  }

});