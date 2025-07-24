import type { TipoAnimacion } from '../types/TipoAnimacion';

const url = `${import.meta.env.VITE_API_BASE_URL}/tipoAnimacion`;

async function getTiposAnimacion(): Promise<TipoAnimacion[]> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

async function getTipoAnimacionById(id: number): Promise<TipoAnimacion> {
    const response = await fetch(`${url}/${id}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

async function createTipoAnimacion(tipoAnimacion: TipoAnimacion): Promise<TipoAnimacion> {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(tipoAnimacion),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

async function updateTipoAnimacion(id: number, tipoAnimacion: TipoAnimacion): Promise<TipoAnimacion> {
    const response = await fetch(`${url}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(tipoAnimacion),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

async function deleteTipoAnimacion(id: number | undefined): Promise<void> {
    const response = await fetch(`${url}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
}

export { getTiposAnimacion, getTipoAnimacionById, createTipoAnimacion, updateTipoAnimacion, deleteTipoAnimacion };