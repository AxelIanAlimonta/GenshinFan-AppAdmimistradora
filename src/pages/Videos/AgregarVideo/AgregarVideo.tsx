import { useState } from "react";
import useVideos from "../../../hooks/Videos/useVideos";
import { Button, Form } from "react-bootstrap";
import MostrarVideo from "../../../components/MostrarVideo/MostrarVideo";
import { useNavigate } from "react-router";
import "./AgregarVideo.css";

export default function AgregarVideo() {
    const { agregarVideo } = useVideos();

    const [titulo, setTitulo] = useState("");
    const [url, setUrl] = useState("");
    const [fechaPublicacion, setFechaPublicacion] = useState("");
    const navigate = useNavigate();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!titulo || !url || !fechaPublicacion) {
            return;
        }
        agregarVideo({ titulo, url, fechaPublicacion });
        navigate("/videos");

    }


    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formVideoTitle">
                <Form.Label>Título</Form.Label>
                <Form.Control type="text" placeholder="Ingrese el título" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
            </Form.Group>

            <Form.Group controlId="formVideoUrl" className="mb-3">
                <Form.Label>URL</Form.Label>
                <Form.Control type="url" placeholder="Ingrese la URL" value={url} onChange={(e) => setUrl(e.target.value)} required />
            </Form.Group>
            <MostrarVideo video={{ titulo, url, fechaPublicacion }} />

            <Form.Group controlId="formVideoFechaPublicacion">
                <Form.Label>Fecha de Publicación</Form.Label>
                <Form.Control type="date" value={fechaPublicacion} onChange={(e) => setFechaPublicacion(e.target.value)} required />
            </Form.Group>

            <div className="agregarVideo-contenedorDeBotones">
                <Button type="submit">Agregar Video</Button>
                <Button variant="secondary" onClick={() => navigate("/videos")}>Cancelar</Button>
            </div>
        </Form>
    );
}