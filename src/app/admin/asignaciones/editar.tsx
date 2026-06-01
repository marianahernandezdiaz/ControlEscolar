import { useEffect, useState } from "react";

import {
  Alert,
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

  const [carrera,
  setCarrera] =
  useState("");

const [cupo,
  setCupo] =
  useState("");

const [estatus,
  setEstatus] =
  useState("Activa");

const cargarAsignacion =
  async () => {

    const asignacion =
      await obtenerAsignacionPorId(
        id as string
      );

    if (!asignacion) return;

    setDocenteId(
      asignacion.docenteId || ""
    );

    setMateriaId(
      asignacion.materiaId || ""
    );

    setGrupo(
      asignacion.grupo || ""
    );


    setHorarios(
      asignacion.horarios || []
    );

    setCarrera(
      asignacion.carrera || ""
    );

    setCupo(
      asignacion.cupo?.toString() || ""
    );

    setEstatus(
      asignacion.estatus || "Activa"
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

      if (!docente) {

        Alert.alert(
          "Error",
          "Seleccione un docente."
        );

        return;

      }

      if (!materia) {

        Alert.alert(
          "Error",
          "Seleccione una materia."
        );

        return;

      }

      if (!grupo.trim()) {

        Alert.alert(
          "Error",
          "Ingrese el grupo."
        );

        return;

      }


      if (!carrera.trim()) {

        Alert.alert(
          "Error",
          "Seleccione una carrera."
        );

        return;

      }

      if (
        Number(cupo) <= 0
      ) {

        Alert.alert(
          "Error",
          "Ingrese un cupo válido."
        );

        return;

      }

      if (
        horarios.length === 0
      ) {

        Alert.alert(
          "Error",
          "Agregue al menos un horario."
        );

        return;

      }

      const carreraCompatible =

        docente.carreras?.some(
          (c: string) =>

            materia.carreras?.includes(
              c
            )
        );

      if (!carreraCompatible) {

        Alert.alert(
          "Carrera incompatible",
          "El docente no pertenece a ninguna carrera asociada a la materia."
        );

        return;

      }

      const otrasAsignaciones =

        asignaciones.filter(
          a => a.id !== id
        );

      const asignacionesDocente =

        otrasAsignaciones.filter(
          a =>
            a.docenteId ===
            docenteId
        );

      for (
        const nuevoHorario
        of horarios
      ) {

        for (
          const asignacion
          of asignacionesDocente
        ) {

          for (
            const existente
            of asignacion.horarios
          ) {

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
                "Conflicto de horario",
                "El docente ya tiene clase en ese horario."
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
            `${docente.nombre}
             ${docente.apellidoPaterno}
             ${docente.apellidoMaterno}`,

          materiaId:
            materia.id,

          materiaNombre:
            materia.nombre,

          carrera,

          semestre:
            materia.semestre,

          grupo,

          cupo:
            Number(cupo),

          horarios,

          estatus

        }

      );

      Alert.alert(
        "Éxito",
        "Asignación actualizada"
      );

      router.back();

    } catch (error) {

      console.log(error);

      Alert.alert(
        "Error",
        "No fue posible actualizar."
      );

    }

  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Editar Asignación</Text>

      <Text style={styles.sectionTitle}>
        Información General
      </Text>
      <Text style={styles.label}>Docente</Text>
      <View style={styles.picker}>
        <Picker selectedValue={docenteId} onValueChange={setDocenteId}>
          <Picker.Item label="Seleccione un docente" value="" />
          {docentes.map(docente => (
            <Picker.Item
              key={docente.id}
              label={`${docente.nombre} ${docente.apellidoPaterno}`}
              value={docente.id}
            />
          ))}
        </Picker>
      </View>

      <TextInput
        placeholder="Cupo"
        value={cupo}
        onChangeText={setCupo}
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.label}>Materia</Text>
      <View style={styles.picker}>
        <Picker
          selectedValue={materiaId}
          onValueChange={(value) => {
            setMateriaId(value);
            const materia = materias.find(m => m.id === value);
            if (materia?.carreras?.length === 1) {
              setCarrera(materia.carreras[0]);
            } else {
              setCarrera("");
            }
          }}
        >
          <Picker.Item label="Seleccione una materia" value="" />
          {materias.map(materia => (
            <Picker.Item key={materia.id} label={materia.nombre} value={materia.id} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Carrera</Text>
      <View style={styles.picker}>
        <Picker selectedValue={carrera} onValueChange={setCarrera}>
          <Picker.Item label="Seleccione una carrera" value="" />
          {materias.find(m => m.id === materiaId)?.carreras?.map((c: string) => (
            <Picker.Item key={c} label={c} value={c} />
          ))}
        </Picker>
      </View>

      <TextInput placeholder="Grupo" value={grupo} onChangeText={setGrupo} style={styles.input} />
  

      <Text style={styles.subtitulo}>Agregar Horario</Text>
      <View style={styles.picker}>
        <Picker selectedValue={dia} onValueChange={setDia}>
          {dias.map(item => <Picker.Item key={item} label={item} value={item} />)}
        </Picker>
      </View>
      <View style={styles.picker}>
        <Picker selectedValue={horaInicio} onValueChange={setHoraInicio}>
          {horas.map(item => <Picker.Item key={item} label={item} value={item} />)}
        </Picker>
      </View>
      <View style={styles.picker}>
        <Picker selectedValue={horaFin} onValueChange={setHoraFin}>
          {horas.map(item => <Picker.Item key={item} label={item} value={item} />)}
        </Picker>
      </View>

      <TouchableOpacity
          style={styles.botonSecundario}
          onPress={agregarHorario}
        >

          <Text
            style={styles.textoBoton}
          >
            Agregar Horario
          </Text>

        </TouchableOpacity>

      <Text style={styles.subtitulo}>Horarios Registrados</Text>
      {horarios.map((horario, index) => (
        <View key={index} style={styles.cardHorario}>
          <Text
            style={{
              fontWeight: "600",
              color: "#0F172A"
            }}
          >

            {horario.dia}
            {" • "}
            {horario.horaInicio}
            {" - "}
            {horario.horaFin}

          </Text>
          <TouchableOpacity onPress={() => eliminarHorario(index)}>
            <Text style={{ color: "red" }}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity
  style={styles.botonPrincipal}
  onPress={guardarCambios}
>

  <Text
    style={styles.textoBoton}
  >
    Guardar Asignación
  </Text>

</TouchableOpacity>
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
  subtitulo: { fontSize: 18, fontWeight: "bold", marginVertical: 15 },
  label: {

  fontSize: 15,

  fontWeight: "600",

  color: "#334155",

  marginBottom: 8

},
  picker: {

  borderWidth: 1,

  borderColor: "#CBD5E1",

  borderRadius: 12,

  backgroundColor: "#FFFFFF",

  marginBottom: 14

},
  input: {

  borderWidth: 1,

  borderColor: "#CBD5E1",

  borderRadius: 12,

  padding: 14,

  backgroundColor: "#FFFFFF",

  marginBottom: 14,

  fontSize: 15

},
cardHorario: {

  backgroundColor: "#FFFFFF",

  borderRadius: 15,

  padding: 15,

  marginBottom: 12,

  flexDirection: "row",

  justifyContent: "space-between",

  alignItems: "center",

  borderWidth: 1,

  borderColor: "#E2E8F0"

},

sectionTitle: {

  fontSize: 20,

  fontWeight: "700",

  color: "#0F172A",

  marginBottom: 15,

  marginTop: 10

},

botonPrincipal: {

  backgroundColor: "#2563EB",

  padding: 16,

  borderRadius: 12,

  alignItems: "center",

  marginTop: 20

},

botonSecundario: {

  backgroundColor: "#0EA5E9",

  padding: 14,

  borderRadius: 12,

  alignItems: "center",

  marginBottom: 20

},

textoBoton: {

  color: "#FFFFFF",

  fontWeight: "bold",

  fontSize: 16

}
});