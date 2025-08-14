import type { Elemento } from './Elemento';
import type { Region } from './Region';


export interface Personaje {
  id?: number;
  nombre?: string;
  descripcion?: string;
  rareza?: number;
  avatarURL?: string;
  splashArtURL?: string;
  splashArtSinFondoURL?: string;
  tarjetaURL?: string;
  fechaLanzamiento?: string | null;
  elementoId?: number;
  elemento?: Elemento;
  regionId?: number;
  region?: Region;
}