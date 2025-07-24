import { useNavigate } from 'react-router';
import useAnimacionesPersonajePorIdPersonaje from '../../hooks/Personajes/useAnimacionesPersonajePorIdPersonaje';
import AgregarAnimacionPersonaje from '../Personajes/AnimacionesPersonaje/AgregarAnimacionPersonaje/AgregarAnimacionPersonaje';
import './Prueba.css';

export default function Prueba() {

    const navigate = useNavigate();

    return (
        <div>
            <h1>Prueba de Videos de Personaje</h1>

            <button onClick={() => navigate('/personajes/animaciones-personaje/10/agregar')}>Ir a agregar animacion</button>

        </div>
    );
}

