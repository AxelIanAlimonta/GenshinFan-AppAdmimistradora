import type { Etiqueta } from "./Etiqueta";

export interface Video {
    id?: number;
    titulo?: string;
    url?: string;
    fechaPublicacion?: string;
    personajeId?: number;
    etiquetas?: Etiqueta[];
}