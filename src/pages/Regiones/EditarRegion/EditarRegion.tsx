import { useNavigate, useParams } from "react-router";
import type { Region } from "../../../types/Region";
import useRegionById from "../../../hooks/Regiones/useRegionById";
import Loading from "../../../components/Loading";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./EditarRegion.css";
import MostrarImagen from "../../../components/MostrarImagen";

export default function EditarRegion() {
    const idParam = useParams<{ id: string }>().id;
    const navigate = useNavigate();

    // Always call hooks in the same order
    const [nombre, setNombre] = useState("");
    const [imagenURL, setImagenURL] = useState("");

    if (!idParam) {
        return <div>Error: ID de la región no proporcionado</div>;
    }
    const id = parseInt(idParam);
    const { region, actualizarRegion, loading, error } = useRegionById(id);

    useEffect(() => {
        if (region) {
            setNombre(region.nombre);
            setImagenURL(region.imagenURL);
        }
    }, [region]);

    if (loading) return <Loading />;
    if (error) return <div>Error: {error}</div>;
    if (!region) return <div>Error: Región no encontrada</div>;

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const updatedRegion: Region = {
            id: id,
            nombre: formData.get("nombre") as string,
            imagenURL: formData.get("imagen") as string
        };

        actualizarRegion(updatedRegion);
        navigate("/regiones");
    }

    return (
        <>
            <h1>Editar Región</h1>
            <Form onSubmit={handleSubmit} className="formEditarRegion">
                <Form.Group controlId="formNombre" className="grupoFormulario">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        name="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formIcono" className="grupoFormulario">
                    <Form.Label>URL del Icono</Form.Label>
                    <Form.Control
                        type="text"
                        name="imagen"
                        value={imagenURL}
                        onChange={(e) => setImagenURL(e.target.value)}
                        required
                    />
                </Form.Group>

                <div className="contenedorImg">
                    <MostrarImagen src={imagenURL} alt="Icono de la región" />
                </div>

                <div className="contenedorBotones">
                    <Button variant="success" type="submit">
                        Guardar Cambios
                    </Button>
                    <Button variant="danger" onClick={() => navigate("/regiones")}>
                        Cancelar
                    </Button>
                </div>
            </Form>
        </>
    );
}