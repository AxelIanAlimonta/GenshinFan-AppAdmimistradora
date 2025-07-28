import MostrarVideo from '../../components/MostrarVideo/MostrarVideo';
import { useVideosPersonajePorIdPersonaje } from '../../hooks/Personajes/useVideosPersonajePorIdPersonaje';
import type { Video } from '../../types/Video';
import './Prueba.css';

export default function Prueba() {
    const { videos } = useVideosPersonajePorIdPersonaje(10);
    const videosFiltrados: Video[] = videos.filter(video => video.id === 33);

    return (
        <>

            {videosFiltrados.map((video) => (
                <MostrarVideo key={video.id} video={video} />
            ))}

        </>
    );
}

