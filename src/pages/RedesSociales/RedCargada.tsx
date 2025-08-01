import { Button, Form } from "react-bootstrap";
import type { RedSocial } from "../../types/RedSocial";
import { useEffect, useState } from "react";
import "./RedCargada.css";

export default function RedCargada({ red, eliminar, actualizar }: { red: RedSocial, eliminar: () => void, actualizar: (id: number, nuevaRed: RedSocial) => void }) {
    const [redNombre, setRedNombre] = useState<string | undefined>(undefined);
    const [redUrl, setRedUrl] = useState<string | undefined>(undefined);
    const [redIconoUrl, setRedIconoUrl] = useState<string | undefined>(undefined);
    const [editable, setEditable] = useState<boolean>(false);

    useEffect(() => {
        setRedNombre(red.nombre);
        setRedUrl(red.url);
        setRedIconoUrl(red.iconoUrl);
    }, [red]);

    const handleActualizar = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (redNombre && redUrl && redIconoUrl) {
            const nuevaRed: RedSocial = {
                ...red,
                nombre: redNombre,
                url: redUrl,
                iconoUrl: redIconoUrl
            };
            actualizar(red.id as number, nuevaRed);
            setEditable(false);
        }

    };

    if (editable) {
        return (
            <div className="redCargada-container">
                <img src={redIconoUrl} alt={`${redNombre} icon`} className="redCargada-icon" />
                <div className="redCargada-inputs">

                    <Form.Group>
                        <Form.Label>Nombre de la Red Social</Form.Label>
                        <Form.Control type="text" value={redNombre} onChange={(e) => setRedNombre(e.target.value)} />
                    </Form.Group>

                    <Form.Group >
                        <Form.Label>URL del Icono</Form.Label>
                        <Form.Control type="text" value={redIconoUrl} onChange={(e) => setRedIconoUrl(e.target.value)} />
                    </Form.Group>

                    <Form.Group >
                        <Form.Label>URL de la Red Social</Form.Label>
                        <Form.Control type="text" value={redUrl} onChange={(e) => setRedUrl(e.target.value)} />
                    </Form.Group>
                </div>
                <div className="redCargada-botonesEdicion">
                    <Button variant="primary" type="submit">Guardar</Button>
                    <Button variant="secondary" onClick={() => setEditable(false)} type="button">Cancelar</Button>
                </div>
            </div>
        );
    }

    return (
        <Form className="redCargada-container" onSubmit={handleActualizar}>
            <img src={redIconoUrl} alt={`${redNombre} icon`} className="redCargada-icon" />
            <h2 className="redCargada-nombre">{redNombre}</h2>
            <div className="redCargada-botones">
                <button type="button" onClick={() => setEditable(true)}><img src="/images/editar.png" alt="btn-edit" /></button>
                <button type="button" onClick={eliminar}><img src="/images/borrar.png" alt="btn-delete" /></button>
            </div>
        </Form>
    );
}