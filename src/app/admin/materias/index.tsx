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
    eliminarMateria,
    escucharMaterias
} from "../../../services/materiaService";

export default function MateriasScreen() {

  const [materias, setMaterias] =
    useState<any[]>([]);

  const [busqueda, setBusqueda] =
    useState("");

  useEffect(() => {

    const unsubscribe =
      escucharMaterias(
        (datos) => {

          setMaterias(datos);

        }
      );

    return () => unsubscribe();

  }, []);

  const handleEliminar = (
    id: string,
    nombre: string
  ) => {

    Alert.alert(

      "Eliminar Materia",

      `¿Desea eliminar ${nombre}?`,

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

              await eliminarMateria(id);

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

  const materiasFiltradas =
    materias.filter(
      (materia) => {

        const texto =
          busqueda.toLowerCase();

        return (

          materia.nombre
            ?.toLowerCase()
            .includes(texto)

          ||

          materia.clave
            ?.toLowerCase()
            .includes(texto)

        );

      }
    );

  return (

    <View style={styles.container}>

      <Text style={styles.titulo}>
        Gestión de Materias
      </Text>

      <TextInput
        placeholder="Buscar por nombre o clave"
        value={busqueda}
        onChangeText={setBusqueda}
        style={styles.buscador}
      />

      <FlatList

        data={materiasFiltradas}

        keyExtractor={(item) =>
          item.id
        }

        renderItem={({ item }) => (

          <View style={styles.card}>

            <Text style={styles.nombre}>
              {item.nombre}
            </Text>

            <Text style={styles.info}>
              Clave: {item.clave}
            </Text>

            <Text style={styles.info}>
              Semestre: {item.semestre}
            </Text>

            <Text style={styles.info}>
              Créditos: {item.creditos}
            </Text>

            <Text style={styles.info}>
              Carreras:
              {" "}
              {item.carreras?.length || 0}
            </Text>

            <Text
              style={styles.estatus}
            >
              {item.estatus}
            </Text>

            <View
              style={styles.botones}
            >

              <TouchableOpacity

                onPress={() =>
                  router.push({
                    pathname:
                      "/admin/materias/detalle",

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
                      "/admin/materias/editar",

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
                    item.nombre
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
            "/admin/materias/crear"
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

  nombre: {
    fontSize: 18,
    fontWeight: "bold"
  },

  info: {
    marginTop: 3,
    color: "#555"
  },

  estatus: {
    color: "#4CAF50",
    fontWeight: "bold",
    marginTop: 8
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