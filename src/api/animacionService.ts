import type { Animacion } from "../types/Animacion";

const url = `${import.meta.env.VITE_API_BASE_URL}/animacion`;

async function getAnimaciones(): Promise<Animacion[]> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

async function getAnimacionById(id: number): Promise<Animacion> {
    const response = await fetch(`${url}/${id}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

async function createAnimacion(animacion: Animacion): Promise<Animacion> {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(animacion),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

async function updateAnimacion(id: number, animacion: Animacion): Promise<Animacion> {
    const response = await fetch(`${url}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(animacion),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

async function deleteAnimacion(id: number | undefined): Promise<void> {
    const response = await fetch(`${url}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
}

//obtener animacion por id personaje, endpoint 'personaje/:id'
async function getAnimacionByIdPersonaje(idPersonaje: number): Promise<Animacion[]> {
    const response = await fetch(`${url}/personaje/${idPersonaje}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

async function getAnimacionByIdPersonajeYNombreTipo(idPersonaje: number, tipoAnimacionNombre: string): Promise<Animacion[] | null> {
    const response = await fetch(`${url}/personaje/${idPersonaje}/tipo/${tipoAnimacionNombre}`);
    if (!response.ok) {
        if (response.status === 404) {
            return null; // No se encontró la animación
        }
        throw new Error('Network response was not ok');
    }
    return response.json();
}

export { getAnimaciones, getAnimacionById, createAnimacion, updateAnimacion, deleteAnimacion, getAnimacionByIdPersonaje, getAnimacionByIdPersonajeYNombreTipo };