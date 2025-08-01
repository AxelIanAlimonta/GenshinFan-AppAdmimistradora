import type { RedSocial } from "../types/RedSocial";

const url = `${import.meta.env.VITE_API_BASE_URL}/RedSocial`;


async function getRedesSociales(): Promise<RedSocial[]> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

async function getRedSocialById(id: number): Promise<RedSocial> {
    const response = await fetch(`${url}/${id}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

async function createRedSocial(redSocial: RedSocial): Promise<RedSocial> {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(redSocial),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

async function updateRedSocial(id: number, redSocial: RedSocial): Promise<RedSocial> {
    const response = await fetch(`${url}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(redSocial),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

async function deleteRedSocial(id: number | undefined): Promise<void> {
    const response = await fetch(`${url}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
}

export {
    getRedesSociales,
    getRedSocialById,
    createRedSocial,
    updateRedSocial,
    deleteRedSocial
}