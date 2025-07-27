import Loading from "../../components/Loading";
import useEtiqueta from "../../hooks/Etiquetas/useEtiqueta";
import { Button, Form, FormGroup, Tab, Tabs } from "react-bootstrap";
import { useState } from "react";
import type { Etiqueta as TipoEtiqueta } from "../../types/Etiqueta";
import Etiqueta from "../../components/Etiqueta";
import './AdministrarEtiquetas.css';



export default function AdministrarEtiquetas() {
    const { etiquetas, loading, error, agregarEtiqueta, eliminarEtiqueta } = useEtiqueta();
    const [nombreEtiqueta, setNombreEtiqueta] = useState("");
    const [buscadorEtiqueta, setBuscadorEtiqueta] = useState("");

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!etiquetas || etiquetas.length === 0) {
        return <p>No hay etiquetas disponibles.</p>;
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const nuevaEtiqueta: TipoEtiqueta = {
            nombre: nombreEtiqueta,
        }
        agregarEtiqueta(nuevaEtiqueta);
        setNombreEtiqueta("");
    }

    const etiquetasFiltradas = etiquetas.filter(etiqueta =>
        etiqueta.nombre.toLowerCase().includes(buscadorEtiqueta.toLowerCase())
    );


    return (

        <div className="administrar-etiquetas">
            <h1>Administrar Etiquetas</h1>
            <Tabs
                defaultActiveKey="agregar"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="agregar" title="Agregar Etiquetas">
                    <Form onSubmit={handleSubmit}>
                        <FormGroup controlId="formEtiqueta">
                            <Form.Label>Nombre de la Etiqueta</Form.Label>
                            <Form.Control type="text" name="nombre" placeholder="Ingrese el nombre de la etiqueta" required value={nombreEtiqueta} onChange={(e) => setNombreEtiqueta(e.target.value)} />
                            <Button variant="primary" type="submit" className="mt-2">
                                Agregar Etiqueta
                            </Button>
                        </FormGroup>
                        <p>Etiquetas disponibles:</p>
                        <div className="contenedorDeEtiquetas">
                            {etiquetas.map((etiqueta) => (
                                <Etiqueta
                                    key={etiqueta.id}
                                    etiqueta={etiqueta}
                                />
                            ))}
                        </div>
                    </Form>
                </Tab>
                <Tab eventKey="eliminar" title="Eliminar Etiquetas">
                    <Form.Group className="mb-3">
                        <Form.Label>Buscar Etiqueta</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Buscar por nombre"
                            value={buscadorEtiqueta}
                            onChange={(e) => setBuscadorEtiqueta(e.target.value)}
                        />
                    </Form.Group>
                    <p>Lista de Etiquetas</p>
                    <div className="contenedorDeEtiquetas">
                        {etiquetasFiltradas.map((etiqueta) => (
                            <Etiqueta
                                key={etiqueta.id}
                                etiqueta={etiqueta}
                                handleCrossClick={() => eliminarEtiqueta(etiqueta.id as number)}
                            />
                        ))}
                    </div>
                </Tab>
            </Tabs>

        </div>
    );
}
