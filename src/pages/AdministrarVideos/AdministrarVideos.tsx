import useVideos from "../../hooks/Videos/useVideos";
import Loading from "../../components/Loading";
import MostrarVideos from "../../components/MostrarVideos/MostrarVideos";
import './AdministrarVideos.css';
import { Form } from "react-bootstrap";
import { useMemo, useState } from "react";
import type { Video } from "../../types/Video";

export default function AdministrarVideos() {
    const { videos, loading, error, agregarVideo, editarVideo, eliminarVideo } = useVideos();
    const [nombreBusqueda, setNombreBusqueda] = useState<string>("");
    const videosFiltrados = useMemo(() =>
        videos.filter((video: Video) =>
            video.titulo?.toLowerCase().includes(nombreBusqueda.toLowerCase())
        ), [videos, nombreBusqueda]
    );


    if (loading) return <Loading />;

    if (error) return <div>Error al cargar los videos: {error}</div>;

    if (videos.length === 0) return <div>No hay videos disponibles.</div>;

 
    videosFiltrados.sort((a, b) => {
        const fechaA = new Date(a.fechaPublicacion || '');
        const fechaB = new Date(b.fechaPublicacion || '');
        return fechaB.getTime() - fechaA.getTime();
    });


    return (
        <div className="administrarVideos-container">
            <h1>Administrar Videos</h1>
            <Form.Group controlId="formBasicEmail">
                <Form.Control
                    type="text"
                    placeholder="Nombre del video"
                    value={nombreBusqueda}
                    onChange={(e) => setNombreBusqueda(e.target.value)}
                />
            </Form.Group>

            <MostrarVideos
                videos={videosFiltrados}
                borrarVideo={eliminarVideo}
                error={error}
                loading={loading}
            />

        </div>
    );
}