import { useEffect, useState } from "react";
import { getTiposAnimacion } from "../../api/tipoAnimacionService";
import type { TipoAnimacion } from "../../types/TipoAnimacion";

export default function useTiposAnimacion() {
    const [tiposAnimacion, setTiposAnimacion] = useState<TipoAnimacion[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTiposAnimacion = async () => {
            try {
                const response = await getTiposAnimacion();
                setTiposAnimacion(response);
            } catch (err) {
                setError('Error al cargar los tipos de animación');
            } finally {
                setLoading(false);
            }
        };

        fetchTiposAnimacion();
    }, []);

    return { tiposAnimacion, loading, error };
}