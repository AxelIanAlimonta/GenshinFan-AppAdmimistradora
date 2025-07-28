import type { Etiqueta as EtiquetaType } from '../types/Etiqueta';
import './Etiqueta.css';

export default function Etiqueta({
  etiqueta,
  handleCrossClick,
  handlePlusClick
}: {
  etiqueta: EtiquetaType,
  handleCrossClick?: () => void,
  handlePlusClick?: () => void
}) {
  const tipoClase = handleCrossClick
    ? 'etiqueta-roja'
    : handlePlusClick
    ? 'etiqueta-verde'
    : 'etiqueta-normal';

  return (
    <div className={`etiqueta ${tipoClase}`}>
      {etiqueta.nombre}
      {handleCrossClick && (
        <span className="cerrar" onClick={handleCrossClick}>✖</span>
      )}
      {handlePlusClick && (
        <span className="agregar" onClick={handlePlusClick}>✚</span>
      )}
    </div>
  );
}
