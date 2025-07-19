import type { Personaje } from '../../types/Personaje';
import { getPersonajeById, updatePersonaje, deletePersonaje } from '../../api/personajeService';
import { useEffect, useState } from 'react';

export default function usePersonajeById(id: number) {
    const [personaje, setPersonaje] = useState<Personaje | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPersonaje = async () => {
            try {
                const data = await getPersonajeById(id);
                setPersonaje(data);
            } catch (error) {
                setError("Error fetching personaje");
            } finally {
                setLoading(false);
            }
        };

        fetchPersonaje();
    }, [id]);

    async function editarPersonaje(updatedPersonaje: Personaje) {
        try {
            const data = await updatePersonaje(id, updatedPersonaje);
            setPersonaje(data);
        } catch (error) {
            setError("Error updating personaje");
        }
    }

    async function eliminarPersonaje() {
        try {
            await deletePersonaje(id);
            setPersonaje(null);
        } catch (error) {
            setError("Error deleting personaje");
        }
    }

    return { personaje, loading, error, editarPersonaje, eliminarPersonaje };
}