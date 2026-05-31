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

import { Picker } from "@react-native-picker/picker";

import { crearMateria } from "../../../services/materiaService";

import Checkbox from "expo-checkbox";

export default function CrearMateria() {

  const [clave, setClave] =
    useState("");

  const [nombre, setNombre] =
    useState("");

  const [carrerasSeleccionadas,
    setCarrerasSeleccionadas] =
    useState<string[]>([]);

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


  const guardarMateria =
    async () => {

      try {

        await crearMateria({

          clave,

          nombre,

          carreras:carrerasSeleccionadas,

          semestre,

          creditos:
            Number(creditos),

          estatus,

          fechaRegistro:
            new Date()

        });

        Alert.alert(
          "Éxito",
          "Materia registrada"
        );

        setClave("");
        setNombre("");
        setCarrerasSeleccionadas([]);
        setSemestre(1);
        setCreditos("");

      } catch (error) {

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
        Nueva Materia
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
        Carrera
      </Text>

<Text style={styles.label}>
  Carreras
</Text>

{carreras.map((carrera) => (

  <View
    key={carrera}
    style={{
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8
    }}
  >

    <Checkbox

      value={
        carrerasSeleccionadas.includes(
          carrera
        )
      }

      onValueChange={(checked) => {

        if (checked) {

          setCarrerasSeleccionadas([
            ...carrerasSeleccionadas,
            carrera
          ]);

        } else {

          setCarrerasSeleccionadas(

            carrerasSeleccionadas.filter(
              item => item !== carrera
            )

          );

        }

      }}

    />

    <Text
      style={{
        marginLeft: 10
      }}
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
        title="Guardar Materia"
        onPress={
          guardarMateria
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
    fontWeight: "600",
    marginBottom: 5
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
  }

});