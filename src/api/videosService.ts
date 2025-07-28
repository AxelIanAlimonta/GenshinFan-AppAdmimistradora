import type { Video } from "../types/Video";

const url = `${import.meta.env.VITE_API_BASE_URL}/Video`;

async function getVideos(): Promise<Video[]> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

async function getVideoById(id: number): Promise<Video> {
    const response = await fetch(`${url}/${id}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

async function createVideo(video: Video): Promise<Video> {
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

async function updateVideo(id: number, video: Video): Promise<Video> {
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

async function deleteVideo(id: number): Promise<void> {
    const response = await fetch(`${url}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
}

async function getVideosByPersonajeId(personajeId: number): Promise<Video[]> {
    const response = await fetch(`${url}/personaje/${personajeId}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

export {
    getVideos,
    getVideoById,
    createVideo,
    updateVideo,
    deleteVideo,
    getVideosByPersonajeId
};
