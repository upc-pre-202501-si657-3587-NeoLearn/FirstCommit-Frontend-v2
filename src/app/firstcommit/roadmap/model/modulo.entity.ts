export class ModuloEntity {
  id: number;
  imagen: string;
  nombre: string;
  descripcion: string;
  course_ids: number[];

  constructor() {
    this.id = 0;
    this.imagen = '';
    this.nombre = '';
    this.descripcion = '';
    this.course_ids = [];
  }
}
