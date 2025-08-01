import { useNavigate, useParams } from 'react-router';
import './AgregarVideoPersonaje.css';
import { useVideosPersonajePorIdPersonaje } from '../../../../hooks/Personajes/useVideosPersonajePorIdPersonaje';
import { Button, Form } from 'react-bootstrap';
import type { Video } from '../../../../types/Video';
import { useState } from 'react';
import Loading from '../../../../components/Loading';
import MostrarVideos from '../../../../components/MostrarVideos/MostrarVideos';

export default function AgregarVideoPersonaje() {

    const id = Number(useParams().id);
    const [titulo, setTitulo] = useState<string>('');
    const [url, setUrl] = useState<string>('');
    const [fechaPublicacion, setFechaPublicacion] = useState<string>('');

    const navigate = useNavigate();

    const { crearVideo, loading, error, videos, borrarVideo } = useVideosPersonajePorIdPersonaje(id);

    if (isNaN(id)) {
        throw new Error("ID del personaje no válido");
    }

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!videos) {
        return <div>No se encontraron videos para este personaje.</div>;
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!titulo && !url && !fechaPublicacion) {
            alert("Por favor, complete todos los campos.");
            return;
        }
        const nuevoVideo: Video = {
            titulo,
            url,
            fechaPublicacion,
            personajeId: id
        };

        crearVideo(nuevoVideo).then(() => {
            setTitulo('');
            setUrl('');
            setFechaPublicacion('');
        })
            .catch((error: any) => {
                console.error("Error al agregar el video:", error);
                alert("Error al agregar el video. Por favor, inténtelo de nuevo.");
            });

    }


    videos.sort((a, b) => {
        const fechaA = new Date(a.fechaPublicacion || '');
        const fechaB = new Date(b.fechaPublicacion || '');
        return fechaB.getTime() - fechaA.getTime();
    });


    return (
        <div className='contenedorAgregarVideo'>
            <h2>Agregar Video</h2>
            <Form onSubmit={handleSubmit} className='formulario'>
                <Form.Group controlId="formVideoTitulo" className='formulario-group'>
                    <Form.Label>Título del Video</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese el título del video" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formVideoURL" className='formulario-group'>
                    <Form.Label>URL del Video</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese la URL del video" value={url} onChange={(e) => setUrl(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formVideoFechaPublicacion" className='formulario-group'>
                    <Form.Label>Fecha de Publicación</Form.Label>
                    <Form.Control type="date" value={fechaPublicacion} onChange={(e) => setFechaPublicacion(e.target.value)} />
                </Form.Group>

                <Form.Group className='formulario-botones'>
                    <Button variant="success" type="submit">Agregar Video</Button>
                    <Button variant='danger' onClick={() => { navigate(-1) }} type='button'>Volver</Button>
                </Form.Group>
            </Form>

            <h3>Videos Agregados</h3>
            {videos.length > 0 ? (
                <MostrarVideos
                    videos={videos}
                    borrarVideo={borrarVideo ? (id: number) => { borrarVideo(id); } : () => { }}
                    error={error}
                    loading={loading}
                />
            ) : (
                <div>No hay videos disponibles para este personaje.</div>
            )}

        </div>
    );
}