export interface Calificacion {

  id?: string;

  alumnoId: string;

  alumnoNombre: string;

  asignacionId: string;

  materiaNombre: string;

  docenteNombre: string;

  unidad1: number;

  unidad2: number;

  unidad3: number;

  promedio: number;

  fechaRegistro: Date;

  grupo: string;

}