import { useEffect, useState } from "react";
import { createVideo, getVideosByPersonajeId, updateVideo, deleteVideo } from "../../api/videosService";
import type { Video } from "../../types/Video";

export function useVideosPersonajePorIdPersonaje(idPersonaje: number) {

    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // No lanzar excepción, manejar el caso gracefully
    if (!idPersonaje) {
        return {
            videos: [],
            loading: false,
            error: "ID de personaje no válido",
            crearVideo: async () => { console.error("ID de personaje no válido"); return null; },
            updateVideo: async () => { console.error("ID de personaje no válido"); return null; },
            deleteVideo: async () => { console.error("ID de personaje no válido"); }
        };
    }

    useEffect(() => {
        const getVideos = async (): Promise<Video[]> => {
            try {
                const videos = await getVideosByPersonajeId(idPersonaje);
                setVideos(videos);
                return videos;
            } catch (error) {
                console.error("Error fetching videos:", error);
                setError("Error fetching videos");
                return [];
            } finally {
                setLoading(false);
            }
        };
        getVideos();
    }, [idPersonaje]);



    const crearVideo = async (video: Video) => {
        try {
            const newVideo = await createVideo(video);
            setVideos((prevVideos) => [...prevVideos, newVideo]);
            return newVideo;
        } catch (error) {
            console.error("Error creating video:", error);
            setError("Error creating video");
            return null;
        }
    };


    const actualizarVideo = async (id: number, video: Video) => {
        try {
            const updatedVideo = await updateVideo(id, video);
            setVideos((prevVideos) =>
                prevVideos.map((v) => (v.id === id ? updatedVideo : v))
            );
            return updatedVideo;
        } catch (error) {
            console.error("Error updating video:", error);
            setError("Error updating video");
            return null;
        }
    };

    const borrarVideo = async (id: number) => {
        try {
            await deleteVideo(id);
            setVideos((prevVideos) => prevVideos.filter((v) => v.id !== id));
        } catch (error) {
            console.error("Error deleting video:", error);
            setError("Error deleting video");
        }
    };




    return { videos, crearVideo, actualizarVideo, borrarVideo, loading, error };
}

