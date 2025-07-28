import { useEffect, useState } from "react";
import { getVideoById, updateVideo } from "../../api/videosService";
import type { Video } from "../../types/Video";

export default function useVideoByIdVideo(videoId: number) {
    const [video, setVideo] = useState<Video | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const fetchedVideo = await getVideoById(videoId);
                setVideo(fetchedVideo);
            } catch (err) {
                setError("Error al cargar el video");
            } finally {
                setLoading(false);
            }
        };

        fetchVideo();
    }, [videoId]);

    const actualizarVideo = async (updatedVideo: Video) => {
        setLoading(true);
        try {
            const response = await updateVideo(videoId, updatedVideo);
            setVideo(response);
            setError(null);
        } catch (err) {
            setError("Error al actualizar el video");
        } finally {
            setLoading(false);
        }
    };

    return { video, loading, error, actualizarVideo };
}