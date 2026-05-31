import { useEffect, useState } from "react";

import {
    Alert,
    Button,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";

import { Picker } from "@react-native-picker/picker";

import Checkbox from "expo-checkbox";

import {
    router,
    useLocalSearchParams
} from "expo-router";

import {
    actualizarMateria,
    obtenerMateriaPorId
} from "../../../services/materiaService";

export default function EditarMateria() {

  const { id } =
    useLocalSearchParams();

  const [clave, setClave] =
    useState("");

  const [nombre, setNombre] =
    useState("");

  const [
    carrerasSeleccionadas,
    setCarrerasSeleccionadas
  ] = useState<string[]>([]);

  const [semestre, setSemestre] =
    useState(1);

  const [creditos, setCreditos] =
    useState("");

  const [estatus, setEstatus] =
    useState("Activa");

  const carreras = [
    "Ingeniería Industrial",
    "Ingeniería en Logística",
    "Ingeniería Mecatrónica",
    "Ingeniería Química",
    "Ingeniería en Sistemas Computacionales"
  ];

  useEffect(() => {

    cargarMateria();

  }, []);

  const cargarMateria = async () => {

    const materia =
      await obtenerMateriaPorId(
        id as string
      );

    if (!materia) return;

    setClave(
      materia.clave || ""
    );

    setNombre(
      materia.nombre || ""
    );

    setCarrerasSeleccionadas(
      materia.carreras || []
    );

    setSemestre(
      materia.semestre || 1
    );

    setCreditos(
      materia.creditos
        ?.toString() || ""
    );

    setEstatus(
      materia.estatus || "Activa"
    );

  };

  const guardarCambios =
    async () => {

      try {

        await actualizarMateria(
          id as string,
          {
            clave,
            nombre,

            carreras:
              carrerasSeleccionadas,

            semestre,

            creditos:
              Number(creditos),

            estatus
          }
        );

        Alert.alert(
          "Éxito",
          "Materia actualizada"
        );

        router.back();

      } catch {

        Alert.alert(
          "Error",
          "No fue posible actualizar"
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
        Editar Materia
      </Text>

      <TextInput
        placeholder="Clave"
        value={clave}
        onChangeText={setClave}
        style={styles.input}
      />

      <TextInput
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
      />

      <Text style={styles.label}>
        Carreras
      </Text>

      {carreras.map((carrera) => (

        <View
          key={carrera}
          style={styles.checkboxRow}
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

          <Text
            style={styles.checkboxText}
          >
            {carrera}
          </Text>

        </View>

      ))}

      <Text style={styles.label}>
        Semestre
      </Text>

      <View style={styles.picker}>

        <Picker
          selectedValue={semestre}
          onValueChange={
            setSemestre
          }
        >

          {[1,2,3,4,5,6,7,8,9,10]
          .map((sem) => (

            <Picker.Item
              key={sem}
              label={`Semestre ${sem}`}
              value={sem}
            />

          ))}

        </Picker>

      </View>

      <TextInput
        placeholder="Créditos"
        value={creditos}
        onChangeText={setCreditos}
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.label}>
        Estatus
      </Text>

      <View style={styles.picker}>

        <Picker
          selectedValue={estatus}
          onValueChange={
            setEstatus
          }
        >

          <Picker.Item
            label="Activa"
            value="Activa"
          />

          <Picker.Item
            label="Inactiva"
            value="Inactiva"
          />

        </Picker>

      </View>

      <Button
        title="Guardar Cambios"
        onPress={
          guardarCambios
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
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#fff"
  },

  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: "#fff"
  },

  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },

  checkboxText: {
    marginLeft: 10
  }

});