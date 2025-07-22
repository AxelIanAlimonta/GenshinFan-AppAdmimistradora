import useImagenesPersonajePorIdPersonaje from '../../../hooks/Personajes/useImagenesPersonajePorIdPersonaje';
import './ImagenesPersonaje.css';
import Loading from '../../../components/Loading';


export default function ImagenesPersonaje({ id }: { id: number }) {

    const { imagenesPersonaje, loading, error, eliminarImagen } = useImagenesPersonajePorIdPersonaje(id);



    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <p className='error'>Error al cargar las imágenes: {error}</p>;
    }

    if (!imagenesPersonaje.length) {
        return <p>No hay imágenes disponibles para este personaje.</p>;
    }

    function handleDelete(imagenId: number) {
        eliminarImagen(imagenId)
    }



    return (
        <div>
            {error && <p className='error'>Error al cargar las imágenes: {error}</p>}
            {!imagenesPersonaje.length && <p>No hay imágenes disponibles para este personaje.</p>}

            <div className="contenerdorImagenes">
                {imagenesPersonaje.map((imagen) => (
                    <div key={imagen.id} className='contenedorImagen'>
                        <img className='contenedorImagen-imagen' src={imagen.url} alt={imagen.nombre} />

                        <button className="btn-borrar" onClick={() => handleDelete(imagen.id as number)}>
                            <img src="/public/images/borrar.png" alt="Borrar" />
                        </button>

                    </div>
                ))}
            </div>
        </div>
    );
}