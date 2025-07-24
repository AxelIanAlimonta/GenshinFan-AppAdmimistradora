import type { TipoAnimacion } from './TipoAnimacion';

export interface Animacion {
    id?: number;
    url?: string;
    personajeId?: number;
    tipoAnimacionId?: number;
    tipoAnimacion?: TipoAnimacion;
}