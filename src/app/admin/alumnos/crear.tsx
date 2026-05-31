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

import { crearAlumno } from "../../../services/alumnoService";

export default function CrearAlumno() {

  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");

  const [numeroControl, setNumeroControl] = useState("");

  const [edad, setEdad] = useState("");

  const [genero, setGenero] = useState("");

  const [telefono, setTelefono] = useState("");

  const [correo, setCorreo] = useState("");

  const [direccion, setDireccion] = useState("");

  const [carrera, setCarrera] = useState("");

  const [semestre, setSemestre] = useState(1);

  const [estatus, setEstatus] =useState("Activo");

  const carreras = [
    "Ingeniería Industrial",
    "Ingeniería en Logística",
    "Ingeniería Mecatrónica",
    "Ingeniería Química",
    "Ingeniería en Sistemas Computacionales"
  ];

  const generos = [
    "Masculino",
    "Femenino",
    "Otro"
  ];

  const estatusAlumno = [
  "Activo",
  "Baja Temporal",
  "Egresado"
];

  

  const guardarAlumno = async () => {

    try {

      if (
        !nombre ||
        !apellidoPaterno ||
        !numeroControl ||
        !correo ||
        !carrera
      ) {

        Alert.alert(
          "Campos requeridos",
          "Complete la información obligatoria"
        );

        return;
      }

      await crearAlumno({

        nombre,

        apellidoPaterno,

        apellidoMaterno,

        numeroControl,

        edad: Number(edad),

        genero,

        telefono,

        correo,

        direccion,

        carrera,

        semestre,

        estatus,

        foto: "",

        fechaRegistro: new Date()

      });

      Alert.alert(
        "Éxito",
        "Alumno registrado correctamente"
      );

      setNombre("");
      setApellidoPaterno("");
      setApellidoMaterno("");
      setNumeroControl("");
      setEdad("");
      setGenero("");
      setTelefono("");
      setCorreo("");
      setDireccion("");
      setCarrera("");
      setSemestre(1);

    } catch (error) {

      console.log(error);

      Alert.alert(
        "Error",
        "No fue posible registrar el alumno"
      );
    }
  };

  return (

    <ScrollView
      contentContainerStyle={styles.container}
    >

      <Text style={styles.titulo}>
        Nuevo Alumno
      </Text>

      <TextInput
        placeholder="Nombre(s)"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
      />

      <TextInput
        placeholder="Apellido Paterno"
        value={apellidoPaterno}
        onChangeText={setApellidoPaterno}
        style={styles.input}
      />

      <TextInput
        placeholder="Apellido Materno"
        value={apellidoMaterno}
        onChangeText={setApellidoMaterno}
        style={styles.input}
      />

      <TextInput
        placeholder="Número de Control"
        value={numeroControl}
        onChangeText={setNumeroControl}
        style={styles.input}
      />

      <TextInput
        placeholder="Edad"
        value={edad}
        onChangeText={setEdad}
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.label}>
        Género
      </Text>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={genero}
          onValueChange={(itemValue) =>
            setGenero(itemValue)
          }
        >
          <Picker.Item
            label="Seleccione género"
            value=""
          />

          {generos.map((item) => (
            <Picker.Item
              key={item}
              label={item}
              value={item}
            />
          ))}
        </Picker>
      </View>

      <TextInput
        placeholder="Teléfono"
        value={telefono}
        onChangeText={setTelefono}
        keyboardType="phone-pad"
        style={styles.input}
      />

      <TextInput
        placeholder="Correo"
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
        style={styles.input}
      />

      <TextInput
        placeholder="Dirección"
        value={direccion}
        onChangeText={setDireccion}
        style={styles.input}
      />

      <Text style={styles.label}>
        Carrera
      </Text>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={carrera}
          onValueChange={(itemValue) =>
            setCarrera(itemValue)
          }
        >
          <Picker.Item
            label="Seleccione una carrera"
            value=""
          />

          {carreras.map((item) => (
            <Picker.Item
              key={item}
              label={item}
              value={item}
            />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>
        Semestre
      </Text>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={semestre}
          onValueChange={(itemValue) =>
            setSemestre(itemValue)
          }
        >
          {[1,2,3,4,5,6,7,8,9,10].map((sem) => (
            <Picker.Item
              key={sem}
              label={`Semestre ${sem}`}
              value={sem}
            />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>
        Estatus
      </Text>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={estatus}
          onValueChange={(itemValue) =>
            setEstatus(itemValue)
          }
        >
          {estatusAlumno.map((item) => (
            <Picker.Item
              key={item}
              label={item}
              value={item}
            />
          ))}
        </Picker>
      </View>

      <Button
        title="Guardar Alumno"
        onPress={guardarAlumno}
      />

    </ScrollView>

  );
}

const styles = StyleSheet.create({

  container: {
    padding: 20,
    paddingBottom: 50
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

  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: "#fff"
  }

});