import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import { loginUser } from "../../services/authService";

export default function LoginScreen() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const usuario = await loginUser(correo, password);

      if (usuario?.rol === "admin") {
        router.replace("/admin/dashboard_admin");
        return;
      }

      if (usuario?.rol === "alumno") {
        router.replace("/alumno/dashboard_alumno");
        return;
      }

      if (usuario?.rol === "docente") {
        router.replace("/docente/dashboard_docente");
        return;
      }

      Alert.alert("Error", "Rol no encontrado");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Control Escolar</Text>

      <TextInput
        placeholder="Correo institucional"
        value={correo}
        onChangeText={setCorreo}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.boton} onPress={handleLogin}>
        <Text style={styles.botonTexto}>Iniciar sesión</Text>
      </TouchableOpacity>

      <Pressable
        onPress={() => router.push("/auth/register")}
        style={styles.linkContainer}
      >
        <Text style={styles.linkTexto}>
          ¿No tienes cuenta? Regístrate aquí
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
    backgroundColor: "#F1F5F9"
  },
  titulo: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 30,
    color: "#1565C0",
    letterSpacing: 0.5
  },
  input: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
    fontSize: 15,
    elevation: 1
  },
  boton: {
    backgroundColor: "#1565C0",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#1565C0",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 }
  },
  botonTexto: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5
  },
  linkContainer: {
    marginTop: 25,
    alignItems: "center"
  },
  linkTexto: {
    color: "#2563EB",
    fontSize: 15,
    fontWeight: "600"
  }
});
