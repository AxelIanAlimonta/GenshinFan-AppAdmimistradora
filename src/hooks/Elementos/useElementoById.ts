import { useEffect, useState } from "react";
import { getElementoById, updateElemento } from "../../api/elementoService";
import type { Elemento } from "../../types/Elemento";

export function useElementoById(id: number) {
    const [elemento, setElemento] = useState<Elemento | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchElemento = async () => {
            try {
                const data = await getElementoById(id);
                setElemento(data);
            } catch (e) {
                setError("Error al obtener el elemento");
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        fetchElemento();
    }, [id]);

    // Function to update the elemento state
    const actualizarElemento = async (elementoActualizado: Elemento) => {
        try {
            const updated = await updateElemento(id, elementoActualizado);
            setElemento((prev) => (prev ? { ...prev, ...updated } : null));
        } catch (error) {
            setError("Error al actualizar el elemento");
            console.error(error);
        }
    };

    return { elemento, loading, error, actualizarElemento };
}
