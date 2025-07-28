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
                    <div key={personaje.id} className='personaje-item'>
                        <MostrarImagen src={personaje.avatarURL} alt={personaje.nombre} style={{ width: 75 }} />
                        <h3 className='personaje-nombre'>{personaje.nombre}</h3>
                        <Button variant="success" onClick={() => navigate(`/personajes/${personaje.id}/editar`)}>Editar</Button>
                        <Button variant="danger" onClick={() => deletePersonaje(personaje.id)}>Eliminar</Button>
                    </div>
                ))}
            </div>
        </main>
    </>);
}