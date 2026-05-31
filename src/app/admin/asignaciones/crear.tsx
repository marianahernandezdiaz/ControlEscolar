import { Picker } from "@react-native-picker/picker";
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

import {
    crearAsignacion,
    obtenerAsignaciones
} from "../../../services/asignacionService";
import { obtenerDocentes } from "../../../services/docenteService";
import { obtenerMaterias } from "../../../services/materiaService";

export default function CrearAsignacion() {
  const [docentes, setDocentes] = useState<any[]>([]);
  const [materias, setMaterias] = useState<any[]>([]);
  const [docenteId, setDocenteId] = useState("");
  const [materiaId, setMateriaId] = useState("");
  const [grupo, setGrupo] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [horarios, setHorarios] = useState<any[]>([]);
  const [asignaciones, setAsignaciones] = useState<any[]>([]);

  const [dia, setDia] = useState("Lunes");
  const [horaInicio, setHoraInicio] = useState("07:00");
  const [horaFin, setHoraFin] = useState("08:00");

  const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
  const horas = [
    "07:00","08:00","09:00","10:00","11:00","12:00",
    "13:00","14:00","15:00","16:00","17:00","18:00",
    "19:00","20:00"
  ];

  useEffect(() => {
    const unsubscribeDocentes = obtenerDocentes((datos) => setDocentes(datos));
    const unsubscribeMaterias = obtenerMaterias((datos) => setMaterias(datos));
    const unsubscribeAsignaciones = obtenerAsignaciones((datos) => setAsignaciones(datos));

    return () => {
      unsubscribeDocentes();
      unsubscribeMaterias();
      unsubscribeAsignaciones();
    };
  }, []);

  const agregarHorario = () => {
    const existeHorario = horarios.some(
      h => h.dia === dia && h.horaInicio === horaInicio && h.horaFin === horaFin
    );
    if (existeHorario) {
      Alert.alert("Horario duplicado", "Ese horario ya fue agregado.");
      return;
    }

    if (horaInicio >= horaFin) {
      Alert.alert("Horario inválido", "La hora de inicio debe ser menor que la hora final.");
      return;
    }

    setHorarios(prev => [...prev, { dia, horaInicio, horaFin }]);
  };

  const eliminarHorario = (index: number) => {
    setHorarios(horarios.filter((_, i) => i !== index));
  };

  const guardarAsignacion = async () => {
    try {
      const docente = docentes.find(d => d.id === docenteId);
      const materia = materias.find(m => m.id === materiaId);

      if (!docente) {
        Alert.alert("Error", "Seleccione un docente");
        return;
      }
      if (!materia) {
        Alert.alert("Error", "Seleccione una materia");
        return;
      }
      if (!grupo.trim()) {
        Alert.alert("Error", "Ingrese un grupo.");
        return;
      }
      if (!periodo.trim()) {
        Alert.alert("Error", "Ingrese un periodo.");
        return;
      }
      if (horarios.length === 0) {
        Alert.alert("Error", "Agregue al menos un horario");
        return;
      }

      const carreraCompatible = docente.carreras?.some(
        (carreraDocente: string) => materia.carreras?.includes(carreraDocente)
      );
      if (!carreraCompatible) {
        Alert.alert("Carrera incompatible", "El docente no pertenece a ninguna de las carreras asociadas a esta materia.");
        return;
      }

      const asignacionesDocente = asignaciones.filter(a => a.docenteId === docente.id);
      for (const nuevoHorario of horarios) {
        for (const asignacion of asignacionesDocente) {
          for (const horarioExistente of asignacion.horarios) {
            const mismoDia = horarioExistente.dia === nuevoHorario.dia;
            const traslape =
              nuevoHorario.horaInicio < horarioExistente.horaFin &&
              nuevoHorario.horaFin > horarioExistente.horaInicio;
            if (mismoDia && traslape) {
              Alert.alert(
                "Conflicto de horario",
                `El docente ya tiene clase el ${nuevoHorario.dia} de ${horarioExistente.horaInicio} a ${horarioExistente.horaFin}`
              );
              return;
            }
          }
        }
      }

      await crearAsignacion({
        docenteId: docente.id,
        docenteNombre: `${docente.nombre} ${docente.apellidoPaterno} ${docente.apellidoMaterno}`,
        materiaId: materia.id,
        materiaNombre: materia.nombre,
        grupo,
        horarios,
        periodo,
        estatus: "Activa",
        fechaRegistro: new Date()
      });

      Alert.alert("Éxito", "Asignación creada");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "No fue posible guardar");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Nueva Asignación</Text>

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

      <Text style={styles.label}>Materia</Text>
      <View style={styles.picker}>
        <Picker selectedValue={materiaId} onValueChange={setMateriaId}>
          <Picker.Item label="Seleccione una materia" value="" />
          {materias.map(materia => (
            <Picker.Item key={materia.id} label={materia.nombre} value={materia.id} />
          ))}
        </Picker>
      </View>

      <TextInput placeholder="Grupo" value={grupo} onChangeText={setGrupo} style={styles.input} />
      <TextInput placeholder="Periodo" value={periodo} onChangeText={setPeriodo} style={styles.input} />

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

      <Button title="Agregar Horario" onPress={agregarHorario} />

      <Text style={styles.subtitulo}>Horarios Registrados</Text>
      {horarios.map((horario, index) => (
        <View key={index} style={styles.cardHorario}>
          <Text>{horario.dia} - {horario.horaInicio} a {horario.horaFin}</Text>
          <TouchableOpacity onPress={() => eliminarHorario(index)}>
            <Text style={{ color: "red" }}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      ))}

      <Button title="Guardar Asignación" onPress={guardarAsignacion} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  titulo: { fontSize: 28, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  subtitulo: { fontSize: 18, fontWeight: "bold", marginVertical: 15 },
  label: { fontWeight: "bold", marginBottom: 8 },
  picker: { borderWidth: 1, borderColor: "#ccc", borderRadius: 10, marginBottom: 12 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 10, padding: 12, marginBottom: 12 },
  cardHorario: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
