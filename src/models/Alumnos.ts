export interface Alumno {
  id?: string;

  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;

  numeroControl: string;

  edad: number;

  genero: string;

  telefono: string;

  correo: string;

  direccion: string;

  carrera: string;

  semestre: number;

  estatus: string;

  foto: string;

  fechaRegistro: Date;
}