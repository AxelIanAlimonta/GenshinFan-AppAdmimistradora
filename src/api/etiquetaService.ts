import type { Etiqueta } from '../types/Etiqueta';

const url = `${import.meta.env.VITE_API_BASE_URL}/etiqueta`;

export async function getEtiquetas(): Promise<Etiqueta[]> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Error al obtener las etiquetas');
    }
    return response.json();
}

export async function createEtiqueta(etiqueta: Omit<Etiqueta, 'id'>): Promise<Etiqueta> {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(etiqueta),
    });
    if (!response.ok) {
        throw new Error('Error al crear la etiqueta');
    }
    return response.json();
}

export async function updateEtiqueta(etiqueta: Etiqueta): Promise<Etiqueta> {
    const response = await fetch(`${url}/${etiqueta.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(etiqueta),
    });
    if (!response.ok) {
        throw new Error('Error al actualizar la etiqueta');
    }
    return response.json();
}

export async function deleteEtiqueta(id: number): Promise<void> {
    const response = await fetch(`${url}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Error al eliminar la etiqueta');
    }
}