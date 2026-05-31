export interface Docente {

  id?: string;

  numeroEmpleado: string;

  nombre: string;

  apellidoPaterno: string;

  apellidoMaterno: string;

  correo: string;

  telefono: string;

  especialidad: string;

  carreras: string[];

  estatus: string;

  foto?: string;

  fechaRegistro: Date;

}