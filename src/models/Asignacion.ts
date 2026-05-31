import { Horario } from "./Horario";

export interface Asignacion {

  id?: string;

  docenteId: string;
  docenteNombre: string;

  materiaId: string;
  materiaNombre: string;

  grupo: string;

  horarios: Horario[];

  periodo: string;

  estatus: string;

  fechaRegistro: Date;

}