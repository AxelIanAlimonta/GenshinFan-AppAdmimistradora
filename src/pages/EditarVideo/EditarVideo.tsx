import { useNavigate, useParams } from "react-router";
import useVideoByIdVideo from "../../hooks/Videos/useVideoByIdVideo";
import Loading from "../../components/Loading";
import { Button, Form, Tab, Tabs } from "react-bootstrap";
import { useEffect, useState } from "react";
import type { Video } from "../../types/Video";
import type { Etiqueta as TipoEtiqueta } from "../../types/Etiqueta";
import "./EditarVideo.css";
import IframeVideo from "../../components/MostrarVideo/IframeVideo";
import Etiqueta from "../../components/Etiqueta";
import useEtiqueta from "../../hooks/Etiquetas/useEtiqueta";

export default function EditarVideo() {
    const { id: idVideo } = useParams<{ id: string }>();
    const id = idVideo ? Number(idVideo) : undefined;

    const { video, loading, error, actualizarVideo } = useVideoByIdVideo(Number(id));
    const { etiquetas } = useEtiqueta();
    const [tituloVideo, setTituloVideo] = useState("");
    const [etiquetasVideo, setEtiquetasVideo] = useState<TipoEtiqueta[]>([]);
    const [fechaPublicacion, setFechaPublicacion] = useState("");
    const [urlVideo, setUrlVideo] = useState("");
    const [personajeId, setPersonajeId] = useState<number | undefined>(undefined);
    const [filtrarEtiqueta, setFiltrarEtiqueta] = useState("");
    const [etiquetasSinAsignar, setEtiquetasSinAsignar] = useState<TipoEtiqueta[]>([]);
    const navigate = useNavigate();



    useEffect(() => {
        if (video) {
            setTituloVideo(video.titulo as string);
            setEtiquetasVideo(video.etiquetas as TipoEtiqueta[]);
            setFechaPublicacion(video.fechaPublicacion as string);
            setUrlVideo(video.url as string);
            setPersonajeId(video.personajeId);
            // Filtrar etiquetas que no están asignadas al video
            if (video.etiquetas) {
                const etiquetasAsignadas = video.etiquetas.map(e => e.nombre.toLowerCase());
                const etiquetasNoAsignadas = etiquetas.filter(e => !etiquetasAsignadas.includes(e.nombre.toLowerCase()));
                setEtiquetasSinAsignar(etiquetasNoAsignadas);
            }
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

    const handleCrearEtiqueta = () => {
        const nombre = filtrarEtiqueta.trim();
        if (nombre === "") return;

        if (etiquetasVideo.some(e => e.nombre.toLowerCase() === nombre.toLowerCase())) {
            setFiltrarEtiqueta("");
            return;
        }

        const nuevaEtiqueta: TipoEtiqueta = { nombre };
        setEtiquetasVideo((prev) => [...prev, nuevaEtiqueta]);
        setEtiquetasSinAsignar((prev) => prev.filter(e => e.nombre.toLowerCase() !== nombre.toLowerCase()));

        setFiltrarEtiqueta("");
    };

    const handleEliminarEtiqueta = (etiqueta: TipoEtiqueta) => {
        setEtiquetasVideo((prev) => prev.filter(e => e.nombre !== etiqueta.nombre));
    };

    const handlePlusClick = (etiqueta: TipoEtiqueta) => {
        if (etiquetasVideo.some(e => e.nombre.toLowerCase() === etiqueta.nombre.toLowerCase())) {
            setFiltrarEtiqueta("");
            return;
        }
        setEtiquetasVideo((prev) => [...prev, etiqueta]);
        setEtiquetasSinAsignar((prev) => prev.filter(e => e.nombre.toLowerCase() !== etiqueta.nombre.toLowerCase()));
    };

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

    //filtrar etiquetas
    const etiquetasAsignadasFiltradas = etiquetasVideo.filter((etiqueta) =>
        etiqueta.nombre.toLowerCase().includes(filtrarEtiqueta.toLowerCase())
    );

    const etiquetasSinAsignarFiltradas = etiquetasSinAsignar.filter((etiqueta) =>
        etiqueta.nombre.toLowerCase().includes(filtrarEtiqueta.toLowerCase())
    );

    return (
        <Form className="editarVideo-formulario" onSubmit={handleSubmit}>
            <div className="editarVideo-contenedorDatos">
                <section className="editarVideo-videoInfo">
                    <h2>Informacion del Video</h2>
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
                    <Tabs
                        defaultActiveKey="etiquetas"
                        id="editarVideo-etiquetas-tabs"
                        className="mb-3"
                    >

                        <Tab eventKey="etiquetas" title="Etiquetas asignadas">
                            <Form.Group className="mb-3">

                                <Form.Label className="editarVideo-label">
                                    Buscar o crear etiqueta
                                </Form.Label>
                                <div className="editarVideo-controlYboton-contenedor">
                                    <Form.Control
                                        type="text"
                                        value={filtrarEtiqueta}
                                        onChange={(e) => setFiltrarEtiqueta(e.target.value)}
                                    />
                                    <Button
                                        variant="primary"
                                        onClick={handleCrearEtiqueta}
                                        type="button"
                                    >
                                        <span className="editarVideo-controlYboton-btnTxt">Crear y agregar</span>
                                    </Button>
                                </div>
                                <h2>Etiquetas asignadas</h2>
                                <div className="editarVideo-contenedorEtiquetas">
                                    {etiquetasAsignadasFiltradas.map((etiqueta) => (
                                        <Etiqueta key={etiqueta.nombre} etiqueta={etiqueta} />
                                    ))}
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <h2>Etiquetas sin asignar</h2>
                                <div className="editarVideo-contenedorEtiquetas">
                                    {etiquetasSinAsignarFiltradas.map((etiqueta) => (
                                        <Etiqueta key={etiqueta.nombre} etiqueta={etiqueta} handlePlusClick={() => handlePlusClick(etiqueta)} />
                                    ))}
                                </div>
                            </Form.Group>

                        </Tab>
                        <Tab eventKey="eliminar" title="Eliminar Etiquetas">
                            <Form.Group className="mb-3">
                                <h2>Eliminar etiquetas</h2>
                                <Form.Label className="editarVideo-label">
                                    Selecciona etiquetas a eliminar
                                </Form.Label>
                                <Form.Control type="text" placeholder="Buscar etiqueta a eliminar" onChange={(e) => setFiltrarEtiqueta(e.target.value)} />
                            </Form.Group>
                            <div className="editarVideo-contenedorEtiquetas">
                                {etiquetasAsignadasFiltradas.map((etiqueta) => (
                                    <Etiqueta key={etiqueta.nombre} etiqueta={etiqueta} handleCrossClick={() => handleEliminarEtiqueta(etiqueta)} />
                                ))}
                            </div>
                        </Tab>
                    </Tabs>

                </section>
            </div>
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