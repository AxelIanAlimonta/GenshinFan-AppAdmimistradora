import './AgregarAnimacionPersonaje.css';
import type { Animacion } from '../../../../types/Animacion';
import Loading from '../../../../components/Loading';
import type { TipoAnimacion } from '../../../../types/TipoAnimacion';
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router';
import { useState } from 'react';
import useTiposAnimacion from '../../../../hooks/Personajes/useTiposAnimacion';
import useAnimacionesPersonajePorIdPersonaje from '../../../../hooks/Personajes/useAnimacionesPersonajePorIdPersonaje';
import MostrarAnimacionesPersonaje from '../MostrarAnimacionesPersonaje/MostrarAnimacionesPersonaje';
import MostrarImagen from '../../../../components/MostrarImagen';


export default function AgregarAnimacionPersonaje() {

    const idPersonaje = Number(useParams().id);
    const navigate = useNavigate();

    const [url, setUrl] = useState('');
    const [tipoAnimacionId, setTipoAnimacionId] = useState<number | undefined>(undefined);

    const { tiposAnimacion, loading, error } = useTiposAnimacion();
    const { animaciones, loading: loadingAnimaciones, error: errorAnimaciones, agregarAnimacion, eliminarAnimacion } = useAnimacionesPersonajePorIdPersonaje(idPersonaje);

    if (isNaN(idPersonaje)) {
        return <p className='error'>ID del personaje no válido</p>;
    }

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <p className='error'>Error al cargar los tipos de animación: {error}</p>;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!url && !tipoAnimacionId) {
            return alert('Por favor, complete todos los campos.');
        }

        const nuevaAnimacion: Animacion = {
            url,
            personajeId: idPersonaje,
            tipoAnimacionId
        };

        try {
            await agregarAnimacion(nuevaAnimacion);
            setUrl('');
            setTipoAnimacionId(undefined);
            
        } catch (error) {
            console.error('Error al agregar la animación:', error);
            alert('Error al agregar la animación. Por favor, inténtelo de nuevo más tarde.');
        }

    };


    return (<>

        <Form onSubmit={handleSubmit} className='formulario'>

            <Form.Group controlId="formTipoAnimacion" className='formulario-grupo'>
                <Form.Label className='formulario-grupo-label'>Tipo de Animación</Form.Label>
                <Form.Select
                    value={tipoAnimacionId ?? ''}
                    onChange={(e) => setTipoAnimacionId(Number(e.target.value))}
                >
                    <option value="">Seleccione un tipo de animación</option>
                    {tiposAnimacion.map((tipo: TipoAnimacion) => (
                        <option key={tipo.id} value={tipo.id}>
                            {tipo.nombre}
                        </option>
                    ))}
                </Form.Select>

            </Form.Group>

            <Form.Group controlId="formUrl" className='formulario-grupo'>
                <Form.Label className='formulario-grupo-label'>URL de la animación</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Ingrese la URL de la animación"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    style={{ marginBottom: '10px' }}
                />

                {url!='' && <MostrarImagen src={url} alt={`Animación ${tiposAnimacion.find(tipo => tipo.id === tipoAnimacionId)?.nombre}`} width={300} />}
            </Form.Group>




            <Form.Group className='contenedor-botones'>
                <Button type="submit">Agregar Animación</Button>
                <Button variant="secondary" onClick={() => navigate(-1)}>Volver al personaje</Button>
            </Form.Group>

        </Form>
        <h2>Animaciones ya cargadas</h2>
        <MostrarAnimacionesPersonaje animaciones={animaciones} loading={loadingAnimaciones} error={errorAnimaciones} eliminarAnimacion={eliminarAnimacion} />
    </>
    );
}