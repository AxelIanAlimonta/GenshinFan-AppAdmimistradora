import { useNavigate, useParams } from "react-router";
import useVideoByIdVideo from "../../hooks/Videos/useVideoByIdVideo";
import Loading from "../../components/Loading";
import { Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import type { Video } from "../../types/Video";
import type { Etiqueta } from "../../types/Etiqueta";
import "./EditarVideo.css";
import IframeVideo from "../../components/MostrarVideo/IframeVideo";

export default function EditarVideo() {
    const { id: idVideo } = useParams<{ id: string }>();
    const id = idVideo ? Number(idVideo) : undefined;




    const { video, loading, error, actualizarVideo } = useVideoByIdVideo(Number(id));
    const [tituloVideo, setTituloVideo] = useState("");
    const [etiquetasVideo, setEtiquetasVideo] = useState<Etiqueta[]>([]);
    const [fechaPublicacion, setFechaPublicacion] = useState("");
    const [urlVideo, setUrlVideo] = useState("");
    const [personajeId, setPersonajeId] = useState<number | undefined>(undefined);
    const navigate = useNavigate();



    useEffect(() => {
        if (video) {
            setTituloVideo(video.titulo as string);
            setEtiquetasVideo(video.etiquetas as Etiqueta[]);
            setFechaPublicacion(video.fechaPublicacion as string);
            setUrlVideo(video.url as string);
            setPersonajeId(video.personajeId);
        }
    }, [video]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const videoActualizado: Video = {
            id,
            titulo: tituloVideo,
            etiquetas: etiquetasVideo,
            fechaPublicacion: fechaPublicacion,
            url: urlVideo,
            personajeId: personajeId,
        };
        try {
            await actualizarVideo(videoActualizado);
            console.log("Video actualizado correctamente");
            navigate(-1);
        } catch (error) {
            console.error("Error al actualizar el video:", error);
        }
    }

    if (!id || isNaN(id)) {
        return <p>Error: ID de video no proporcionado</p>;
    }


    if (!id) {
        return <p>Error: ID de video no proporcionado</p>;
    }

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <p>{error}</p>;
    }
    if (!video) {
        return <p>Video no encontrado</p>;
    }
    return (
        <Form className="editarVideo-container" onSubmit={handleSubmit}>
            <section className="editarVideo-videoInfo">
                <Form.Label className="editarVideo-label">
                    Título del video
                </Form.Label>
                <Form.Group className="mb-3" >
                    <Form.Control
                        type="text"
                        value={tituloVideo}
                        onChange={(e) => setTituloVideo(e.target.value)}
                    />
                </Form.Group>
                <div className="editarVideo-iframeContainer">
                    <IframeVideo url={urlVideo || ""} />
                </div>

                <Form.Group className="mb-3" >
                    <Form.Label className="editarVideo-label">
                        URL del video
                    </Form.Label>
                    <Form.Control
                        type="text"
                        value={urlVideo}
                        onChange={(e) => setUrlVideo(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label className="editarVideo-label">
                        Fecha de publicación
                    </Form.Label>
                    <Form.Control
                        type="date"
                        value={fechaPublicacion}
                        onChange={(e) => setFechaPublicacion(e.target.value)}
                    />
                </Form.Group>

            </section>
            <section className="editarVideo-etiquetas">

            </section>
            <section className="editarVideo-botones">
                <Button
                    variant="primary"
                    type="submit"
                >
                    Guardar cambios
                </Button>
                <Button
                    variant="secondary"
                    onClick={() => navigate(-1)}
                    type="button"
                >
                    Volver
                </Button>
            </section>

        </Form>
    );
}