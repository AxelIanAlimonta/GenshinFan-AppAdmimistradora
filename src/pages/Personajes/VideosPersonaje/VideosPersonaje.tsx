import './VideosPersonaje.css';
import { useVideosPersonajePorIdPersonaje } from '../../../hooks/Personajes/useVideosPersonajePorIdPersonaje';
import type { VideoPersonaje } from '../../../types/VideoPersonaje';

function getYoutubeEmbedUrl(url: string) {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([\w-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

export default function VideosPersonaje({ videos, loading, error, deleteVideo }: {
    videos: VideoPersonaje[];
    loading: boolean;
    error: string | null;
    deleteVideo: (id: number) => void;
}) {


    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error al cargar los videos</div>;
    if (!videos.length) return <div>No hay videos disponibles para este personaje.</div>;

    return (
        <div className='contenedorVideos'>
            {videos.map((video) => {
                const embedUrl = video.url ? getYoutubeEmbedUrl(video.url) : null;
                return (
                    <div key={video.id} className='contenedorVideo'>
                        {embedUrl ? (
                            <iframe
                                className='contenedorVideo-iframe'
                                src={embedUrl}
                                title={video.titulo}
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <p>URL inválida</p>
                        )}
                        <button type="button" onClick={() => deleteVideo(video.id as number)} className='btn-borrar-video'><img src="/public/images/borrar.png" alt="Eliminar" /></button>
                    </div>
                );
            })}
        </div>
    );
}