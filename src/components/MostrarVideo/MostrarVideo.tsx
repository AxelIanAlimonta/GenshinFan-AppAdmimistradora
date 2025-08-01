import type { Video } from "../../types/Video";
import './MostrarVideo.css';
import Etiqueta from "../Etiqueta";
import { useNavigate } from "react-router";
import IframeVideo from "./IframeVideo";



export default function MostrarVideo({ video, eliminarVideo, editarVideo }: { video: Video, eliminarVideo?: (id: number) => void, editarVideo?: boolean }) {

    const navigate = useNavigate();

    if (!video) return <p>Video no encontrado</p>;

    return (
        <div className="mostrarVideo-container">
            <h2 className="mostrarVideo-titulo">{video.titulo}</h2>
            <IframeVideo url={video.url || ""} />
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
                    {editarVideo && (
                        <button className="mostrarVideo-contenedorDeBotones-btn" onClick={() => navigate(`/videos/editar/${video.id}`)} type="button"><img src="/images/editar.png" alt="Editar" /></button>
                    )}
                    {eliminarVideo && (
                        <button className="mostrarVideo-contenedorDeBotones-btn" onClick={() => eliminarVideo(video.id as number)} type="button"><img src="/images/borrar.png" alt="Borrar" /></button>
                    )}
                </div>
            </section>
        </div>
    );
}