import { useEffect, useMemo, useState } from "react";

import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";

import { auth } from "../../../services/firebase";

import {
    obtenerAlumnoPorCorreo
} from "../../../services/alumnoService";

import {
    escucharInscripcionesAlumno
} from "../../../services/inscripcionService";

export default function MisMaterias() {

  const [alumno,
    setAlumno] =
    useState<any>(null);

  const [materias,
    setMaterias] =
    useState<any[]>([]);

  const [busqueda,
    setBusqueda] =
    useState("");

  useEffect(() => {

    cargarMaterias();

  }, []);

  const cargarMaterias =
    async () => {

      try {

        const correo =
          auth.currentUser?.email;

        if (!correo) return;

        const alumnoData =
          await obtenerAlumnoPorCorreo(
            correo
          );

        if (!alumnoData) return;

        setAlumno(alumnoData);

        escucharInscripcionesAlumno(

          alumnoData.id,

          (datos) => {

            setMaterias(datos);

          }

        );

      } catch (error) {

        console.log(error);

      }

    };

  const materiasFiltradas =
    useMemo(() => {

      return materias.filter(
        (materia) =>

          materia.materiaNombre
            ?.toLowerCase()
            .includes(
              busqueda.toLowerCase()
            )

      );

    }, [
      materias,
      busqueda
    ]);

  return (

    <ScrollView
      contentContainerStyle={
        styles.container
      }
    >

      <Text style={styles.titulo}>
        Mis Materias
      </Text>

      <TextInput
        placeholder="Buscar materia..."
        value={busqueda}
        onChangeText={setBusqueda}
        style={styles.input}
      />

      <Text style={styles.total}>
        Materias inscritas:
        {" "}
        {materiasFiltradas.length}
      </Text>

      {materiasFiltradas.length === 0 ? (

        <View style={styles.cardVacia}>

          <Text
            style={styles.textoVacio}
          >

            No se encontraron materias

          </Text>

        </View>

      ) : (

        materiasFiltradas.map(
          (materia) => (

            <View
              key={materia.id}
              style={styles.card}
            >

              <Text style={styles.nombreMateria}>
                {materia.materiaNombre}
              </Text>

              <Text style={styles.info}>
                👨‍🏫 {materia.docenteNombre}
              </Text>

              <Text style={styles.info}>
                🏷 Grupo: {materia.grupo}
              </Text>

              <Text style={styles.info}>
                📅 Periodo: {materia.periodo}
              </Text>

              <Text style={styles.horarioTitulo}>
                🕒 Horarios
              </Text>

              {
                materia.horarios?.map(
                  (
                    horario: any,
                    index: number
                  ) => (

                    <Text
                      key={index}
                      style={styles.horario}
                    >

                      {horario.dia}
                      {"  "}
                      {horario.horaInicio}
                      {" - "}
                      {horario.horaFin}

                    </Text>

                  )
                )
              }

            </View>

          )
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

  cardAlumno: {

    backgroundColor: "#FFFFFF",

    borderRadius: 18,

    padding: 20,

    marginBottom: 20,

    elevation: 4

  },

  nombreAlumno: {

    fontSize: 22,

    fontWeight: "bold",

    color: "#1565C0",

    marginBottom: 6

  },

  infoAlumno: {

    color: "#475569",

    fontSize: 15

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

    fontSize: 16,

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

  nombreMateria: {

    fontSize: 24,

    fontWeight: "bold",

    color: "#1565C0",

    marginBottom: 12

  },

  info: {

    fontSize: 16,

    color: "#334155",

    marginBottom: 6

  },

  horarioTitulo: {

    marginTop: 12,

    fontSize: 16,

    fontWeight: "bold",

    color: "#1565C0"

  },

  horario: {

    marginTop: 5,

    color: "#475569",

    fontSize: 15

  },

  cardVacia: {

    backgroundColor: "#FFFFFF",

    padding: 30,

    borderRadius: 18,

    alignItems: "center",

    elevation: 3

  },

  textoVacio: {

    color: "#64748B",

    fontSize: 16

  }

});