import { Button, Col, Row, } from 'react-bootstrap';
import { useElementos } from '../../hooks/Elementos/useElementos';
import './Elementos.css';
import Loading from '../../components/Loading';
import { useNavigate } from 'react-router';
import MostrarImagen from '../../components/MostrarImagen';

export default function Elementos() {
    const { elementos, eliminarElemento, loading, error } = useElementos();
    const navigate = useNavigate();

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (<>

        <div className="contenedorDeElementos">
            <Button variant="success" onClick={() => navigate('/elementos/crear')} className='btnAgregarElemento'>
                Agregar Elemento
            </Button>
            {elementos.map((elemento) => (
                <Row key={elemento.id} className='rowElemento'>
                    <Col className="colNombre"  >
                        <p className="nombreElemento">{elemento.nombre}</p>
                    </Col>
                    <Col className='colIcono' sm="auto">
                        <MostrarImagen src={elemento.iconoURL} alt={elemento.nombre} />
                    </Col>
                    <Col className='colBtn'>
                        <Button variant="primary" onClick={() => navigate(`/elementos/${elemento.id}/editar`)}>
                            Editar
                        </Button>
                    </Col>
                    <Col className='colBtn'>
                        <Button variant="danger" onClick={() => eliminarElemento(elemento.id)}>
                            Eliminar
                        </Button>
                    </Col>
                </Row>
            ))}
        </div>
    </>
    );
}
