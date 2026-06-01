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
  escucharCalificacionesDocente
} from "../../../services/calificacionService";

export default function Calificaciones() {

  const [calificaciones,
    setCalificaciones] =
    useState<any[]>([]);

  const [busqueda,
    setBusqueda] =
    useState("");

  useEffect(() => {

    cargarDatos();

  }, []);

  

  const cargarDatos =
    async () => {

      try {

        const correo =
          auth.currentUser?.email;

        if (!correo) return;

        const docente: any =

          await obtenerDocentePorCorreo(
            correo
          );

        if (!docente) return;

        const nombreCompleto =

          `${docente.nombre} ${docente.apellidoPaterno} ${docente.apellidoMaterno}`
            .replace(/\s+/g, " ")
            .trim();

        escucharCalificacionesDocente(

          nombreCompleto,

          (datos) => {

            setCalificaciones(
              datos
            );

          }

        );

      } catch (error) {

        console.log(error);

      }

    };

  const filtradas =

    calificaciones.filter(
      (item) =>

        item.materiaNombre
          ?.toLowerCase()
          .includes(
            busqueda.toLowerCase()
          )

    );

const agrupadas =
  filtradas.reduce(

    (acc: any, item: any) => {

      if (
        !acc[item.materiaNombre]
      ) {

        acc[item.materiaNombre] = {};

      }

      if (
        !acc[item.materiaNombre][item.grupo]
      ) {

        acc[item.materiaNombre][item.grupo] = [];

      }

      acc[item.materiaNombre][item.grupo]
        .push(item);

      return acc;

    },

    {}

  );

  return (

    <ScrollView
      contentContainerStyle={
        styles.container
      }
    >

      <Text style={styles.titulo}>
        Calificaciones
      </Text>

      <TextInput
        placeholder="Buscar materia..."
        value={busqueda}
        onChangeText={setBusqueda}
        style={styles.input}
      />

      <Text style={styles.total}>
        Registros:
        {" "}
        {filtradas.length}
      </Text>

{
  Object.entries(
    agrupadas
  ).map(

    ([materia, grupos]: any) => (

      <View
        key={materia}
        style={styles.cardMateria}
      >

        <Text
          style={styles.materia}
        >

          📚 {materia}

        </Text>

        {
          Object.entries(
            grupos
          ).map(

            ([grupo, alumnos]: any) => (

              <View
                key={grupo}
                style={styles.cardGrupo}
              >

                <Text
                  style={styles.grupo}
                >

                  🏷 Grupo {grupo}

                </Text>

                {
                  alumnos.map(
                    (item: any) => (

                      <View
                        key={item.id}
                        style={styles.cardAlumno}
                      >

                        <Text
                          style={styles.alumno}
                        >

                          👨‍🎓
                          {" "}
                          {item.alumnoNombre}

                        </Text>

                        <Text>
                          U1:
                          {" "}
                          {item.unidad1}
                        </Text>

                        <Text>
                          U2:
                          {" "}
                          {item.unidad2}
                        </Text>

                        <Text>
                          U3:
                          {" "}
                          {item.unidad3}
                        </Text>

                        <Text
                          style={
                            styles.promedio
                          }
                        >

                          Promedio:
                          {" "}
                          {item.promedio}

                        </Text>

                      </View>

                    )
                  )
                }

              </View>

            )

          )
        }

      </View>

    )

  )
}
 

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

  input: {

    backgroundColor: "#FFFFFF",

    borderRadius: 12,

    padding: 14,

    marginBottom: 15,

    borderWidth: 1,

    borderColor: "#CBD5E1"

  },

  total: {

    marginBottom: 15,

    color: "#1565C0",

    fontWeight: "600"

  },

  card: {

    backgroundColor: "#FFFFFF",

    borderRadius: 18,

    padding: 20,

    marginBottom: 15,

    elevation: 4

  },

  materia: {

    fontSize: 20,

    fontWeight: "bold",

    color: "#1565C0",

    marginBottom: 10

  },

  alumno: {

    fontWeight: "600",

    marginBottom: 10,

    color: "#334155"

  },

  promedio: {

    marginTop: 10,

    fontSize: 18,

    fontWeight: "bold",

    color: "#16A34A"

  },

  grupoCard: {

  backgroundColor: "#FFFFFF",

  borderRadius: 20,

  padding: 20,

  marginBottom: 20,

  elevation: 4

},

tituloMateria: {

  fontSize: 24,

  fontWeight: "bold",

  color: "#1565C0",

  marginBottom: 15

},

cardAlumno: {

  backgroundColor: "#F8FAFC",

  borderRadius: 15,

  padding: 15,

  marginBottom: 10,

  borderWidth: 1,

  borderColor: "#E2E8F0"

},

cardGrupo: {

  backgroundColor: "#F8FAFC",

  borderRadius: 15,

  padding: 15,

  marginTop: 10,

  marginBottom: 15,

  borderWidth: 1,

  borderColor: "#E2E8F0"

},

grupo: {

  fontSize: 18,

  fontWeight: "bold",

  color: "#334155",

  marginBottom: 12

},

cardMateria: {

  backgroundColor: "#FFFFFF",

  borderRadius: 20,

  padding: 20,

  marginBottom: 20,

  elevation: 4,

  borderLeftWidth: 5,

  borderLeftColor: "#1565C0"

},

});