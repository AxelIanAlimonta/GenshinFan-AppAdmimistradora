import './Personajes.css';
import type { Personaje } from '../../types/Personaje';
import usePersonajes from '../../hooks/Personajes/usePersonajes';
import { Button, Col, FloatingLabel, FormControl, Row } from 'react-bootstrap';
import MostrarImagen from '../../components/MostrarImagen';
import Loading from '../../components/Loading';
import { useNavigate } from 'react-router';
import { useState } from 'react';


export default function Personajes() {

    const { personajes, loading, deletePersonaje } = usePersonajes();
    const navigate = useNavigate();
    const [busqueda, setBusqueda] = useState('');

    if (loading) {
        return <Loading />;
    }


    // Ordenar personajes por nombre, los nombres podrían ser undefined
    const personajesOrdenados = [...personajes].sort((a: Personaje, b: Personaje) => {
        const nombreA = a.nombre?.toLowerCase() || '';
        const nombreB = b.nombre?.toLowerCase() || '';
        return nombreA.localeCompare(nombreB);
    });

    const personajesFiltrados = personajesOrdenados.filter((personaje: Personaje) =>
        personaje.nombre?.toLowerCase().includes(busqueda.toLowerCase())
    );


    return (<>
        <main>

            <div className="personajes-agregarYbuscador-contenedor">
                <Button variant="success" className="mb-3" onClick={() => navigate('/personajes/crear')}>
                    Agregar Personaje
                </Button>
                <FloatingLabel className="mb-3" controlId="floatingInput" label="Buscar personaje">
                    <FormControl
                        type="text"
                        placeholder="Buscar personaje"
                        className="mb-3"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </FloatingLabel>
            </div>

            <div className="contenedorDePersonajes">
                {personajesFiltrados.map((personaje: Personaje) => (
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