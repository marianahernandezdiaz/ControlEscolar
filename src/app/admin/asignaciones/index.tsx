import { useEffect, useState } from "react";

import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

import { router } from "expo-router";

import { Ionicons } from "@expo/vector-icons";

import {
    eliminarAsignacion,
    escucharAsignaciones
} from "../../../services/asignacionService";

export default function AsignacionesScreen() {

  const [asignaciones, setAsignaciones] =
    useState<any[]>([]);

  const [busqueda, setBusqueda] =
    useState("");

  useEffect(() => {

    const unsubscribe =
      escucharAsignaciones(
        (datos) => {

          setAsignaciones(datos);

        }
      );

    return () => unsubscribe();

  }, []);

  const handleEliminar = (
    id: string,
    materia: string
  ) => {

    Alert.alert(

      "Eliminar Asignación",

      `¿Desea eliminar la asignación de ${materia}?`,

      [

        {
          text: "Cancelar",
          style: "cancel"
        },

        {
          text: "Eliminar",

          style: "destructive",

          onPress: async () => {

            try {

              await eliminarAsignacion(
                id
              );

            } catch {

              Alert.alert(
                "Error",
                "No fue posible eliminar"
              );

            }

          }

        }

      ]

    );

  };

  const asignacionesFiltradas =
    asignaciones.filter(
      asignacion => {

        const texto =
          busqueda.toLowerCase();

        return (

          asignacion.materiaNombre
            ?.toLowerCase()
            .includes(texto)

          ||

          asignacion.docenteNombre
            ?.toLowerCase()
            .includes(texto)

        );

      }
    );

  return (

    <View style={styles.container}>

      <Text style={styles.titulo}>
        Gestión de Asignaciones
      </Text>

      <TextInput
        placeholder="Buscar por materia o docente"
        value={busqueda}
        onChangeText={setBusqueda}
        style={styles.buscador}
      />

      <FlatList

        data={
          asignacionesFiltradas
        }

        keyExtractor={(item) =>
          item.id
        }

        renderItem={({ item }) => (

          <View style={styles.card}>

            <Text style={styles.materia}>

              {item.materiaNombre}

            </Text>

            <Text style={styles.info}>
              Docente:
              {" "}
              {item.docenteNombre}
            </Text>

            <Text style={styles.info}>
              Grupo:
              {" "}
              {item.grupo}
            </Text>

            <Text style={styles.info}>
              Periodo:
              {" "}
              {item.periodo}
            </Text>

            <Text style={styles.subtitulo}>
              Horarios
            </Text>

            {item.horarios?.map(
              (
                horario: any,
                index: number
              ) => (

                <Text
                  key={index}
                  style={styles.horario}
                >

                  • {horario.dia}
                  {" "}
                  {horario.horaInicio}
                  {" - "}
                  {horario.horaFin}

                </Text>

              )
            )}

            <View
              style={styles.botones}
            >

              <TouchableOpacity

                onPress={() =>
                  router.push({

                    pathname:
                      "/admin/asignaciones/detalle",

                    params: {
                      id: item.id
                    }

                  })
                }

              >

                <Ionicons
                  name="eye"
                  size={24}
                  color="#2196F3"
                />

              </TouchableOpacity>

              <TouchableOpacity

                onPress={() =>
                  router.push({

                    pathname:
                      "/admin/asignaciones/editar",

                    params: {
                      id: item.id
                    }

                  })
                }

              >

                <Ionicons
                  name="create"
                  size={24}
                  color="#FF9800"
                />

              </TouchableOpacity>

              <TouchableOpacity

                onPress={() =>
                  handleEliminar(
                    item.id,
                    item.materiaNombre
                  )
                }

              >

                <Ionicons
                  name="trash"
                  size={24}
                  color="#F44336"
                />

              </TouchableOpacity>

            </View>

          </View>

        )}

      />

      <TouchableOpacity

        style={styles.fab}

        onPress={() =>
          router.push(
            "/admin/asignaciones/crear"
          )
        }

      >

        <Ionicons
          name="add"
          size={35}
          color="white"
        />

      </TouchableOpacity>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#F5F5F5"
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 15
  },

  buscador: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15
  },

  card: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    elevation: 3
  },

  materia: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1565C0"
  },

  info: {
    marginTop: 4,
    color: "#555"
  },

  subtitulo: {
    marginTop: 10,
    fontWeight: "bold"
  },

  horario: {
    marginTop: 3
  },

  botones: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15
  },

  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,

    width: 65,
    height: 65,

    borderRadius: 35,

    backgroundColor: "#1565C0",

    justifyContent: "center",
    alignItems: "center",

    elevation: 10
  }

});