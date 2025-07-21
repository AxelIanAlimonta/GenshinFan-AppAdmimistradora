import './Personajes.css';
import type { Personaje } from '../../types/Personaje';
import usePersonajes from '../../hooks/Personajes/usePersonajes';
import { Button, Col, Row } from 'react-bootstrap';
import MostrarImagen from '../../components/MostrarImagen';
import Loading from '../../components/Loading';
import { useNavigate } from 'react-router';


export default function Personajes() {

    const { personajes, loading, deletePersonaje } = usePersonajes();
    const navigate = useNavigate();

    if (loading) {
        return <Loading />;
    }

    return (<>
        <main>
            <Button variant="success" className="mb-3" onClick={() => navigate('/personajes/crear')}>
                Agregar Personaje
            </Button>

            <div className="contenedorDePersonajes">
                {personajes.map((personaje: Personaje) => (
                    <Row key={personaje.id} className='personaje-item'>
                        <Col><MostrarImagen src={personaje.avatarURL} alt={personaje.nombre} /></Col>
                        <Col className='personaje-nombre'><p>{personaje.nombre}</p></Col>
                        <Col><Button variant="success" onClick={() => navigate(`/personajes/${personaje.id}/editar`)}>Editar</Button></Col>
                        <Col><Button variant="danger" onClick={() => deletePersonaje(personaje.id)}>Eliminar</Button></Col>
                    </Row>
                ))}
            </div>
        </main>
    </>);
}