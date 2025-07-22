import { useEffect, useState } from "react";
import { createVideoPersonaje, getVideosPersonajeByPersonajeId, updateVideoPersonaje, deleteVideoPersonaje } from "../../api/videosPersonajeService";
import type { VideoPersonaje } from "../../types/VideoPersonaje";

export function useVideosPersonajePorIdPersonaje(idPersonaje: number) {

    const [videos, setVideos] = useState<VideoPersonaje[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    if (!idPersonaje) {
        throw new Error("idPersonaje is required");
    }

    useEffect(() => {
        const getVideos = async (): Promise<VideoPersonaje[]> => {
            try {
                const videos = await getVideosPersonajeByPersonajeId(idPersonaje);
                setVideos(videos);
                return videos;
            } catch (error) {
                console.error("Error fetching videos:", error);
                setError("Error fetching videos");
                throw error;
            } finally {
                setLoading(false);
            }
        };
        getVideos();
    }, [idPersonaje]);



    const createVideo = async (video: VideoPersonaje) => {
        try {
            const newVideo = await createVideoPersonaje(video);
            setVideos((prevVideos) => [...prevVideos, newVideo]);
            return newVideo;
        } catch (error) {
            console.error("Error creating video:", error);
            setError("Error creating video");
            throw error;
        }
    };


    const updateVideo = async (id: number, video: VideoPersonaje) => {
        try {
            const updatedVideo = await updateVideoPersonaje(id, video);
            setVideos((prevVideos) =>
                prevVideos.map((v) => (v.id === id ? updatedVideo : v))
            );
            return updatedVideo;
        } catch (error) {
            console.error("Error updating video:", error);
            setError("Error updating video");
            throw error;
        }
    };

    const deleteVideo = async (id: number) => {
        try {
            await deleteVideoPersonaje(id);
            setVideos((prevVideos) => prevVideos.filter((v) => v.id !== id));
        } catch (error) {
            console.error("Error deleting video:", error);
            setError("Error deleting video");
            throw error;
        }
    };




    return { videos, createVideo, updateVideo, deleteVideo, loading, error };
}

