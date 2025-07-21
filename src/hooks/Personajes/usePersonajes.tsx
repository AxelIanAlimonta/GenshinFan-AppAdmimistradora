import { useEffect, useState } from "react";
import { getPersonajes, deletePersonaje as del, createPersonaje as create } from "../../api/personajeService";
import type { Personaje } from "../../types/Personaje";

const usePersonajes = () => {
    const [personajes, setPersonajes] = useState<Personaje[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPersonajes = async () => {
            try {
                const data = await getPersonajes();
                setPersonajes(data);
            } catch (error) {
                setError("Error fetching personajes");
            } finally {
                setLoading(false);
            }
        };

        fetchPersonajes();
    }, []);

    async function createPersonaje(newPersonaje: Personaje) {
        try {
            const createdPersonaje = await create(newPersonaje);
            setPersonajes((prev) => [...prev, createdPersonaje]);
        } catch (error) {
            setError("Error creating personaje");
        }
    }

    async function deletePersonaje(id: number | undefined) {
        if (id === undefined) {
            setError("ID del personaje no definido");
            return;
        }
        try {
            await del(id);
            setPersonajes((prev) => prev.filter((p) => p.id !== id));
        } catch (error) {
            setError("Error deleting personaje");
        }
    }

    return { personajes, loading, error, deletePersonaje, createPersonaje };
};

export default usePersonajes;
