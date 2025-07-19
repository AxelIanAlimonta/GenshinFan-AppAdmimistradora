import type { Elemento } from '../types/Elemento.js';

const url = `${import.meta.env.VITE_API_BASE_URL}/elemento`;

async function getElementos(): Promise<Elemento[]> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

async function getElementoById(id: number): Promise<Elemento> {
    if (id === undefined) {
        throw new Error('ID del elemento no proporcionado');
    }

    const response = await fetch(`${url}/${id}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

async function createElemento(elemento: Elemento): Promise<Elemento> {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(elemento),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

async function updateElemento(id: number, elemento: Elemento): Promise<Elemento> {
    if (id === undefined) {
        throw new Error('ID del elemento no proporcionado');
    }

    const response = await fetch(`${url}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(elemento),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

async function deleteElemento(id: number): Promise<void> {
    const response = await fetch(`${url}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
}


export { getElementos, getElementoById, createElemento, updateElemento, deleteElemento };