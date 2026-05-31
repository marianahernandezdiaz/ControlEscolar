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
  eliminarAlumno,
  escucharAlumnos
} from "../../../services/alumnoService";


export default function ListaAlumnos() {

  const [alumnos, setAlumnos] =
    useState<any[]>([]);

  const [busqueda, setBusqueda] =
    useState("");

  useEffect(() => {

  const unsubscribe =
    escucharAlumnos(
      (datos) => {

        setAlumnos(datos);

      }
    );

  return () => unsubscribe();

  

}, []);
  


  const alumnosFiltrados =
    alumnos.filter((alumno) => {

      const texto =
        busqueda.toLowerCase();

      const nombreCompleto =
        `${alumno.nombre}
         ${alumno.apellidoPaterno}
         ${alumno.apellidoMaterno}`
         .toLowerCase();

      return (
        nombreCompleto.includes(texto) ||
        alumno.numeroControl
          .includes(busqueda)
      );
    });

  return (

    <View style={styles.container}>

      <Text style={styles.titulo}>
        Gestión de Alumnos
      </Text>

      <View style={styles.searchContainer}>

        <Ionicons
          name="search"
          size={22}
          color="#777"
        />

        <TextInput
          placeholder="Buscar por nombre o número de control"
          value={busqueda}
          onChangeText={setBusqueda}
          style={styles.searchInput}
        />

      </View>

      <FlatList
        data={alumnosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (

          <View style={styles.card}>

            <Text style={styles.nombre}>
              {item.nombre}
              {" "}
              {item.apellidoPaterno}
              {" "}
              {item.apellidoMaterno}
            </Text>

            <Text style={styles.info}>
              {item.numeroControl}
            </Text>

            <Text style={styles.info}>
              {item.carrera}
            </Text>

            <Text style={styles.info}>
              Semestre {item.semestre}
            </Text>

            <Text style={styles.estatus}>
              {item.estatus}
            </Text>

            <View style={styles.botones}>

          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname:
                  "/admin/alumnos/detalle",
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
        "/admin/alumnos/editar",
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
      item.nombre,
      item.apellidoPaterno,
      item.apellidoMaterno
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
            "/admin/alumnos/crear"
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
    backgroundColor: "#F5F5F5",
    padding: 15
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 15
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 15
  },

  searchInput: {
    flex: 1,
    padding: 12
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
    color: "#555",
    marginTop: 3
  },

  estatus: {
    color: "#4CAF50",
    fontWeight: "bold",
    marginTop: 5
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

const handleEliminar = (
  id: string,
  nombre: string,
  apellidoPaterno: string,
  apellidoMaterno: string
) => {

  Alert.alert(

    "Eliminar Alumno",

    `¿Desea eliminar a ${nombre}?`,

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

            await eliminarAlumno(id);

          } catch (error) {

            Alert.alert(
              "Error",
              "No se pudo eliminar"
            );

          }

        }

      }

    ]

  );

};