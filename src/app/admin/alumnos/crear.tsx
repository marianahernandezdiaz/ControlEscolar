import { Picker } from "@react-native-picker/picker";
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
import { crearAlumno } from "../../../services/alumnoService";

import * as ImagePicker from "expo-image-picker";

import {
  Image,
  TouchableOpacity
} from "react-native";

import {
  subirImagenCloudinary
} from "../../../services/cloudinaryService";

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
  const [estatus, setEstatus] = useState("Activo");

  const carreras = [
    "Ingeniería Mecatrónica",
    "Ingeniería en Sistemas Computacionales"
  ];
  const generos = ["Masculino", "Femenino", "Otro"];
  const estatusAlumno = ["Activo", "Baja Temporal", "Egresado"];

  const [foto,
  setFoto] =
  useState("");

  const [subiendo,
    setSubiendo] =
    useState(false);

  
    const tomarFoto = async () => {

  const permiso =

    await ImagePicker
      .requestCameraPermissionsAsync();

  if (!permiso.granted) {

    Alert.alert(
      "Permiso requerido",
      "Se necesita acceso a la cámara."
    );

    return;

  }

  const resultado =

    await ImagePicker.launchCameraAsync({

      allowsEditing: true,

      aspect: [1, 1],

      quality: 0.7,

      base64: true

    });

  if (!resultado.canceled) {

    try {

      setSubiendo(true);

      const url =

        await subirImagenCloudinary(

          resultado.assets[0].base64!

        );

      setFoto(url);

      Alert.alert(
        "Éxito",
        "Foto cargada correctamente"
      );

    } catch {

      Alert.alert(
        "Error",
        "No fue posible subir la imagen"
      );

    } finally {

      setSubiendo(false);

    }

  }

};

  const guardarAlumno = async () => {
    try {
      if (!numeroControl.trim()) {

  Alert.alert(
    "Error",
    "Ingrese el número de control."
  );

  return;

}

if (!nombre.trim()) {

  Alert.alert(
    "Error",
    "Ingrese el nombre."
  );

  return;

}

if (!apellidoPaterno.trim()) {

  Alert.alert(
    "Error",
    "Ingrese el apellido paterno."
  );

  return;

}

if (!correo.trim()) {

  Alert.alert(
    "Error",
    "Ingrese el correo."
  );

  return;

}

if (!carrera) {

  Alert.alert(
    "Error",
    "Seleccione una carrera."
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
        foto,
        fechaRegistro: new Date()
      });

      Alert.alert("Éxito", "Alumno registrado correctamente");

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
      setSemestre(1)
      setFoto("");;
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "No fue posible registrar el alumno");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Nuevo Alumno</Text>

      <TouchableOpacity
  style={styles.avatarContainer}
  onPress={tomarFoto}
>

  {foto ? (

    <Image
      source={{
        uri: foto
      }}
      style={styles.avatar}
    />

  ) : (

    <Text
      style={styles.avatarText}
    >
      📸
    </Text>

  )}

</TouchableOpacity>

<Text
  style={{
    textAlign: "center",
    marginBottom: 20
  }}
>

  {subiendo
    ? "Subiendo imagen..."
    : "Tocar para tomar foto"}

</Text>

      <TextInput placeholder="Nombre(s)" value={nombre} onChangeText={setNombre} style={styles.input} />
      <TextInput placeholder="Apellido Paterno" value={apellidoPaterno} onChangeText={setApellidoPaterno} style={styles.input} />
      <TextInput placeholder="Apellido Materno" value={apellidoMaterno} onChangeText={setApellidoMaterno} style={styles.input} />
      <TextInput placeholder="Número de Control" value={numeroControl} onChangeText={setNumeroControl} style={styles.input} />
      <TextInput placeholder="Edad" value={edad} onChangeText={setEdad} keyboardType="numeric" style={styles.input} />

      <Text style={styles.label}>Género</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={genero} onValueChange={setGenero}>
          <Picker.Item label="Seleccione género" value="" />
          {generos.map((item) => <Picker.Item key={item} label={item} value={item} />)}
        </Picker>
      </View>

      <TextInput placeholder="Teléfono" value={telefono} onChangeText={setTelefono} keyboardType="phone-pad" style={styles.input} />
      <TextInput placeholder="Correo" value={correo} onChangeText={setCorreo} keyboardType="email-address" style={styles.input} />
      <TextInput placeholder="Dirección" value={direccion} onChangeText={setDireccion} style={styles.input} />

      <Text style={styles.label}>Carrera</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={carrera} onValueChange={setCarrera}>
          <Picker.Item label="Seleccione una carrera" value="" />
          {carreras.map((item) => <Picker.Item key={item} label={item} value={item} />)}
        </Picker>
      </View>

      <Text style={styles.label}>Semestre</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={semestre} onValueChange={setSemestre}>
          {[...Array(9)].map((_, i) => (
            <Picker.Item key={i+1} label={`Semestre ${i+1}`} value={i+1} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Estatus</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={estatus} onValueChange={setEstatus}>
          {estatusAlumno.map((item) => <Picker.Item key={item} label={item} value={item} />)}
        </Picker>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Guardar Alumno" onPress={guardarAlumno} color="#1976D2" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {

  padding: 20,

  paddingBottom: 50,

  backgroundColor: "#F8FAFC"

},
 titulo: {

  fontSize: 32,

  fontWeight: "bold",

  textAlign: "center",

  color: "#0F172A",

  marginBottom: 25

},
  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 6,
    color: "#333"
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    backgroundColor: "#fff",
    fontSize: 15,
    elevation: 1
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    marginBottom: 14,
    backgroundColor: "#fff",
    elevation: 1
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 12,
    overflow: "hidden"
  },

  avatarContainer: {

  width: 140,

  height: 140,

  borderRadius: 70,

  backgroundColor: "#E2E8F0",

  alignSelf: "center",

  justifyContent: "center",

  alignItems: "center",

  marginBottom: 10,

  overflow: "hidden"

},

avatar: {

  width: "100%",

  height: "100%"

},

avatarText: {

  fontSize: 50

}
});
