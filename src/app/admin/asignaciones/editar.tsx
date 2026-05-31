import { useEffect, useState } from "react";

import {
    Alert,
    Button,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

import { Picker } from "@react-native-picker/picker";

import {
    router,
    useLocalSearchParams
} from "expo-router";

import {
    actualizarAsignacion,
    obtenerAsignaciones,
    obtenerAsignacionPorId
} from "../../../services/asignacionService";

import {
    obtenerDocentes
} from "../../../services/docenteService";

import {
    obtenerMaterias
} from "../../../services/materiaService";

export default function EditarAsignacion() {

  const { id } =
    useLocalSearchParams();

  const [docentes, setDocentes] =
    useState<any[]>([]);

  const [materias, setMaterias] =
    useState<any[]>([]);

  const [asignaciones,
    setAsignaciones] =
    useState<any[]>([]);

  const [docenteId,
    setDocenteId] =
    useState("");

  const [materiaId,
    setMateriaId] =
    useState("");

  const [grupo,
    setGrupo] =
    useState("");

  const [periodo,
    setPeriodo] =
    useState("");

  const [horarios,
    setHorarios] =
    useState<any[]>([]);

  const [dia,
    setDia] =
    useState("Lunes");

  const [horaInicio,
    setHoraInicio] =
    useState("07:00");

  const [horaFin,
    setHoraFin] =
    useState("08:00");

  const dias = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes"
  ];

  const horas = [
    "07:00","08:00","09:00",
    "10:00","11:00","12:00",
    "13:00","14:00","15:00",
    "16:00","17:00","18:00",
    "19:00","20:00"
  ];

  useEffect(() => {

    cargarAsignacion();

    const unsubscribeDocentes =
      obtenerDocentes(setDocentes);

    const unsubscribeMaterias =
      obtenerMaterias(setMaterias);

    const unsubscribeAsignaciones =
      obtenerAsignaciones(
        setAsignaciones
      );

    return () => {

      unsubscribeDocentes();
      unsubscribeMaterias();
      unsubscribeAsignaciones();

    };

  }, []);

  const cargarAsignacion =
    async () => {

      const asignacion =
        await obtenerAsignacionPorId(
          id as string
        );

      if (!asignacion) return;

      setDocenteId(
        asignacion.docenteId
      );

      setMateriaId(
        asignacion.materiaId
      );

      setGrupo(
        asignacion.grupo
      );

      setPeriodo(
        asignacion.periodo
      );

      setHorarios(
        asignacion.horarios || []
      );

    };

  const agregarHorario = () => {

    if (horaInicio >= horaFin) {

      Alert.alert(
        "Horario inválido",
        "La hora inicial debe ser menor."
      );

      return;

    }

    const repetido =
      horarios.some(

        h =>

          h.dia === dia

          &&

          h.horaInicio === horaInicio

          &&

          h.horaFin === horaFin

      );

    if (repetido) {

      Alert.alert(
        "Horario duplicado"
      );

      return;

    }

    setHorarios([
      ...horarios,
      {
        dia,
        horaInicio,
        horaFin
      }
    ]);

  };

  const eliminarHorario =
    (index: number) => {

      setHorarios(

        horarios.filter(
          (_, i) => i !== index
        )

      );

    };

  const guardarCambios =
    async () => {

      try {

        const docente =
          docentes.find(
            d => d.id === docenteId
          );

        const materia =
          materias.find(
            m => m.id === materiaId
          );

        if (!docente || !materia) {

          Alert.alert(
            "Error",
            "Datos inválidos"
          );

          return;

        }

        const carreraCompatible =

          docente.carreras.some(
            (c: string) =>

              materia.carreras.includes(
                c
              )
          );

        if (!carreraCompatible) {

          Alert.alert(
            "Carrera incompatible"
          );

          return;

        }

        const otrasAsignaciones =

          asignaciones.filter(
            a =>
              a.id !== id
          );

        const asignacionesDocente =

          otrasAsignaciones.filter(
            a =>
              a.docenteId === docenteId
          );

        for (const nuevoHorario of horarios) {

          for (const asignacion of asignacionesDocente) {

            for (const existente of asignacion.horarios) {

              const mismoDia =

                existente.dia ===
                nuevoHorario.dia;

              const traslape =

                nuevoHorario.horaInicio <
                existente.horaFin

                &&

                nuevoHorario.horaFin >
                existente.horaInicio;

              if (
                mismoDia &&
                traslape
              ) {

                Alert.alert(
                  "Conflicto de horario"
                );

                return;

              }

            }

          }

        }

        await actualizarAsignacion(

          id as string,

          {

            docenteId:
              docente.id,

            docenteNombre:
              docente.nombre +
              " " +
              docente.apellidoPaterno,

            materiaId:
              materia.id,

            materiaNombre:
              materia.nombre,

            grupo,

            periodo,

            horarios

          }

        );

        Alert.alert(
          "Éxito",
          "Asignación actualizada"
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
        Editar Asignación
      </Text>

      <View style={styles.picker}>
        <Picker
          selectedValue={docenteId}
          onValueChange={
            setDocenteId
          }
        >
          {docentes.map(docente => (
            <Picker.Item
              key={docente.id}
              label={`${docente.nombre} ${docente.apellidoPaterno}`}
              value={docente.id}
            />
          ))}
        </Picker>
      </View>

      <View style={styles.picker}>
        <Picker
          selectedValue={materiaId}
          onValueChange={
            setMateriaId
          }
        >
          {materias.map(materia => (
            <Picker.Item
              key={materia.id}
              label={materia.nombre}
              value={materia.id}
            />
          ))}
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        value={grupo}
        onChangeText={setGrupo}
        placeholder="Grupo"
      />

      <TextInput
        style={styles.input}
        value={periodo}
        onChangeText={setPeriodo}
        placeholder="Periodo"
      />

      <Text style={styles.subtitulo}>
        Horarios
      </Text>

      {horarios.map(
        (h, index) => (

          <View
            key={index}
            style={styles.card}
          >

            <Text>
              {h.dia} | {h.horaInicio}
              {" - "}
              {h.horaFin}
            </Text>

            <TouchableOpacity
              onPress={() =>
                eliminarHorario(index)
              }
            >
              <Text
                style={{
                  color: "red"
                }}
              >
                Eliminar
              </Text>
            </TouchableOpacity>

          </View>

        )
      )}

      <View style={styles.picker}>
        <Picker
          selectedValue={dia}
          onValueChange={setDia}
        >
          {dias.map(d => (
            <Picker.Item
              key={d}
              label={d}
              value={d}
            />
          ))}
        </Picker>
      </View>

      <View style={styles.picker}>
        <Picker
          selectedValue={horaInicio}
          onValueChange={
            setHoraInicio
          }
        >
          {horas.map(h => (
            <Picker.Item
              key={h}
              label={h}
              value={h}
            />
          ))}
        </Picker>
      </View>

      <View style={styles.picker}>
        <Picker
          selectedValue={horaFin}
          onValueChange={
            setHoraFin
          }
        >
          {horas.map(h => (
            <Picker.Item
              key={h}
              label={h}
              value={h}
            />
          ))}
        </Picker>
      </View>

      <Button
        title="Agregar Horario"
        onPress={agregarHorario}
      />

      <View
        style={{
          marginTop: 20
        }}
      >
        <Button
          title="Guardar Cambios"
          onPress={
            guardarCambios
          }
        />
      </View>

    </ScrollView>

  );

}

const styles = StyleSheet.create({

  container: {
    padding: 20
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center"
  },

  subtitulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 15
  },

  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 12
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12
  },

  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between"
  }

});