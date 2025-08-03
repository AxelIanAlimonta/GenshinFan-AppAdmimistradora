import useVideos from "../../../hooks/Videos/useVideos";
import Loading from "../../../components/Loading";
import MostrarVideos from "../../../components/MostrarVideos/MostrarVideos";
import './AdministrarVideos.css';
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useMemo, useState } from "react";
import type { Video } from "../../../types/Video";
import { useNavigate } from "react-router";

export default function AdministrarVideos() {
    const { videos, loading, error, eliminarVideo } = useVideos();
    const [nombreBusqueda, setNombreBusqueda] = useState<string>("");
    const navigate = useNavigate();

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

            <div className="administrarVideos-AgregarYBusqueda mb-3">
                <Button variant="primary" onClick={() => navigate("/videos/agregar")}>Agregar Video</Button>
                <Form.Group controlId="formBasicEmail" className="administrarVideos-busquedaContainer">
                    <FloatingLabel controlId="floatingInput" label="Buscar por nombre" className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Nombre del video"
                            value={nombreBusqueda}
                            onChange={(e) => setNombreBusqueda(e.target.value)}
                        />
                    </FloatingLabel>
                </Form.Group>
            </div>

            <MostrarVideos
                videos={videosFiltrados}
                borrarVideo={eliminarVideo}
                error={error}
                loading={loading}
            />

        </div>
    );
}