import type { Etiqueta as EtiquetaType } from '../types/Etiqueta';
import './Etiqueta.css';

export default function Etiqueta({
  etiqueta,
  handleCrossClick,
  handlePlusClick,
  handleEditClick // Nuevo prop
}: {
  etiqueta: EtiquetaType,
  handleCrossClick?: () => void,
  handlePlusClick?: () => void,
  handleEditClick?: () => void // Nuevo prop
}) {


  if (handleCrossClick) {
    return (
      <div className={`etiqueta etiqueta-roja`}>
        {etiqueta.nombre}
        <span className="cerrar" onClick={handleCrossClick}>✖</span>
      </div>
    );
  }

  if (handlePlusClick) {
    return (
      <div className={`etiqueta etiqueta-verde`}>
        {etiqueta.nombre}
        <span className="agregar" onClick={handlePlusClick}>✚</span>
      </div>
    );
  }
  if (handleEditClick) {
    return (
      <div className={`etiqueta etiqueta-amarilla`}>
        {etiqueta.nombre}
        <span className="editar" onClick={handleEditClick}>✎</span>
      </div>
    );
  }

  return (
    <div className="etiqueta etiqueta-normal">
      {etiqueta.nombre}
    </div>
  );
}
