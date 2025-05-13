
export interface Producto {
  id: string;
  nombre: string;
  cantidad: number;
  precioUnitario: number;
}

export interface Orden {
  id: string;
  mesa: number;
  cliente: string;
  fecha: Date;
  productos: Producto[];
  estado: 'pendiente' | 'preparando' | 'listo' | 'entregado';
}

export type NuevaOrden = Omit<Orden, 'id' | 'fecha' | 'productos'>;
