
// Catálogo de productos del restaurante
export interface MenuItem {
  id: string;
  nombre: string;
  precioUnitario: number;
  categoria: 'entrada' | 'principal' | 'postre' | 'bebida';
  descripcion?: string;
}

export const menuItems: MenuItem[] = [
  // Entradas
  { id: 'e1', nombre: 'Ensalada César', precioUnitario: 8.50, categoria: 'entrada', descripcion: 'Lechuga romana, crutones, queso parmesano y aderezo César' },
  { id: 'e2', nombre: 'Bruschetta', precioUnitario: 6.75, categoria: 'entrada', descripcion: 'Pan tostado con tomate, ajo y albahaca' },
  { id: 'e3', nombre: 'Calamares Fritos', precioUnitario: 9.25, categoria: 'entrada' },
  
  // Platos principales
  { id: 'p1', nombre: 'Lasaña de Carne', precioUnitario: 12.50, categoria: 'principal', descripcion: 'Lasaña casera con salsa boloñesa y queso' },
  { id: 'p2', nombre: 'Salmón a la Parrilla', precioUnitario: 15.75, categoria: 'principal', descripcion: 'Con salsa de limón y hierbas' },
  { id: 'p3', nombre: 'Pasta Carbonara', precioUnitario: 11.25, categoria: 'principal' },
  { id: 'p4', nombre: 'Filete de Res', precioUnitario: 18.50, categoria: 'principal', descripcion: 'Con salsa de champiñones y puré de papas' },
  
  // Postres
  { id: 'd1', nombre: 'Tarta de Chocolate', precioUnitario: 6.25, categoria: 'postre' },
  { id: 'd2', nombre: 'Helado Variado', precioUnitario: 4.50, categoria: 'postre', descripcion: 'Tres sabores a elección' },
  { id: 'd3', nombre: 'Flan Casero', precioUnitario: 5.25, categoria: 'postre' },
  
  // Bebidas
  { id: 'b1', nombre: 'Refresco', precioUnitario: 2.50, categoria: 'bebida' },
  { id: 'b2', nombre: 'Agua Mineral', precioUnitario: 1.75, categoria: 'bebida' },
  { id: 'b3', nombre: 'Café', precioUnitario: 2.25, categoria: 'bebida' },
  { id: 'b4', nombre: 'Vino de la Casa (copa)', precioUnitario: 4.50, categoria: 'bebida' }
];

// Función para buscar productos por nombre
export const buscarProductos = (termino: string): MenuItem[] => {
  const terminoLower = termino.toLowerCase();
  return menuItems.filter(item => 
    item.nombre.toLowerCase().includes(terminoLower) || 
    item.descripcion?.toLowerCase().includes(terminoLower)
  );
};

// Obtener productos por categoría
export const getProductosPorCategoria = (categoria: MenuItem['categoria']): MenuItem[] => {
  return menuItems.filter(item => item.categoria === categoria);
};
