import { useState } from "react";
import { useNavigate } from "react-router";
import { createRegion } from "../../../api/regionService";
import type { Region } from "../../../types/Region";
import { Button, Form } from "react-bootstrap";
import MostrarImagen from "../../../components/MostrarImagen";
import './CrearRegion.css';

export default function CrearRegion() {
    const [nombre, setNombre] = useState<string>('');
    const [imagenURL, setImagenURL] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!nombre && !imagenURL) {
            return;
        }

        const nuevaRegion: Region = {
            nombre,
            imagenURL
        };

        createRegion(nuevaRegion)
            .then(() => {
                navigate('/regiones');
            })
            .catch((error) => {
                console.error("Error al crear la región:", error);
            });
    }

    return (
        <>
            <h3>Crear Nueva Región</h3>
            <Form onSubmit={handleSubmit} className="formulario">
                <Form.Group controlId="formNombre" className="grupoFormulario">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese el nombre de la región"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formImagenURL" className="grupoFormulario">
                    <Form.Label>URL de la Imagen</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese la URL de la imagen"
                        value={imagenURL}
                        onChange={(e) => setImagenURL(e.target.value)}
                    />
                </Form.Group>
                <MostrarImagen src={imagenURL} alt={nombre} />

                <Form.Group className="grupoFormularioBotones">
                    <Button type="submit" variant="success">Crear Región</Button>
                    <Button variant="danger" onClick={() => navigate('/regiones')}>Cancelar</Button>
                </Form.Group>

            </Form>
        </>
    );
}