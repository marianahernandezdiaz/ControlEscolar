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
import { crearMateria } from "../../../services/materiaService";

export default function CrearMateria() {
  const [clave, setClave] = useState("");
  const [nombre, setNombre] = useState("");
  const [carrerasSeleccionadas, setCarrerasSeleccionadas] = useState<string[]>([]);
  const [semestre, setSemestre] = useState(1);
  const [creditos, setCreditos] = useState("");
  const [estatus, setEstatus] = useState("Activa");

  const carreras = [
    "Ingeniería Mecatrónica",
    "Ingeniería en Sistemas Computacionales"
  ];

  const guardarMateria = async () => {
    if (!clave.trim()) {
      Alert.alert("Error", "Ingrese la clave de la materia.");
      return;
    }
    if (!nombre.trim()) {
      Alert.alert("Error", "Ingrese el nombre de la materia.");
      return;
    }
    if (carrerasSeleccionadas.length === 0) {
      Alert.alert("Error", "Seleccione al menos una carrera.");
      return;
    }
    if (Number(creditos) <= 0) {
      Alert.alert("Error", "Ingrese los créditos.");
      return;
    }

    try {
      await crearMateria({
        clave,
        nombre,
        carreras: carrerasSeleccionadas,
        semestre,
        creditos: Number(creditos),
        estatus,
        fechaRegistro: new Date()
      });

      Alert.alert("Éxito", "Materia registrada");

      setClave("");
      setNombre("");
      setCarrerasSeleccionadas([]);
      setSemestre(1);
      setCreditos("");
    } catch (error) {
      Alert.alert("Error", "No fue posible guardar");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Nueva Materia</Text>

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

      <Text style={styles.sectionTitle}>Carreras</Text>
      <View style={styles.carrerasContainer}>
        {carreras.map((carrera) => {
          const seleccionado = carrerasSeleccionadas.includes(carrera);
          return (
            <Text
              key={carrera}
              onPress={() => {
                if (seleccionado) {
                  setCarrerasSeleccionadas(carrerasSeleccionadas.filter(c => c !== carrera));
                } else {
                  setCarrerasSeleccionadas([...carrerasSeleccionadas, carrera]);
                }
              }}
              style={[
                styles.carreraCard,
                seleccionado && styles.carreraSeleccionada
              ]}
            >
              {carrera}
            </Text>
          );
        })}
      </View>

      <Text style={styles.label}>Semestre</Text>
      <View style={styles.picker}>
        <Picker selectedValue={semestre} onValueChange={setSemestre}>
          {[1,2,3,4,5,6,7,8,9].map((sem) => (
            <Picker.Item key={sem} label={`Semestre ${sem}`} value={sem} />
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

      <Text style={styles.label}>Estatus</Text>
      <View style={styles.picker}>
        <Picker selectedValue={estatus} onValueChange={setEstatus}>
          <Picker.Item label="Activa" value="Activa" />
          <Picker.Item label="Inactiva" value="Inactiva" />
        </Picker>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Guardar Materia" onPress={guardarMateria} color="#2563EB" />
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
    fontSize: 28,
    fontWeight: "bold",
    color: "#0F172A",
    textAlign: "center",
    marginBottom: 25
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    color: "#1E293B"
  },
  input: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    backgroundColor: "#FFFFFF",
    fontSize: 15,
    elevation: 1
  },
  picker: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    marginBottom: 14,
    backgroundColor: "#FFFFFF",
    elevation: 1
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
    color: "#334155",
    textAlign: "center"
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
