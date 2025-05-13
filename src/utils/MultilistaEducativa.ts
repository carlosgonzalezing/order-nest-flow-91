
/**
 * Implementación educativa de una multilista con nodos y punteros explícitos
 * para representar la relación entre órdenes y productos en un restaurante.
 */

// Nodo que representa un producto
export class NodoProducto {
  id: string;
  nombre: string;
  cantidad: number;
  precioUnitario: number;
  siguiente: NodoProducto | null = null;  // Enlace horizontal (siguiente producto de la misma orden)

  constructor(id: string, nombre: string, cantidad: number, precioUnitario: number) {
    this.id = id;
    this.nombre = nombre;
    this.cantidad = cantidad;
    this.precioUnitario = precioUnitario;
  }
}

// Nodo que representa una orden
export class NodoOrden {
  id: string;
  mesa: number;
  cliente: string;
  fecha: Date;
  estado: 'pendiente' | 'preparando' | 'listo' | 'entregado';
  primerProducto: NodoProducto | null = null;  // Enlace vertical (cabeza de la lista de productos)
  siguiente: NodoOrden | null = null;  // Enlace horizontal (siguiente orden)

  constructor(
    id: string,
    mesa: number,
    cliente: string,
    estado: 'pendiente' | 'preparando' | 'listo' | 'entregado'
  ) {
    this.id = id;
    this.mesa = mesa;
    this.cliente = cliente;
    this.fecha = new Date();
    this.estado = estado;
  }

  // Método para agregar un producto a esta orden
  agregarProducto(producto: NodoProducto): void {
    if (!this.primerProducto) {
      // Si no hay productos, este es el primero
      this.primerProducto = producto;
    } else {
      // Si ya hay productos, encontrar el último y enlazarlo
      let actual = this.primerProducto;
      while (actual.siguiente) {
        actual = actual.siguiente;
      }
      actual.siguiente = producto;
    }
  }

  // Método para eliminar un producto de esta orden por ID
  eliminarProducto(id: string): boolean {
    if (!this.primerProducto) return false;
    
    // Caso especial: el primer producto es el que queremos eliminar
    if (this.primerProducto.id === id) {
      this.primerProducto = this.primerProducto.siguiente;
      return true;
    }
    
    // Buscar en el resto de la lista
    let actual = this.primerProducto;
    while (actual.siguiente) {
      if (actual.siguiente.id === id) {
        // Encontramos el producto a eliminar, redirigir el enlace
        actual.siguiente = actual.siguiente.siguiente;
        return true;
      }
      actual = actual.siguiente;
    }
    return false;
  }

  // Método para obtener todos los productos como array
  obtenerProductos(): NodoProducto[] {
    const productos: NodoProducto[] = [];
    let actual = this.primerProducto;
    while (actual) {
      productos.push(actual);
      actual = actual.siguiente;
    }
    return productos;
  }

  // Método para calcular el total de la orden
  calcularTotal(): number {
    let total = 0;
    let actual = this.primerProducto;
    while (actual) {
      total += actual.cantidad * actual.precioUnitario;
      actual = actual.siguiente;
    }
    return total;
  }
}

// Clase principal que gestiona la multilista completa
export class MultilistaPedidos {
  primeraOrden: NodoOrden | null = null;

  // Método para agregar una nueva orden
  agregarOrden(orden: NodoOrden): void {
    if (!this.primeraOrden) {
      // Si no hay órdenes, esta es la primera
      this.primeraOrden = orden;
    } else {
      // Si ya hay órdenes, encontrar la última y enlazarla
      let actual = this.primeraOrden;
      while (actual.siguiente) {
        actual = actual.siguiente;
      }
      actual.siguiente = orden;
    }
  }

  // Método para eliminar una orden por ID
  eliminarOrden(id: string): boolean {
    if (!this.primeraOrden) return false;
    
    // Caso especial: la primera orden es la que queremos eliminar
    if (this.primeraOrden.id === id) {
      this.primeraOrden = this.primeraOrden.siguiente;
      return true;
    }
    
    // Buscar en el resto de la lista
    let actual = this.primeraOrden;
    while (actual.siguiente) {
      if (actual.siguiente.id === id) {
        // Encontramos la orden a eliminar, redirigir el enlace
        actual.siguiente = actual.siguiente.siguiente;
        return true;
      }
      actual = actual.siguiente;
    }
    return false;
  }

  // Método para buscar una orden por ID
  buscarOrden(id: string): NodoOrden | null {
    let actual = this.primeraOrden;
    while (actual) {
      if (actual.id === id) {
        return actual;
      }
      actual = actual.siguiente;
    }
    return null;
  }

  // Método para obtener todas las órdenes como array
  obtenerOrdenes(): NodoOrden[] {
    const ordenes: NodoOrden[] = [];
    let actual = this.primeraOrden;
    while (actual) {
      ordenes.push(actual);
      actual = actual.siguiente;
    }
    return ordenes;
  }

  // Método para actualizar el estado de una orden
  actualizarEstadoOrden(id: string, nuevoEstado: 'pendiente' | 'preparando' | 'listo' | 'entregado'): boolean {
    const orden = this.buscarOrden(id);
    if (orden) {
      orden.estado = nuevoEstado;
      return true;
    }
    return false;
  }

  // Método para convertir desde el formato de datos de la aplicación
  cargarDesdeDatos(ordenes: any[]): void {
    ordenes.forEach(ordenData => {
      // Crear nodo orden
      const orden = new NodoOrden(
        ordenData.id,
        ordenData.mesa,
        ordenData.cliente,
        ordenData.estado
      );
      
      // Agregar productos a la orden
      ordenData.productos.forEach((productoData: any) => {
        const producto = new NodoProducto(
          productoData.id,
          productoData.nombre,
          productoData.cantidad,
          productoData.precioUnitario
        );
        orden.agregarProducto(producto);
      });
      
      // Agregar la orden a la multilista
      this.agregarOrden(orden);
    });
  }
}
