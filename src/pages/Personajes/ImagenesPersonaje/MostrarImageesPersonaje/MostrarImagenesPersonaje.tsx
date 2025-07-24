import './MostrarImagenesPersonaje.css';
import Loading from '../../../../components/Loading';
import type { ImagenPersonaje } from '../../../../types/ImagenPersonaje';
import { MagicMotion } from 'react-magic-motion';
import MostrarImagen from '../../../../components/MostrarImagen';



export default function MostrarImagenesPersonaje({ imagenesPersonaje, loading, error, eliminarImagen }: {
    imagenesPersonaje: Array<ImagenPersonaje>;
    loading: boolean;
    error: string | null;
    eliminarImagen: (id: number) => void;
}) {

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <p className='error'>Error al cargar las imágenes: {error}</p>;
    }

    if (!imagenesPersonaje.length) {
        return <p>No hay imágenes disponibles para este personaje.</p>;
    }

    imagenesPersonaje.sort((a, b) => {
        if (a.calificacion === undefined) return 1;
        if (b.calificacion === undefined) return -1;
        return b.calificacion - a.calificacion;
    });

    return (
        <MagicMotion>
            <div className="contenerdorImagenes">
                {imagenesPersonaje.map((imagen) => (
                    <div key={imagen.id} className='contenedorImagen'>
                        <MostrarImagen src={imagen.url} alt={"imagen"} style={{ maxHeight: 240 }} />

                        <button type="button" className="btn-borrar-imagen" onClick={() => eliminarImagen(imagen.id as number)}>
                            <img src="/public/images/borrar.png" alt="Borrar" />
                        </button>

                    </div>
                ))}
            </div>
        </MagicMotion>

    );
}