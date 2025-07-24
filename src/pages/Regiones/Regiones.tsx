import { useRegiones } from "../../hooks/Regiones/useRegiones";
import Loading from "../../components/Loading";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import './Regiones.css';
import MostrarImagen from "../../components/MostrarImagen";

export default function Regiones() {
    const { regiones, loading, error, eliminarRegion } = useRegiones();
    const navigate = useNavigate();

    if (loading) return <Loading />;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <div className="contenedorDeRegiones">
                <Button variant="success" onClick={() => navigate("/regiones/crear")} className="btnAgregarRegion">Agregar Región</Button>
                {regiones.map((region) => (
                    <Row key={region.id} className="rowRegion">
                        <Col className="colNombre" >
                            <p className="nombreRegion">{region.nombre}</p>
                        </Col>
                        <Col className="colImagen" sm="auto">
                            <MostrarImagen src={region.imagenURL} alt={region.nombre} style={{ width: 75 }} />
                        </Col>
                        <Col className="colBtn">
                            <Button variant="primary" onClick={() => navigate(`/regiones/${region.id}/editar`)}>
                                Editar
                            </Button>
                        </Col>
                        <Col className="colBtn">
                            <Button variant="danger" onClick={() => eliminarRegion(region.id)}>
                                Eliminar
                            </Button>
                        </Col>
                    </Row>
                ))}
            </div >
        </>
    );
}