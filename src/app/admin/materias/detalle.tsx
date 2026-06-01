import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { obtenerMateriaPorId } from "../../../services/materiaService";

export default function DetalleMateria() {
  const { id } = useLocalSearchParams();
  const [materia, setMateria] = useState<any>(null);

  useEffect(() => {
    cargarMateria();
  }, []);

  const cargarMateria = async () => {
    const datos = await obtenerMateriaPorId(id as string);
    setMateria(datos);
  };

  if (!materia) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1565C0" />
        <Text style={styles.cargando}>Cargando información...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Información de la Materia</Text>

      <View style={styles.card}>
        <Text style={styles.nombre}>{materia.nombre}</Text>

        <Item label="Clave" value={materia.clave} />
        <Item label="Semestre" value={materia.semestre} />
        <Item label="Créditos" value={materia.creditos} />
        <Item label="Estatus" value={materia.estatus} />

        <Text style={styles.subtitulo}>Carreras</Text>
        {materia.carreras?.map((carrera: string) => (
          <Text key={carrera} style={styles.carrera}>
            • {carrera}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}

function Item({ label, value }: { label: string; value: any }) {
  return (
    <View style={styles.item}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.valor}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F9FAFB"
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  cargando: {
    marginTop: 10,
    fontSize: 16,
    color: "#475569"
  },
  titulo: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
    color: "#0F172A"
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 }
  },
  nombre: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1565C0",
    marginBottom: 20,
    textAlign: "center"
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
    color: "#1E293B"
  },
  carrera: {
    fontSize: 16,
    marginBottom: 6,
    color: "#334155"
  },
  item: {
    marginBottom: 14,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0"
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#475569"
  },
  valor: {
    fontSize: 16,
    color: "#0F172A",
    marginTop: 2
  }
});
