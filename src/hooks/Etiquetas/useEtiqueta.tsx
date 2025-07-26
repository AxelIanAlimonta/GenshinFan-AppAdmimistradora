import type { Etiqueta } from "../../types/Etiqueta";
import { createEtiqueta, deleteEtiqueta, getEtiquetas, updateEtiqueta } from '../../api/etiquetaService'
import { useEffect, useState } from "react";

export default function useEtiqueta() {
    const [etiquetas, setEtiquetas] = useState<Etiqueta[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEtiquetas = async () => {
            try {
                setLoading(true);
                const fetchedEtiquetas = await getEtiquetas();
                setEtiquetas(fetchedEtiquetas);
            } catch (error) {
                console.error("Error fetching etiquetas:", error);
                setError("Error fetching etiquetas");
            } finally {
                setLoading(false);
            }
        };
        fetchEtiquetas();
    }, []);

    const agregarEtiqueta = async (etiqueta: Etiqueta) => {
        try {
            const newEtiqueta = await createEtiqueta(etiqueta);
            setEtiquetas((prev) => [...prev, newEtiqueta]);
        } catch (error) {
            console.error("Error adding etiqueta:", error);
            setError("Error adding etiqueta");
        }
    };

    const eliminarEtiqueta = async (id: number) => {
        try {
            await deleteEtiqueta(id);
            setEtiquetas((prev) => prev.filter((et) => et.id !== id));
        } catch (error) {
            console.error("Error deleting etiqueta:", error);
            setError("Error deleting etiqueta");
        }
    };

    const actualizarEtiqueta = async (id: number, etiqueta: Etiqueta) => {
        try {
            const updatedEtiqueta = await updateEtiqueta(etiqueta);
            setEtiquetas((prev) =>
                prev.map((et) => (et.id === id ? updatedEtiqueta : et))
            );
        } catch (error) {
            console.error("Error updating etiqueta:", error);
            setError("Error updating etiqueta");
        }
    };

    return {
        etiquetas,
        loading,
        error,
        agregarEtiqueta,
        eliminarEtiqueta,
        actualizarEtiqueta
    };
}


