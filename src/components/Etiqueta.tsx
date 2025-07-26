import type { Etiqueta } from '../types/Etiqueta';
import './Etiqueta.css';

export default function Etiqueta({ etiqueta, crossFunction }: { etiqueta: Etiqueta, crossFunction?: (id: number) => void }) {
    // return (
    //     <div className='etiqueta'>
    //         <span className='etiqueta-nombre'>{etiqueta.nombre}</span>
    //         {crossFunction && <span className='etiqueta-crossBtn' onClick={() => crossFunction(etiqueta.id)}>×</span>}
    //     </div>
    // );
    return (<div className="etiqueta">
        {etiqueta.nombre}
        <span className="cerrar" onClick={() => crossFunction?.(etiqueta.id)}>✖</span>
    </div>)
}