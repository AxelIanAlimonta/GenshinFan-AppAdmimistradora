import { useElementoById } from "../../../hooks/Elementos/useElementoById";
import Loading from "../../../components/Loading";
import MostrarImagen from "../../../components/MostrarImagen";
import type { Elemento } from "../../../types/Elemento";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import "./EditarElemento.css";
import { useEffect, useState } from "react";

export default function EditarElemento() {
    const idParam = useParams<{ id: string }>().id;

    if (!idParam) {
        return <div>Error: ID del elemento no proporcionado</div>;
    }

    const id = parseInt(idParam);
    const { elemento, actualizarElemento, loading, error } = useElementoById(id);

    const [nombre, setNombre] = useState("");
    const [iconoURL, setIconoURL] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (elemento) {
            setNombre(elemento.nombre);
            setIconoURL(elemento.iconoURL);
        }
    }, [elemento]);

    if (loading) {
        return <Loading />;
    }

    if (error || !elemento) {
        return <div>Error: {error}</div>;
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const updatedElemento: Elemento = {
            id: id,
            nombre: formData.get("nombre") as string,
            iconoURL: formData.get("imagen") as string
        };

        actualizarElemento(updatedElemento);
        navigate("/elementos");

    }

    return (<>

        <h1>Editar Elemento</h1>
        <Form onSubmit={handleSubmit} className="formEditarElemento">
            <Form.Group controlId="formNombre" className="grupoFormulario">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" name="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            </Form.Group>

            <Form.Group controlId="formImagen" className="grupoFormulario">
                <Form.Label>ImagenURL</Form.Label>
                <Form.Control type="text" name="imagen" value={iconoURL} onChange={(e) => setIconoURL(e.target.value)} required />
            </Form.Group>
            <MostrarImagen src={iconoURL} alt={nombre} />

            <div className="contenedorBotones">
                <Button type="submit" variant="success">Actualizar Elemento</Button>
                <Button variant="danger" onClick={() => navigate("/elementos")}>Cancelar</Button>
            </div>
        </Form>
    </>
    );
}
