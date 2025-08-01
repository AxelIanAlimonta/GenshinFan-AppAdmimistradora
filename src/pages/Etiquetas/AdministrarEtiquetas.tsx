import Loading from "../../components/Loading";
import useEtiqueta from "../../hooks/Etiquetas/useEtiqueta";
import { Button, Form, FormGroup, Tab, Tabs } from "react-bootstrap";
import { act, useState } from "react";
import type { Etiqueta as TipoEtiqueta } from "../../types/Etiqueta";
import Etiqueta from "../../components/Etiqueta";
import './AdministrarEtiquetas.css';



export default function AdministrarEtiquetas() {
    const { etiquetas, loading, error, agregarEtiqueta, eliminarEtiqueta, actualizarEtiqueta } = useEtiqueta();
    const [nombreEtiqueta, setNombreEtiqueta] = useState("");
    const [buscadorEtiquetaParaEliminar, setBuscadorEtiquetaParaEliminar] = useState("");
    const [buscadorEtiquetaParaEditar, setBuscadorEtiquetaParaEditar] = useState("");
    const [etiquetaEditable, setEtiquetaEditable] = useState<TipoEtiqueta | null>(null);
    const [etiquetaEditableOriginal, setEtiquetaEditableOriginal] = useState<TipoEtiqueta | null>(null);

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


    function handleEditClick(etiqueta: TipoEtiqueta) {
        setEtiquetaEditable(etiqueta);
        setEtiquetaEditableOriginal(etiqueta);
    }

    function handleEditSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (etiquetaEditable) {
            actualizarEtiqueta(etiquetaEditable.id as number, etiquetaEditable).then(() => {
                setEtiquetaEditable(null);
                setBuscadorEtiquetaParaEditar("");
            }).catch((error) => {
                console.error("Error al actualizar la etiqueta:", error);
            });
        }
    }

    const etiquetasFiltradas = etiquetas.filter(etiqueta =>
        etiqueta.nombre.toLowerCase().includes(buscadorEtiquetaParaEliminar.toLowerCase())
    );

    const etiquetasParaEditarFiltradas = etiquetas.filter(etiqueta =>
        etiqueta.nombre.toLowerCase().includes(buscadorEtiquetaParaEditar.toLowerCase())
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
                            value={buscadorEtiquetaParaEliminar}
                            onChange={(e) => setBuscadorEtiquetaParaEliminar(e.target.value)}
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
                <Tab eventKey="editar" title="Editar Etiquetas">
                    <Form.Group className="mb-3">
                        <Form.Label>Buscar Etiqueta</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Buscar por nombre"
                            value={buscadorEtiquetaParaEditar}
                            onChange={(e) => setBuscadorEtiquetaParaEditar(e.target.value)}
                        />
                    </Form.Group>
                    {!etiquetaEditable && (
                        <p>Seleccione una etiqueta para editar</p>
                    )}
                    {etiquetaEditable && (
                        <Form onSubmit={(e) => handleEditSubmit(e)}>
                            <FormGroup controlId="formEtiquetaEditar">
                                <Form.Label>Editando etiqueta: <Etiqueta etiqueta={etiquetaEditableOriginal as TipoEtiqueta} /></Form.Label>
                                <div className="editandoEtiqueta-textoYboton">
                                    <Form.Control
                                        type="text"
                                        value={etiquetaEditable?.nombre}
                                        onChange={(e) => setEtiquetaEditable({ ...etiquetaEditable, nombre: e.target.value })}
                                        required
                                        className="editandoEtiqueta-texto"
                                    />
                                    <Button variant="primary" type="submit" className="editandoEtiqueta-boton">
                                        Guardar Cambios
                                    </Button>
                                    <Button variant="secondary" onClick={() => setEtiquetaEditable(null)}>
                                        Cancelar
                                    </Button>
                                </div>
                            </FormGroup>
                        </Form>
                    )}

                    <div className="contenedorDeEtiquetas">
                        {etiquetasParaEditarFiltradas.map((etiqueta) => (
                            <Etiqueta
                                key={etiqueta.id}
                                etiqueta={etiqueta}
                                handleEditClick={() => handleEditClick(etiqueta)}
                            />
                        ))}
                    </div>
                </Tab>
            </Tabs>

        </div>
    );
}
