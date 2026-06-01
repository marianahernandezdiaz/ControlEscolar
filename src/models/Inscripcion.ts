import { Horario } from "./Horario";

export interface Inscripcion {

  id?: string;

  alumnoId: string;

  alumnoNombre: string;

  numeroControl: string;

  asignacionId: string;

  materiaId: string;

  materiaNombre: string;

  docenteNombre: string;

  grupo: string;

  carrera: string;

  semestre: number;

  horarios: Horario[];

  periodo: string;

  estatus: string;

  fechaInscripcion: Date;

}
