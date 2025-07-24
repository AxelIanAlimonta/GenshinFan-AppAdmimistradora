import { useEffect, useState } from "react";
import type { Animacion } from "../../types/Animacion";
import { getAnimacionByIdPersonaje, createAnimacion, deleteAnimacion, getAnimacionByIdPersonajeYNombreTipo, updateAnimacion } from "../../api/animacionService";

export default function useAnimacionesPersonajePorIdPersonaje(idPersonaje: number) {

    const [animaciones, setAnimaciones] = useState<Animacion[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchAnimaciones() {
            try {
                const animaciones = await getAnimacionByIdPersonaje(idPersonaje);
                setAnimaciones(animaciones);
            } catch (error) {
                console.error("Error fetching animations:", error);
                setError("Error fetching animations");
            } finally {
                setLoading(false);
            }
        }

        fetchAnimaciones();

    }, [idPersonaje]);

    const agregarAnimacion = async (animacion: Animacion) => {
        try {
            const nuevaAnimacion = await createAnimacion(animacion);
            setAnimaciones((prev) => [...prev, nuevaAnimacion]);
        } catch (error) {
            console.error("Error adding animation:", error);
        }
    };

    const actualizarAnimacion = async (id: number, animacion: Animacion) => {
        try {
            const updatedAnimacion = await updateAnimacion(id, animacion);
            setAnimaciones((prev) =>
                prev.map((anim) => (anim.id === id ? updatedAnimacion : anim))
            );
        } catch (error) {
            console.error("Error updating animation:", error);
        }
    };

    const eliminarAnimacion = async (id: number) => {
        try {
            await deleteAnimacion(id);
            setAnimaciones((prev) => prev.filter((anim) => anim.id !== id));
            setError(null); // Resetear error si la eliminación fue exitosa
        } catch (error) {
            let mensaje = "Error deleting animation";
            if (error instanceof Error && error.message) {
                mensaje += ": " + error.message;
            }
            setError(mensaje);
            console.error(mensaje, error);
        }
    };


    const obtenerAnimacionesPorNombreTipo = async (nombre: string): Promise<Animacion[] | null> => {
        try {
            const animacion = await getAnimacionByIdPersonajeYNombreTipo(idPersonaje, nombre);
            return animacion;
        } catch (error) {
            console.error("Error fetching animation by name and type:", error);
            setError("Error fetching animation by name and type");
            return null;
        }
    };


    return { animaciones, loading, error, obtenerAnimacionesPorNombreTipo, agregarAnimacion, eliminarAnimacion, actualizarAnimacion };
}