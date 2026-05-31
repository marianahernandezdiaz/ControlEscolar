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

import {
    router,
    useLocalSearchParams
} from "expo-router";

import {
    actualizarAlumno,
    obtenerAlumnoPorId
} from "../../../services/alumnoService";

export default function EditarAlumno() {

  const { id } = useLocalSearchParams();

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

  const [estatus, setEstatus] = useState("Activo");

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

  useEffect(() => {
    cargarAlumno();
  }, []);

  const cargarAlumno = async () => {

    try {

      const alumno =
        await obtenerAlumnoPorId(
          id as string
        );

      if (!alumno) return;

      setNombre(alumno.nombre || "");
      setApellidoPaterno(alumno.apellidoPaterno || "");
      setApellidoMaterno(alumno.apellidoMaterno || "");

      setNumeroControl(alumno.numeroControl || "");

      setEdad(
        alumno.edad
          ? alumno.edad.toString()
          : ""
      );

      setGenero(alumno.genero || "");

      setTelefono(alumno.telefono || "");

      setCorreo(alumno.correo || "");

      setDireccion(alumno.direccion || "");

      setCarrera(alumno.carrera || "");

      setSemestre(
        alumno.semestre || 1
      );

      setEstatus(
        alumno.estatus || "Activo"
      );

    } catch (error) {

      console.log(error);

      Alert.alert(
        "Error",
        "No se pudo cargar el alumno"
      );

    }

  };

  const guardarCambios = async () => {

    try {

      await actualizarAlumno(
        id as string,
        {
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

          estatus
        }
      );

      Alert.alert(
        "Éxito",
        "Alumno actualizado"
      );

      router.back();

    } catch (error) {

      console.log(error);

      Alert.alert(
        "Error",
        "No se pudo actualizar"
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
        Editar Alumno
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
        placeholder="Número de Control"
        value={numeroControl}
        onChangeText={
          setNumeroControl
        }
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

      <View style={styles.picker}>
        <Picker
          selectedValue={genero}
          onValueChange={
            setGenero
          }
        >
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

      <View style={styles.picker}>
        <Picker
          selectedValue={carrera}
          onValueChange={
            setCarrera
          }
        >
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
          {estatusAlumno.map(
            (item) => (
              <Picker.Item
                key={item}
                label={item}
                value={item}
              />
            )
          )}
        </Picker>
      </View>

      <Button
        title="Guardar Cambios"
        onPress={guardarCambios}
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

  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: "#fff"
  }

});