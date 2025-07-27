import type { Etiqueta } from '../types/Etiqueta';
import './Etiqueta.css';

export default function Etiqueta({ etiqueta, handleCrossClick }: { etiqueta: Etiqueta, handleCrossClick?: (id: number) => void }) {

    return (<div className="etiqueta">
        {etiqueta.nombre}
        {handleCrossClick && <span className="cerrar" onClick={() => handleCrossClick?.(etiqueta.id as number)}>✖</span>}
    </div>)
}