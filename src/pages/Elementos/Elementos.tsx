import { Button, Col, Row, Spinner } from 'react-bootstrap';
import { useElementos } from '../../hooks/useElementos';
import './Elementos.css';
import Loading from '../../components/Loadint';

export default function Elementos() {
    const { elementos, eliminarElemento, loading, error } = useElementos();

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (<>

        <h1>Elementos</h1>
        <div className="contenedorDeElementos">
            {elementos.map((elemento) => (
                <Row key={elemento.id} className='rowElemento'>
                    <Col className="colNombre"  >
                        <h2>{elemento.nombre}</h2>
                    </Col>
                    <Col className='colIcono' sm="auto">
                        <img src={elemento.iconoURL} alt={elemento.nombre} />
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
