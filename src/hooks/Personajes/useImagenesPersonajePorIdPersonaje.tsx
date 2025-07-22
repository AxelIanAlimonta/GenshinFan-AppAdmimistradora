import { useEffect, useState } from "react";
import { getImagenesPersonajeByPersonajeId, createImagenPersonaje, deleteImagenPersonaje, updateImagenPersonaje } from "../../api/imagenesPersonajeService";
import type { ImagenPersonaje } from "../../types/ImagenPersonaje";

export default function useImagenesPersonajePorIdPersonaje(idPersonaje: number) {
    const [imagenesPersonaje, setImagenesPersonaje] = useState<ImagenPersonaje[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
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

    const agregarImagen = async (imagen: ImagenPersonaje) => {
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
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };

    const actualizarImagen = async (id: number, imagen: ImagenPersonaje) => {
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