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


import {
  router,
  useLocalSearchParams
} from "expo-router";

import {
  actualizarDocente,
  obtenerDocentePorId
} from "../../../services/docenteService";

import * as ImagePicker from "expo-image-picker";

import {
  Image,
  TouchableOpacity
} from "react-native";

import {
  Picker
} from "@react-native-picker/picker";

import {
  subirImagenCloudinary
} from "../../../services/cloudinaryService";

export default function EditarDocente() {

  const { id } =
    useLocalSearchParams();

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

  const [foto,
    setFoto] =
    useState("");

  const [subiendo,
    setSubiendo] =
    useState(false);

  const [
    carrerasSeleccionadas,
    setCarrerasSeleccionadas
  ] = useState<string[]>([]);

  const carreras = [
    "Ingeniería Mecatrónica",
    "Ingeniería en Sistemas Computacionales"
  ];

  const especialidades = [

  "Bases de Datos",

  "Desarrollo Web",

  "Desarrollo Móvil",

  "Inteligencia Artificial",

  "Redes y Telecomunicaciones",

  "Ciberseguridad",

  "Ingeniería de Software",

  "Arquitectura de Computadoras",

  "Robótica",

  "Automatización Industrial",

  "Electrónica",

  "Sistemas Embebidos",

  "Internet de las Cosas (IoT)"

];

  useEffect(() => {

    cargarDocente();

  }, []);

  const cargarDocente =
    async () => {

      const docente =
        await obtenerDocentePorId(
          id as string
        );

      if (!docente) return;

      setNumeroEmpleado(
        docente.numeroEmpleado || ""
      );

      setFoto(
        docente.foto || ""
      );

      setNombre(
        docente.nombre || ""
      );

      setApellidoPaterno(
        docente.apellidoPaterno || ""
      );

      setApellidoMaterno(
        docente.apellidoMaterno || ""
      );

      setCorreo(
        docente.correo || ""
      );

      setTelefono(
        docente.telefono || ""
      );

      setEspecialidad(
        docente.especialidad || ""
      );

      setCarrerasSeleccionadas(
        docente.carreras || []
      );

      setEstatus(
        docente.estatus || "Activo"
      );

    };

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
        "Foto actualizada"
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

  const guardarCambios =
    async () => {

      if (!numeroEmpleado.trim()) {

  Alert.alert(
    "Error",
    "Ingrese el número de empleado."
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

if (!especialidad) {

  Alert.alert(
    "Error",
    "Seleccione una especialidad."
  );

  return;

}

if (
  carrerasSeleccionadas.length === 0
) {

  Alert.alert(
    "Error",
    "Seleccione al menos una carrera."
  );

  return;

}

      try {

        await actualizarDocente(
          id as string,
          {

            numeroEmpleado,

            nombre,

            apellidoPaterno,

            apellidoMaterno,

            correo,

            telefono,

            especialidad,

            carreras:
              carrerasSeleccionadas,

            foto,

            estatus

          }
        );

        Alert.alert(
          "Éxito",
          "Docente actualizado"
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
        Actualizar Docente
      </Text>

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

<Text style={styles.sectionTitle}>
  Especialidad
</Text>

<View style={styles.pickerContainer}>

  <Picker
    selectedValue={especialidad}
    onValueChange={setEspecialidad}
  >

    <Picker.Item
      label="Seleccione una especialidad"
      value=""
    />

    {especialidades.map(
      (esp) => (

        <Picker.Item
          key={esp}
          label={esp}
          value={esp}
        />

      )
    )}

  </Picker>

</View>

      <Text style={styles.sectionTitle}>
  Carreras
</Text>

<View style={styles.carrerasContainer}>

  {carreras.map((carrera) => {

    const seleccionado =

      carrerasSeleccionadas.includes(
        carrera
      );

    return (

      <TouchableOpacity

        key={carrera}

        style={[

          styles.carreraCard,

          seleccionado &&
          styles.carreraSeleccionada

        ]}

        onPress={() => {

          if (seleccionado) {

            setCarrerasSeleccionadas(

              carrerasSeleccionadas.filter(
                c => c !== carrera
              )

            );

          } else {

            setCarrerasSeleccionadas([
              ...carrerasSeleccionadas,
              carrera
            ]);

          }

        }}

      >

        <Text
          style={[
            styles.carreraText,
            seleccionado &&
            styles.carreraTextSeleccionado
          ]}
        >

          {carrera}

        </Text>

      </TouchableOpacity>

    );

  })}

</View>

      <Button
        title="Guardar Docente"
        onPress={
          guardarCambios
        }
      />

    </ScrollView>

  );

}

const styles = StyleSheet.create({

 container: {

  padding: 20,

  backgroundColor: "#F8FAFC",

  flexGrow: 1

},

titulo: {

  fontSize: 32,

  fontWeight: "bold",

  color: "#0F172A",

  textAlign: "center",

  marginBottom: 25

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

},

sectionTitle: {

  fontSize: 18,

  fontWeight: "700",

  color: "#1E293B",

  marginBottom: 10,

  marginTop: 15

},

pickerContainer: {

  borderWidth: 1,

  borderColor: "#CBD5E1",

  borderRadius: 12,

  backgroundColor: "#FFFFFF",

  marginBottom: 15

},

carrerasContainer: {

  gap: 10,

  marginBottom: 20

},

carreraCard: {

  padding: 15,

  borderRadius: 12,

  borderWidth: 1,

  borderColor: "#CBD5E1",

  backgroundColor: "#FFFFFF"

},

carreraSeleccionada: {

  backgroundColor: "#DBEAFE",

  borderColor: "#2563EB"

},

carreraText: {

  fontSize: 15,

  color: "#334155"

},

carreraTextSeleccionado: {

  color: "#2563EB",

  fontWeight: "bold"

},

});