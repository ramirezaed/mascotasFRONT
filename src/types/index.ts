export interface Imascotas {
  id: number;
  nombre?: string;
  raza?: string;
  tamaño?: string;
  tipo?: string;
  descripcion?: string;
  estado: string;
  contactoNombre?: string;
  contactoCorreo?: string;
  contactoTelefono?: string;
  imagen?: string | null;
}

// Campañas de vacunación, castración, adopción, etc.
export interface Icampana {
  id?: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  ubicacion: string;
  // contactoNombre: string;
  // contactoCorreo: string;
  // contactoTelefono: string;
}

export interface IcampanaForm {
  onClose: () => void;
  onSuccess?: () => void;
}

export interface Irefugios {
  id?: number;
  descripcion: string;
  ubicacion: string;
  capacidad?: number; // cuántas mascotas puede alojar
  // contacto si no hay usuario
  contactoNombre: string;
  contactoCorreo: string;
  contactoTelefono: string;
}
export interface IrefugiosForm {
  onClose: () => void;
  onSuccess?: () => void;
}
