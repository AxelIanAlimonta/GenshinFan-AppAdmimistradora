import type { Video } from "../../types/Video";
import './MostrarVideo.css';
import Etiqueta from "../Etiqueta";

function getYoutubeEmbedUrl(url: string) {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([\w-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

export default function MostrarVideo({ video, eliminarVideo }: { video: Video, eliminarVideo: (id: number) => void }) {
    const embedUrl = video.url ? getYoutubeEmbedUrl(video.url) : null;

    return (
        <div className="mostrarVideo-container">
            {embedUrl ? (
                <div className="mostrarVideo-responsive">
                    <iframe
                        className="mostrarVideo-iframe"
                        src={embedUrl}
                        title={video.titulo}
                        allowFullScreen
                    ></iframe>
                </div>
            ) : (
                <p>URL inválida</p>
            )}

            <section className="mostrarVideo-seccionEtiquetasYBtns">
                <div className="mostrarVideo-contenedorDeEtiquetas">
                    {video.etiquetas && video.etiquetas.length > 0 ? (
                        video.etiquetas.map((etiqueta, index) => (
                            <Etiqueta key={index} etiqueta={etiqueta} />
                        ))
                    ) : (
                        <p>No hay etiquetas disponibles</p>
                    )}
                </div>
                <div className="mostrarVideo-contenedorDeBotones">
                    <button className="mostrarVideo-contenedorDeBotones-btn"><img src="/images/editar.png" alt="Editar" /></button>
                    <button className="mostrarVideo-contenedorDeBotones-btn" onClick={() => eliminarVideo(video.id as number)}><img src="/images/borrar.png" alt="Borrar" /></button>

                </div>
            </section>


        </div>
    );
}
