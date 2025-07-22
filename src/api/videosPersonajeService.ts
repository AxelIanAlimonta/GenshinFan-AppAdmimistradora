import type { VideoPersonaje } from "../types/VideoPersonaje";

const url = `${import.meta.env.VITE_API_BASE_URL}/VideoPersonaje`;

async function getVideosPersonaje(): Promise<VideoPersonaje[]> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

async function getVideoPersonajeById(id: number): Promise<VideoPersonaje> {
    const response = await fetch(`${url}/${id}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

async function createVideoPersonaje(video: VideoPersonaje): Promise<VideoPersonaje> {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(video),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

async function updateVideoPersonaje(id: number, video: VideoPersonaje): Promise<VideoPersonaje> {
    const response = await fetch(`${url}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(video),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

async function deleteVideoPersonaje(id: number): Promise<void> {
    const response = await fetch(`${url}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
}

async function getVideosPersonajeByPersonajeId(personajeId: number): Promise<VideoPersonaje[]> {
    const response = await fetch(`${url}/personaje/${personajeId}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

export {
    getVideosPersonaje,
    getVideoPersonajeById,
    createVideoPersonaje,
    updateVideoPersonaje,
    deleteVideoPersonaje,
    getVideosPersonajeByPersonajeId
};
