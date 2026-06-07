// Types partages pour les demandes de devis.

export interface QuoteInput {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  workType: string;
  rooms: string[];
  surface: string;
  supportState: string;
  budget: string;
  deadline: string;
  description: string;
  consent: boolean;
}

export interface QuoteRecord extends QuoteInput {
  id: string;
  createdAt: string;
  status: QuoteStatus;
}

export type QuoteStatus = "new" | "contacted" | "quoted" | "closed";

export interface QuoteFileRecord {
  id: string;
  quoteId: string;
  originalName: string;
  storedName: string;
  mimeType: string;
  size: number;
  createdAt: string;
}

export interface StoredFile {
  originalName: string;
  storedName: string;
  mimeType: string;
  size: number;
  buffer: ArrayBuffer;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  data?: QuoteInput;
}

export interface ApiSuccess {
  success: true;
  quoteId: string;
}

export interface ApiError {
  success: false;
  error: string;
}
