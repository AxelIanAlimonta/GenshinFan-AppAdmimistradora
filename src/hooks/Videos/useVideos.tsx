import type { Video } from "../../types/Video";
import { getVideos, createVideo, deleteVideo, updateVideo } from "../../api/videosService";
import { useEffect, useState } from "react";


export default function useVideos() {

    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const obtenerVideos = async () => {
        setLoading(true);
        try {
            const response = await getVideos();
            setVideos(response);
        } catch (err) {
            setError("Error al cargar los videos");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        obtenerVideos();
    }, []);

    const eliminarVideo = async (id: number) => {
        try {
            await deleteVideo(id);
            setVideos(videos.filter(video => video.id !== id));
        } catch (err) {
            setError("Error al eliminar el video");
        }
    }

    const agregarVideo = async (video: Video) => {
        try {
            const nuevoVideo = await createVideo(video);
            setVideos([...videos, nuevoVideo]);
        } catch (err) {
            setError("Error al agregar el video");
        }
    }

    const editarVideo = async (id: number, video: Video) => {
        try {
            const videoActualizado = await updateVideo(id, video);
            setVideos(videos.map(v => v.id === id ? videoActualizado : v));
        } catch (err) {
            setError("Error al editar el video");
        }
    }

    return {
        videos,
        loading,
        error,
        eliminarVideo,
        agregarVideo,
        editarVideo
    };
}