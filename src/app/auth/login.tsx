import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Button,
  Pressable,
  Text,
  TextInput,
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
        router.replace("/alumnos/dashboard_alumno");
        return;
      }

      if (usuario?.rol === "docente") {
        router.replace("/docentes/dashboard_docente");
        return;
      }

      Alert.alert("Error", "Rol no encontrado");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <TextInput
        placeholder="Correo"
        value={correo}
        onChangeText={setCorreo}
        style={{ marginBottom: 10, borderWidth: 1, padding: 8 }}
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ marginBottom: 10, borderWidth: 1, padding: 8 }}
      />
      <Button title="Iniciar sesión" onPress={handleLogin} />
      <Pressable
        onPress={() => router.push("/auth/register")}
        style={{
          marginTop: 20,
          alignItems: "center"
        }}
      >
        <Text
          style={{
            color: "blue",
            fontSize: 16
          }}
        >
          ¿No tienes cuenta? Regístrate aquí
        </Text>
      </Pressable>
    </View>
  );
}
