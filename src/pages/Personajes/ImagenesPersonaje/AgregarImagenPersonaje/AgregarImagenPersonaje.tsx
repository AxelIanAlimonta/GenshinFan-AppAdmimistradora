import ImagenesPersonaje from "../ImagenesPersonaje";
import { useNavigate, useParams } from "react-router";
import { Button, Form } from "react-bootstrap";
import type { ImagenPersonaje } from "../../../../types/ImagenPersonaje";
import useImagenesPersonajePorIdPersonaje from "../../../../hooks/Personajes/useImagenesPersonajePorIdPersonaje";
import MostrarImagen from "../../../../components/MostrarImagen";
import { useState } from "react";
import './AgregarImagenPersonaje.css';

export default function AgregarImagenPersonaje() {
    const id = Number(useParams().id);
    const { agregarImagen } = useImagenesPersonajePorIdPersonaje(id);
    const [nombre, setNombre] = useState<string>('');
    const [url, setUrl] = useState<string>('');

    const navigate = useNavigate();


    if (isNaN(id)) {
        throw new Error("ID del personaje no válido");
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!nombre || !url) {
            alert("Por favor, complete todos los campos.");
            return;
        }


        const nuevaImagen: ImagenPersonaje = {
            nombre,
            url,
            personajeId: id,
        };

        agregarImagen(nuevaImagen).then(() => {
            navigate(0);
        });

    }

    return (
        <div>
            <h2>Agregar Imagen de Personaje</h2>

            <Form onSubmit={handleSubmit} className="formulario">
                <Form.Group controlId="formImagenNombre" className="formulario-group">
                    <Form.Label>Nombre de la Imagen</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese el nombre de la imagen" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formImagenURL" className="formulario-group">
                    <Form.Label>URL de la Imagen</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese la URL de la imagen" value={url} onChange={(e) => setUrl(e.target.value)} />
                </Form.Group>

                {url !== '' && <MostrarImagen src={url} alt={nombre} width={350} />}

                <Form.Group className="formulario-botones">
                    <Button variant="success" type="submit">Agregar Imagen</Button>
                    <Button variant="secondary" onClick={() => navigate(-1)}>Volver</Button>
                </Form.Group>

            </Form>
            <h2>Imagenes agregadas</h2>
            <ImagenesPersonaje id={id} />
        </div>
    );
}  