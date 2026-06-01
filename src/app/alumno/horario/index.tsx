import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";

import * as ScreenOrientation from "expo-screen-orientation";
import { obtenerAlumnoPorCorreo } from "../../../services/alumnoService";
import { auth } from "../../../services/firebase";
import { escucharInscripcionesAlumno } from "../../../services/inscripcionService";

export default function Horario() {
  const [alumno, setAlumno] = useState<any>(null);
  const [inscripciones, setInscripciones] = useState<any[]>([]);

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    };
  }, []);

  const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
  const horas = [
    "07:00","08:00","09:00","10:00","11:00","12:00",
    "13:00","14:00","15:00","16:00","17:00","18:00",
    "19:00","20:00"
  ];

  useEffect(() => {
    cargarHorario();
  }, []);

  const cargarHorario = async () => {
    try {
      const correo = auth.currentUser?.email;
      if (!correo) return;

      const alumnoData = await obtenerAlumnoPorCorreo(correo);
      if (!alumnoData) return;

      setAlumno(alumnoData);

      escucharInscripcionesAlumno(alumnoData.id, (datos) => {
        setInscripciones(datos);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerMateria = (dia: string, hora: string) => {
    for (const inscripcion of inscripciones) {
      for (const horario of inscripcion.horarios) {
        if (
          horario.dia === dia &&
          hora >= horario.horaInicio &&
          hora < horario.horaFin
        ) {
          return {
            materia: inscripcion.materiaNombre,
            grupo: inscripcion.grupo
          };
        }
      }
    }
    return null;
  };

return (
  <View style={styles.container}>
    <Text style={styles.titulo}>Horario</Text>

    {alumno && (
      <View style={styles.cardAlumno}>
        <Text style={styles.nombre}>{alumno.nombre} {alumno.apellidoPaterno}</Text>
        <Text>Carrera: {alumno.carrera}</Text>
        <Text>Semestre: {alumno.semestre}</Text>
      </View>
    )}

    {/* Scroll vertical para poder bajar */}
    <ScrollView showsVerticalScrollIndicator={true}>
      {/* Scroll horizontal para las columnas */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        <View style={styles.tabla}>
          <View style={styles.fila}>
            <View style={styles.headerHora}>
              <Text style={styles.headerText}>Hora</Text>
            </View>
            {dias.map((dia) => (
              <View key={dia} style={styles.headerDia}>
                <Text style={styles.headerText}>{dia}</Text>
              </View>
            ))}
          </View>

          {horas.map((hora) => (
            <View key={hora} style={styles.fila}>
              <View style={styles.celdaHora}>
                <Text style={styles.horaText}>{hora}</Text>
              </View>
              {dias.map((dia) => {
                const clase = obtenerMateria(dia, hora);
                return (
                  <View
                    key={`${dia}-${hora}`}
                    style={clase ? styles.celdaMateria : styles.celda}
                  >
                    {clase && (
                      <>
                        <Text style={styles.nombreMateria}>{clase.materia}</Text>
                        <Text style={styles.grupo}>{clase.grupo}</Text>
                      </>
                    )}
                  </View>
                );
              })}
            </View>
          ))}
        </View>
      </ScrollView>
    </ScrollView>
  </View>
);


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#F1F5F9"
  },
  titulo: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 15,
    color: "#1565C0"
  },
  cardAlumno: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 2
  },
  nombre: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1565C0",
    marginBottom: 5
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  tabla: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    alignSelf: "center"
  },
  fila: {
    flexDirection: "row"
  },
  headerHora: {
    width: 70,
    backgroundColor: "#1565C0",
    padding: 8,
    justifyContent: "center",
    alignItems: "center"
  },
  headerDia: {
    width: 110,
    backgroundColor: "#1565C0",
    padding: 8,
    justifyContent: "center",
    alignItems: "center"
  },
  headerText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 13
  },
  celdaHora: {
    width: 70,
    height: 60,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC"
  },
  horaText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#334155"
  },
  celda: {
    width: 110,
    height: 60,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#FFF"
  },
  celdaMateria: {
    width: 110,
    height: 60,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#DBEAFE",
    justifyContent: "center",
    alignItems: "center",
    padding: 3
  },
  nombreMateria: {
    fontSize: 11,
    fontWeight: "700",
    textAlign: "center",
    color: "#1565C0"
  },
  grupo: {
    fontSize: 10,
    textAlign: "center",
    color: "#334155"
  }
});
