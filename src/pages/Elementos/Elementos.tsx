import { useEffect, useState } from 'react';
import type { Elemento } from '../../types/Elemento.js';
import { getElementos } from '../../api/elementoService.js';

export default function Elementos() {
    const [elementos, setElementos] = useState<Elemento[]>([]);

    useEffect(() => {
        const fetchElementos = async () => {
            const data = await getElementos();
            setElementos(data);
        };
        fetchElementos();
    }, []);

    return (
        <div>
            <h1>Elementos</h1>
            {elementos.map((elemento) => (
                <div key={elemento.id}>
                    <h2>{elemento.nombre}</h2>
                    <img src={elemento.iconoURL} alt={elemento.nombre} />
                </div>
            ))}
        </div>
    );
}
