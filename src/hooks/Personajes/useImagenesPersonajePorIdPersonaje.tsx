import { useEffect, useState } from "react";
import { getImagenesPersonajeByPersonajeId, createImagenPersonaje, deleteImagenPersonaje, updateImagenPersonaje } from "../../api/imagenesService";
import type { Imagen } from "../../types/Imagen";

export default function useImagenesPersonajePorIdPersonaje(idPersonaje: number) {
    const [imagenesPersonaje, setImagenesPersonaje] = useState<Imagen[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        async function fetchImagenes() {
            try {
                const imagenes = await getImagenesPersonajeByPersonajeId(idPersonaje);
                setImagenesPersonaje(imagenes);
            } catch (error) {
                setError("Error fetching images");
            } finally {
                setLoading(false);
            }
        }
        fetchImagenes();
    }, [idPersonaje]);

    const agregarImagen = async (imagen: Imagen) => {
        try {
            const newImagen = await createImagenPersonaje(imagen);
            setImagenesPersonaje((prev) => [...prev, newImagen]);
        } catch (error) {
            console.error("Error adding image:", error);
        }
    };

    const eliminarImagen = async (id: number) => {
        try {
            await deleteImagenPersonaje(id);
            setImagenesPersonaje((prev) => prev.filter((img) => img.id !== id));
            setError(null); // Resetear error si la eliminación fue exitosa
        } catch (error) {
            let mensaje = "Error deleting image";
            if (error instanceof Error && error.message) {
                mensaje += ": " + error.message;
            }
            setError(mensaje);
            console.error(mensaje, error);
        }
    };

    const actualizarImagen = async (id: number, imagen: Imagen) => {
        try {
            const updatedImagen = await updateImagenPersonaje(id, imagen);
            setImagenesPersonaje((prev) =>
                prev.map((img) => (img.id === id ? updatedImagen : img))
            );
        } catch (error) {
            console.error("Error updating image:", error);
        }
    };

    return {
        imagenesPersonaje,
        agregarImagen,
        eliminarImagen,
        actualizarImagen,
        loading,
        error
    };


}