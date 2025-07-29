import { Button } from 'react-bootstrap';
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

        <div className="elementos-contenedorPrincipal">
            <Button variant="success" onClick={() => navigate('/elementos/crear')} className='btnAgregarElemento'>
                Agregar Elemento
            </Button>
            <div className="elementos-contenedorDeItems">
                {elementos.map((elemento) => (
                    <div key={elemento.id} className='elementoItem'>
                        <p className="nombreElemento">{elemento.nombre}</p>
                        <MostrarImagen src={elemento.iconoURL} alt={elemento.nombre} style={{ width: 60 }} />
                        <Button variant="primary" onClick={() => navigate(`/elementos/${elemento.id}/editar`)}>
                            Editar
                        </Button>
                        <Button variant="danger" onClick={() => eliminarElemento(elemento.id)}>
                            Eliminar
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    </>
    );
}
