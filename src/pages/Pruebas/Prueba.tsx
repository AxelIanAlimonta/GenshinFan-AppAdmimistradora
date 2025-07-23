import { Button } from 'react-bootstrap';
import VideosPersonaje from '../Personajes/VideosPersonaje/VideosPersonaje';
import './Prueba.css';
import { useNavigate } from 'react-router';

export default function Prueba() {

    const navigate = useNavigate();

    return (
        <div>
            <h1>Prueba de Videos de Personaje</h1>

            <Button onClick={() => navigate('/personajes/videos-personaje/10/agregar')}>Agregar Video</Button>
            <VideosPersonaje id={10} />
        </div>
    );
}

