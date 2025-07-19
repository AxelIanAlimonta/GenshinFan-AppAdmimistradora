import { useState } from "react";
import { Button, Form, FormGroup } from "react-bootstrap";
import { useNavigate } from "react-router";
import { createElemento } from '../../../api/elementoService'
import type { Elemento } from '../../../types/Elemento';
import './CrearElemento.css';
import MostrarImagen from "../../../components/MostrarImagen";

export default function CrearElemento() {

    const [nombre, setNombre] = useState<string>('');
    const [iconoURL, setIconoURL] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!nombre && !iconoURL) {
            return;
        }
        const nuevoElemento: Elemento = {
            nombre,
            iconoURL
        };

        createElemento(nuevoElemento)
            .then(() => {
                navigate('/elementos');
            })
            .catch((error) => {
                console.error("Error al crear el elemento:", error);
                alert("Hubo un error al crear el elemento. Por favor, inténtelo de nuevo.");
            });
    };

    return (
        <>
            <h3>Crear Nuevo Elemento</h3>
            <Form onSubmit={handleSubmit} className="formulario">
                <Form.Group controlId="formNombre" className="grupoFormulario">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese el nombre del elemento" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formIconoURL" className="grupoFormulario">
                    <Form.Label>URL del Icono</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese la URL del icono" value={iconoURL} onChange={(e) => setIconoURL(e.target.value)} />
                </Form.Group>
                <MostrarImagen src={iconoURL} alt={nombre} />
                <FormGroup className="grupoFormularioBotones">
                    <Button type="submit" variant="success">Crear Elemento</Button>
                    <Button variant="danger" onClick={() => navigate('/elementos')}>Cancelar</Button>
                </FormGroup>



            </Form>
        </>
    );
}
