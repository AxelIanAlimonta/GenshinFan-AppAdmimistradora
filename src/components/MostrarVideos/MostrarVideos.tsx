import './MostrarVideos.css';
import type { Video } from '../../types/Video';
import { MagicMotion } from 'react-magic-motion';
import MostrarVideo from '../MostrarVideo/MostrarVideo';



export default function MostrarVideosPersonaje({ videos, loading, error, deleteVideo }: {
    videos: Video[];
    loading: boolean;
    error: string | null;
    deleteVideo: (id: number) => void;
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
        <MagicMotion>
            <div className='contenedorVideos'>
                {videos.map((video) => {
                    return (
                        <MostrarVideo key={video.id} video={video} eliminarVideo={deleteVideo} />
                    );
                })}
            </div>
        </MagicMotion>
    );
}