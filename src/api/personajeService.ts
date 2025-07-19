import type { Personaje } from '../types/Personaje';

const url = `${import.meta.env.VITE_API_BASE_URL}/personaje`;

async function getPersonajes(): Promise<Personaje[]> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

async function getPersonajeById(id: number): Promise<Personaje> {
    const response = await fetch(`${url}/${id}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const personaje = await response.json();
    return personaje || null;
}

async function createPersonaje(personaje: Personaje): Promise<Personaje> {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(personaje),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

async function updatePersonaje(id: number, personaje: Personaje): Promise<Personaje> {
    const response = await fetch(`${url}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(personaje),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

async function deletePersonaje(id: number): Promise<void> {
    const response = await fetch(`${url}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
}

export { getPersonajes, getPersonajeById, createPersonaje, updatePersonaje, deletePersonaje };