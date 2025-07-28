import './MostrarVideos.css';
import type { Video } from '../../types/Video';
import MostrarVideo from '../MostrarVideo/MostrarVideo';



export default function MostrarVideos({ videos, loading, error, borrarVideo }: {
    videos: Video[];
    loading: boolean;
    error: string | null;
    borrarVideo: (id: number) => void;
}) {
    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error al cargar los videos</div>;
    if (!videos.length) return <div>No hay videos disponibles para este personaje.</div>;

    videos.sort((a, b) => {
        const fechaA = new Date(a.fechaPublicacion || '');
        const fechaB = new Date(b.fechaPublicacion || '');
        return fechaB.getTime() - fechaA.getTime();
    });

    return (
        <div className='contenedorVideos'>
            {videos.map((video) => {
                return (
                    <MostrarVideo key={video.id} video={video} eliminarVideo={borrarVideo} editarVideo />
                );
            })}
        </div>
    );
}