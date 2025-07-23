import AgregarAnimacionPersonaje from '../Personajes/AnimacionesPersonaje/AgregarAnimacionPersonaje/AgregarAnimacionPersonaje';
import './Prueba.css';
import { useNavigate } from 'react-router';

export default function Prueba() {

    const navigate = useNavigate();

    return (
        <div>
            <h1>Prueba de Videos de Personaje</h1>
            <AgregarAnimacionPersonaje  />


        </div>
    );
}

