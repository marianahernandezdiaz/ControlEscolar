import { useState } from "react";
import {
    Alert,
    Button,
    TextInput,
    View
} from "react-native";

import { registerUser } from "../../services/authService";

export default function Register() {

  const [nombre, setNombre] =
    useState("");

  const [correo, setCorreo] =
    useState("");

  const [password, setPassword] =
    useState("");

  const registrar = async () => {

    try {

      await registerUser(
        nombre,
        correo,
        password,
        "alumno"
      );

      Alert.alert(
        "Éxito",
        "Usuario registrado"
      );

    } catch (error: any) {

      Alert.alert(
        "Error",
        error.message
      );
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 20,
        gap: 10
      }}
    >

      <TextInput
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        placeholder="Correo"
        value={correo}
        onChangeText={setCorreo}
      />

      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button
        title="Registrarse"
        onPress={registrar}
      />

    </View>
  );
}