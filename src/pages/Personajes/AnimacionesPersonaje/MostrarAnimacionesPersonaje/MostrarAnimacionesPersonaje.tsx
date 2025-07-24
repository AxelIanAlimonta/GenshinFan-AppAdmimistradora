import Loading from '../../../../components/Loading';
import MostrarImagen from '../../../../components/MostrarImagen';
import type { Animacion } from '../../../../types/Animacion';
import { MagicMotion } from 'react-magic-motion';
import './MostrarAnimacionesPersonaje.css';

export default function MostrarAnimacionesPersonaje({ animaciones, loading, error, eliminarAnimacion }: { animaciones: Animacion[]; loading: boolean; error: string | null; eliminarAnimacion: (id: number) => void; }) {
    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <p className='error'>Error al cargar las animaciones: {error}</p>;
    }

    if (!animaciones.length) {
        return <p>No hay animaciones disponibles para este personaje.</p>;
    }



    return (
        <MagicMotion>
            <div className='contenedorAnimaciones'>
                {animaciones.map((animacion) => (
                    <div key={animacion.id} className='contenedorAnimacion'>
                        <MostrarImagen src={animacion.url} alt={animacion.tipoAnimacion?.nombre} style={{maxHeight:290}}/>
                        <button type="button" className="btn-borrar-animacion" onClick={() => eliminarAnimacion(animacion.id as number)}>
                            <img src="/public/images/borrar.png" alt="Borrar" />
                        </button>
                    </div>
                ))}
            </div>
        </MagicMotion>
    );
}