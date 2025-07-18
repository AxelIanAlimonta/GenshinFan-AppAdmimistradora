import type { Elemento } from '../types/Elemento.js';

const url = `${import.meta.env.VITE_API_BASE_URL}/elemento`;

async function getElementos(): Promise<Elemento[]> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}



export { getElementos };