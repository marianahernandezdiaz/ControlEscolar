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
    "Ingeniería Mecatrónica",
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

      if (!clave.trim()) {

  Alert.alert(
    "Error",
    "Ingrese la clave."
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

if (
  carrerasSeleccionadas.length === 0
) {

  Alert.alert(
    "Error",
    "Seleccione al menos una carrera."
  );

  return;

}

if (
  Number(creditos) <= 0
) {

  Alert.alert(
    "Error",
    "Ingrese los créditos."
  );

  return;

}

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

      <Text

        key={carrera}

        onPress={() => {

          if (
            seleccionado
          ) {

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

        style={[

          styles.carreraCard,

          seleccionado &&
          styles.carreraSeleccionada

        ]}

      >

        {carrera}

      </Text>

    );

  })}

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

          {[1,2,3,4,5,6,7,8,9]
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

<View style={styles.buttonContainer}>

  <Button
    title="Guardar Cambios"
    onPress={guardarCambios}
    color="#2563EB"
  />

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

  color: "#0F172A",

  textAlign: "center",

  marginBottom: 25

},

  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10
  },

  input: {

  borderWidth: 1,

  borderColor: "#CBD5E1",

  borderRadius: 12,

  padding: 14,

  marginBottom: 14,

  backgroundColor: "#FFFFFF",

  fontSize: 15

},
picker: {

  borderWidth: 1,

  borderColor: "#CBD5E1",

  borderRadius: 12,

  marginBottom: 14,

  backgroundColor: "#FFFFFF"

},

  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },

  checkboxText: {
    marginLeft: 10
  },
  sectionTitle: {

  fontSize: 18,

  fontWeight: "700",

  color: "#1E293B",

  marginBottom: 10,

  marginTop: 10

},

carrerasContainer: {

  gap: 10,

  marginBottom: 20

},

carreraCard: {

  backgroundColor: "#FFFFFF",

  borderWidth: 1,

  borderColor: "#CBD5E1",

  borderRadius: 12,

  padding: 15,

  color: "#334155"

},

carreraSeleccionada: {

  backgroundColor: "#DBEAFE",

  borderColor: "#2563EB",

  color: "#2563EB",

  fontWeight: "bold"

},

buttonContainer: {

  marginTop: 20,

  borderRadius: 12,

  overflow: "hidden"

}

});