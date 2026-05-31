import { useState } from "react";

import {
    Alert,
    Button,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";

import Checkbox from "expo-checkbox";

import {
    crearDocente
} from "../../../services/docenteService";

export default function CrearDocente() {

  const [numeroEmpleado,
    setNumeroEmpleado] =
    useState("");

  const [nombre,
    setNombre] =
    useState("");

  const [apellidoPaterno,
    setApellidoPaterno] =
    useState("");

  const [apellidoMaterno,
    setApellidoMaterno] =
    useState("");

  const [correo,
    setCorreo] =
    useState("");

  const [telefono,
    setTelefono] =
    useState("");

  const [especialidad,
    setEspecialidad] =
    useState("");

  const [estatus,
    setEstatus] =
    useState("Activo");

  const [
    carrerasSeleccionadas,
    setCarrerasSeleccionadas
  ] = useState<string[]>([]);

  const carreras = [
    "Ingeniería Industrial",
    "Ingeniería en Logística",
    "Ingeniería Mecatrónica",
    "Ingeniería Química",
    "Ingeniería en Sistemas Computacionales"
  ];

  const guardarDocente =
    async () => {

      try {

        await crearDocente({

          numeroEmpleado,

          nombre,

          apellidoPaterno,

          apellidoMaterno,

          correo,

          telefono,

          especialidad,

          carreras:
            carrerasSeleccionadas,

          estatus,

          fechaRegistro:
            new Date()

        });

        Alert.alert(
          "Éxito",
          "Docente registrado"
        );

      } catch {

        Alert.alert(
          "Error",
          "No fue posible guardar"
        );

      }

    };

  return (

    <ScrollView
      contentContainerStyle={
        styles.container
      }
    >

      <Text style={styles.titulo}>
        Nuevo Docente
      </Text>

      <TextInput
        placeholder="Número de Empleado"
        value={numeroEmpleado}
        onChangeText={
          setNumeroEmpleado
        }
        style={styles.input}
      />

      <TextInput
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
      />

      <TextInput
        placeholder="Apellido Paterno"
        value={apellidoPaterno}
        onChangeText={
          setApellidoPaterno
        }
        style={styles.input}
      />

      <TextInput
        placeholder="Apellido Materno"
        value={apellidoMaterno}
        onChangeText={
          setApellidoMaterno
        }
        style={styles.input}
      />

      <TextInput
        placeholder="Correo"
        value={correo}
        onChangeText={setCorreo}
        style={styles.input}
      />

      <TextInput
        placeholder="Teléfono"
        value={telefono}
        onChangeText={setTelefono}
        style={styles.input}
      />

      <TextInput
        placeholder="Especialidad"
        value={especialidad}
        onChangeText={
          setEspecialidad
        }
        style={styles.input}
      />

      <Text style={styles.label}>
        Carreras
      </Text>

      {carreras.map(
        (carrera) => (

          <View
            key={carrera}
            style={styles.checkbox}
          >

            <Checkbox

              value={
                carrerasSeleccionadas.includes(
                  carrera
                )
              }

              onValueChange={
                (checked) => {

                  if (checked) {

                    setCarrerasSeleccionadas(
                      prev => [
                        ...prev,
                        carrera
                      ]
                    );

                  } else {

                    setCarrerasSeleccionadas(
                      prev =>
                        prev.filter(
                          item =>
                            item !== carrera
                        )
                    );

                  }

                }
              }

            />

            <Text>
              {carrera}
            </Text>

          </View>

        )
      )}

      <Button
        title="Guardar Docente"
        onPress={
          guardarDocente
        }
      />

    </ScrollView>

  );

}

const styles = StyleSheet.create({

  container: {
    padding: 20
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center"
  },

  label: {
    fontWeight: "bold",
    marginBottom: 10
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12
  },

  checkbox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10
  }

});