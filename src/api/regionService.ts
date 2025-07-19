import type { Region } from "../types/Region";

const url = `${import.meta.env.VITE_API_BASE_URL}/region`;

async function getRegiones(): Promise<Region[]> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

async function getRegionById(id: number): Promise<Region> {
    const response = await fetch(`${url}/${id}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

async function createRegion(region: Region): Promise<Region> {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(region),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

async function updateRegion(id: number, region: Region): Promise<Region> {
    const response = await fetch(`${url}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(region),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

async function deleteRegion(id: number | undefined): Promise<void> {
    const response = await fetch(`${url}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
}

export {
    getRegiones,
    getRegionById,
    createRegion,
    updateRegion,
    deleteRegion,
};
