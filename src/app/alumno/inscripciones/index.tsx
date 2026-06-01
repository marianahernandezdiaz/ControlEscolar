import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import Checkbox from "expo-checkbox";

import { PERIODO_ACTUAL } from "../../../constants/preiodo";
import { obtenerAlumnoPorCorreo } from "../../../services/alumnoService";
import { escucharAsignaciones } from "../../../services/asignacionService";
import { auth } from "../../../services/firebase";

import {
  crearInscripcion,
  obtenerInscripcionPorAsignacion,
  obtenerInscripcionPorMateria,
  obtenerInscripcionesAlumno
} from "../../../services/inscripcionService";

export default function Inscripciones() {
  const [alumno, setAlumno] = useState<any>(null);
  const [asignaciones, setAsignaciones] = useState<any[]>([]);
  const [seleccionadas, setSeleccionadas] = useState<any[]>([]);

  useEffect(() => {
    cargarAlumno();
  }, []);

  const cargarAlumno = async () => {
    try {
      const correo = auth.currentUser?.email;
      if (!correo) return;

      const datos: any = await obtenerAlumnoPorCorreo(correo);
      if (!datos) {
        console.log("Alumno no encontrado");
        return;
      }

      setAlumno(datos);

      escucharAsignaciones((asignacionesBD) => {
        const filtradas = asignacionesBD.filter(
          (asignacion: any) =>
            asignacion.carrera === datos.carrera &&
            asignacion.semestre === datos.semestre &&
            asignacion.periodo === PERIODO_ACTUAL &&
            asignacion.estatus === "Activa"
        );
        setAsignaciones(filtradas);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const confirmarInscripcion = async () => {
    try {
      if (seleccionadas.length === 0) {
        Alert.alert("Aviso", "Selecciona al menos una materia");
        return;
      }

      const inscripcionesActuales = await obtenerInscripcionesAlumno(alumno.id);

      // Máximo 7 materias
      if (inscripcionesActuales.length + seleccionadas.length > 7) {
        Alert.alert("Aviso", "Solo puedes inscribir un máximo de 7 materias");
        return;
      }

      // No repetir materias
      const materiasSeleccionadas = new Set<string>();
      for (const asignacion of seleccionadas) {
        if (materiasSeleccionadas.has(asignacion.materiaId)) {
          Alert.alert("Aviso", `La materia ${asignacion.materiaNombre} está repetida`);
          return;
        }
        materiasSeleccionadas.add(asignacion.materiaId);
      }

      // Choques de horario
      for (let i = 0; i < seleccionadas.length; i++) {
        for (let j = i + 1; j < seleccionadas.length; j++) {
          const materiaA = seleccionadas[i];
          const materiaB = seleccionadas[j];

          for (const horarioA of materiaA.horarios) {
            for (const horarioB of materiaB.horarios) {
              if (horarioA.dia === horarioB.dia) {
                const inicioA = horarioA.horaInicio;
                const finA = horarioA.horaFin;
                const inicioB = horarioB.horaInicio;
                const finB = horarioB.horaFin;

                if (inicioA < finB && inicioB < finA) {
                  Alert.alert(
                    "Choque de Horarios",
                    `${materiaA.materiaNombre} y ${materiaB.materiaNombre} tienen conflicto el ${horarioA.dia}`
                  );
                  return;
                }
              }
            }
          }
        }
      }

      // Verificar si ya realizó inscripción previa
      if (inscripcionesActuales.length > 0) {
        Alert.alert("Inscripción cerrada", "Ya realizaste tu proceso de inscripción para este periodo");
        return;
      }

      Alert.alert(
        "Confirmar",
        `¿Deseas inscribirte a ${seleccionadas.length} materias?`,
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Aceptar",
            onPress: async () => {
              try {
                for (const asignacion of seleccionadas) {
                  const existe = await obtenerInscripcionPorAsignacion(alumno.id, asignacion.id);
                  if (existe) {
                    Alert.alert("Aviso", `Ya estás inscrito en ${asignacion.materiaNombre}`);
                    return;
                  }

                  const materiaExistente = await obtenerInscripcionPorMateria(alumno.id, asignacion.materiaId);
                  if (materiaExistente) {
                    Alert.alert("Materia ya inscrita", `Ya estás inscrito en ${asignacion.materiaNombre}`);
                    return;
                  }

                  await crearInscripcion({
                    alumnoId: alumno.id,
                    alumnoNombre: `${alumno.nombre} ${alumno.apellidoPaterno} ${alumno.apellidoMaterno}`,
                    numeroControl: alumno.numeroControl,
                    asignacionId: asignacion.id,
                    materiaId: asignacion.materiaId,
                    materiaNombre: asignacion.materiaNombre,
                    docenteNombre: asignacion.docenteNombre,
                    grupo: asignacion.grupo,
                    carrera: asignacion.carrera,
                    semestre: asignacion.semestre,
                    horarios: asignacion.horarios,
                    periodo: asignacion.periodo,
                    estatus: "Activa",
                    fechaInscripcion: new Date()
                  });
                }

                Alert.alert("Éxito", "Inscripción realizada correctamente");
                setSeleccionadas([]);
              } catch (error) {
                console.log(error);
                Alert.alert("Error", "No fue posible guardar la inscripción");
              }
            }
          }
        ]
      );
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Ocurrió un error inesperado");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Inscripciones</Text>

      <Text style={styles.contador}>Materias seleccionadas: {seleccionadas.length}</Text>

      <TouchableOpacity style={styles.boton} onPress={confirmarInscripcion}>
        <Text style={styles.botonTexto}>Confirmar Inscripción</Text>
      </TouchableOpacity>

      {asignaciones.map((asignacion) => (
        <View
  key={asignacion.id}
  style={[

    styles.card,

    seleccionadas.some(
      item =>
        item.id ===
        asignacion.id
    ) &&

    styles.cardSeleccionada

  ]}
>
 <Text style={styles.nombre}>
  {asignacion.materiaNombre}
</Text>

<Text style={styles.info}>
  👨‍🏫 {asignacion.docenteNombre}
</Text>

<Text style={styles.info}>
  🏷 Grupo: {asignacion.grupo}
</Text>

<Text style={styles.info}>
  📚 Semestre: {asignacion.semestre}
</Text>

<Text style={styles.info}>
  📅 Periodo: {asignacion.periodo}
</Text>

<Text style={styles.horarioTitulo}>
  🕒 Horarios
</Text>

{
  asignacion.horarios?.map(
    (
      horario: any,
      index: number
    ) => (

      <Text
        key={index}
        style={styles.horario}
      >
        {horario.dia}
        {"  "}
        {horario.horaInicio}
        {" - "}
        {horario.horaFin}
      </Text>

    )
  )
}

          <View style={styles.checkboxRow}>
            <Checkbox
              value={seleccionadas.some(item => item.id === asignacion.id)}
              onValueChange={(checked) => {
                if (checked) {
                  setSeleccionadas([...seleccionadas, asignacion]);
                } else {
                  setSeleccionadas(seleccionadas.filter(item => item.id !== asignacion.id));
                }
              }}
            />
            <Text style={styles.checkboxLabel}>Seleccionar</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F1F5F9" // gris muy claro para contraste
  },
  titulo: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 25,
    color: "#0F172A",
    letterSpacing: 0.5
  },
  subtitulo: {
    fontSize: 22,
    fontWeight: "600",
    marginTop: 25,
    marginBottom: 15,
    color: "#1E293B"
  },
  contador: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
    color: "#2563EB"
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 18,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 }
  },
  nombre: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2563EB",
    marginBottom: 12
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15
  },
  checkboxLabel: {
    marginLeft: 10,
    fontWeight: "600",
    color: "#334155"
  },
  boton: {
    backgroundColor: "#2563EB",
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 25,
    marginBottom: 40,
    alignItems: "center",
    shadowColor: "#2563EB",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 }
  },
  botonTexto: {
    color: "#FFF",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.5
  },
  info: {

  fontSize: 16,

  marginBottom: 6,

  color: "#334155"

},

horarioTitulo: {

  marginTop: 12,

  fontWeight: "bold",

  fontSize: 16,

  color: "#1565C0"

},

horario: {

  marginTop: 4,

  color: "#475569"

},

cardSeleccionada: {

  borderWidth: 2,

  borderColor: "#1565C0",

  backgroundColor: "#F0F7FF"

}
});

