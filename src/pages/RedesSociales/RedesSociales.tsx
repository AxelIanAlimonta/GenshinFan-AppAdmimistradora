import { useState } from "react";
import useRedesSociales from "../../hooks/RedesSociales/useRedesSociales";
import RedCargada from "./RedCargada";
import type { RedSocial } from "../../types/RedSocial";
import { Button, Form, Tab, Tabs } from "react-bootstrap";
import "./RedesSociales.css";
import MostrarImagen from "../../components/MostrarImagen";


export default function RedesSociales() {
    const [nobreNuevaRed, setNombreNuevaRed] = useState("");
    const [iconoUrlNuevaRed, setIconoUrlNuevaRed] = useState("");
    const [urlNuevaRed, setUrlNuevaRed] = useState("");

    const { redesSociales, crearRedSocial, actualizarRedSocial, eliminarRedSocial, obtenerRedSocialPorId } = useRedesSociales();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const nuevaRed: RedSocial = {
            nombre: nobreNuevaRed,
            iconoUrl: iconoUrlNuevaRed,
            url: urlNuevaRed
        };
        crearRedSocial(nuevaRed);
        setNombreNuevaRed("");
        setIconoUrlNuevaRed("");
        setUrlNuevaRed("");
    };

    return (
        <div>
            <h1>Redes Sociales</h1>
            <Tabs defaultActiveKey="listar" id="redes-sociales-tabs">
                <Tab eventKey="listar" title="Listar Redes Sociales">
                    <ul className="redesSociales-list">
                        {redesSociales.map(red => (
                            <RedCargada red={red} key={red.id} eliminar={() => eliminarRedSocial(red.id)} actualizar={actualizarRedSocial} />
                        ))}
                    </ul>
                </Tab>
                <Tab eventKey="crear" title="Crear Red Social">
                    <Form onSubmit={handleSubmit} className="redesSociales-form">
                        <Form.Group className="redesSociales-form-group">
                            <Form.Label>Nombre de la Red Social</Form.Label>
                            <Form.Control type="text" value={nobreNuevaRed} onChange={(e) => setNombreNuevaRed(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="redesSociales-form-group">
                            <Form.Label>URL de la Red Social</Form.Label>
                            <Form.Control type="text" value={urlNuevaRed} onChange={(e) => setUrlNuevaRed(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="redesSociales-form-group">
                            <Form.Label>URL del Icono</Form.Label>
                            <Form.Control type="text" value={iconoUrlNuevaRed} onChange={(e) => setIconoUrlNuevaRed(e.target.value)} />
                        </Form.Group>
                        <MostrarImagen src={iconoUrlNuevaRed} alt="Icono de la Red Social" style={{ width: "70px" }} />
                        <Button type="submit">Agregar Red Social</Button>
                    </Form>
                </Tab>
            </Tabs>

        </div>
    );
}
