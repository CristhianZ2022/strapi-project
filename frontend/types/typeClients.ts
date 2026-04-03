export interface Client {
  documentId: string;
  nombres: string;
  apellidos: string;
  currentAge: string;
  identificacion: string;
  contrato: number;
  ciudad: string;
  email: string;
  telefono: number;
  estado: string;
  valores: number;
  plans: Plan[];
  tipoPlan: string;
  planPrincipal: boolean;
  tipoCliente: string;
  reference: Reference[];
  automaticCut: boolean;
  discountLaw: DiscountLaw | null;
  withholdingAgent: boolean;
  files: FileItem[];
}

export interface DiscountLaw {
  disability: boolean;
  oldAge: boolean;
}

export interface Reference {
  identificacion: string;
  fullnames: string;
  relationship: string;
  phone: number;
}

export interface User {
  fullname: string;
  lastname: string;
}

export interface Plan {
  documentId: string;
  type: string;
  plan: string;
  cut: number;
  valor: number;
  descuento: number;
  meses: number;
}

/** Represents a media file stored in Strapi's upload provider */
export interface StrapiMedia {
  id: number;
  documentId?: string;
  url: string;
  name: string;
  mime: string;
}

/**
 * Represents a file component entry (component.file) in Strapi.
 * Each entry has metadata (name, filename) and either:
 * - `file`: a populated StrapiMedia from the backend
 * - `pendingFile`: a browser File object waiting to be uploaded
 */
export interface FileItem {
  id?: number;
  documentId?: string;
  name: string;
  filename?: string;
  file?: StrapiMedia[] | null;
  pendingFile?: File;
}
