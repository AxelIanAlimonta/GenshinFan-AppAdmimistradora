import type { ImagenPersonaje } from '../types/ImagenPersonaje';
const url = `${import.meta.env.VITE_API_BASE_URL}/ImagenPersonaje`;

async function getImagenesPersonaje(): Promise<ImagenPersonaje[]> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

async function getImagenPersonajeById(id: number): Promise<ImagenPersonaje> {
    const response = await fetch(`${url}/${id}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const imagen = await response.json();
    return imagen;
}

async function createImagenPersonaje(imagen: ImagenPersonaje): Promise<ImagenPersonaje> {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(imagen),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

async function updateImagenPersonaje(id: number, imagen: ImagenPersonaje): Promise<ImagenPersonaje> {
    const response = await fetch(`${url}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(imagen),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

async function deleteImagenPersonaje(id: number): Promise<void> {
    const response = await fetch(`${url}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
}

async function getImagenesPersonajeByPersonajeId(personajeId: number): Promise<ImagenPersonaje[]> {
    const response = await fetch(`${url}/personaje/${personajeId}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

export { getImagenesPersonaje, getImagenPersonajeById, createImagenPersonaje, updateImagenPersonaje, deleteImagenPersonaje, getImagenesPersonajeByPersonajeId };