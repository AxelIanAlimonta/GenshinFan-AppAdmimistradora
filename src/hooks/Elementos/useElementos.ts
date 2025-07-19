import { useEffect, useState } from "react";
import { getElementos, createElemento, deleteElemento, getElementoById, updateElemento } from "../../api/elementoService";
import type { Elemento } from "../../types/Elemento";

export function useElementos() {
    const [elementos, setElementos] = useState<Elemento[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchElementos = async () => {
            try {
                const data = await getElementos();
                setElementos(data);
            } catch (e) {
                setError("Error al obtener los elementos");
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        fetchElementos();
    }, []);

    const agregarElemento = async (elemento: Elemento) => {
        try {
            const newElemento = await createElemento(elemento);
            setElementos((prev) => [...prev, newElemento]);
        } catch (e) {
            setError("Error al crear el elemento");
            console.error(e);
        }
    };

    const actualizarElemento = async (id: number, elemento: Elemento) => {
        try {
            const updatedElemento = await updateElemento(id, elemento);
            setElementos((prev) => prev.map((el) => (el.id === id ? updatedElemento : el)));
        } catch (e) {
            setError("Error al actualizar el elemento");
            console.error(e);
        }
    };

    const eliminarElemento = async (id: number | undefined) => {
        if (id === undefined) {
            setError("ID del elemento no definido");
            return;
        }
        try {
            await deleteElemento(id);
            setElementos((prev) => prev.filter((el) => el.id !== id));
        } catch (e) {
            setError("Error al eliminar el elemento");
            console.error(e);
        }
    };

    const obtenerElementoPorId = async (id: number) => {
        try {
            return await getElementoById(id);
        } catch (e) {
            setError("Error al obtener el elemento por ID");
            console.error(e);
            return null;
        }
    };

    return { elementos, loading, error, agregarElemento, actualizarElemento, eliminarElemento, obtenerElementoPorId };
}