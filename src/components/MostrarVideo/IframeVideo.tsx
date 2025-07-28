import { useState } from "react";
import './MostrarVideo.css'

export default function IframeVideo({ url }: { url: string }) {
    const embedUrl = url ? getYoutubeEmbedUrl(url) : null;
    const thumbnailUrl = url ? getYoutubeThumbnail(url) : null;
    const videoTitle = url ? getVideoTitle(url) : "Video no encontrado";
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const handleThumbnailClick = () => {
        setIsVideoLoaded(true);
    };

    function getYoutubeEmbedUrl(url: string) {
        const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([\w-]{11})/);
        return match ? `https://www.youtube.com/embed/${match[1]}` : null;
    }

    function getYoutubeThumbnail(url: string) {
        const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([\w-]{11})/);
        return match ? `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg` : null;
    }

    //obtener titulo del video en español a partir de la url
    function getVideoTitle(url: string) {
        const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([\w-]{11})/);
        return match ? `Video ${match[1]}` : "Video no encontrado";
    }

    return (
        <>
            {embedUrl && thumbnailUrl ? (
                <div className="mostrarVideo-responsive">
                    {!isVideoLoaded ? (
                        <div className="mostrarVideo-thumbnail" onClick={handleThumbnailClick}>
                            <img
                                src={thumbnailUrl}
                                alt={videoTitle}
                                className="mostrarVideo-thumbnail-img"
                            />
                            <div className="mostrarVideo-play-button">
                                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="64" height="64" rx="12" fill="#FF0000" />
                                    <path d="M26 20L46 32L26 44V20Z" fill="white" />
                                </svg>

                            </div>
                        </div>
                    ) : (
                        <iframe
                            className="mostrarVideo-iframe"
                            src={embedUrl}
                            title={videoTitle}
                            allowFullScreen
                        ></iframe>
                    )}
                </div>
            ) : (
                <p>URL inválida</p>
            )}
        </>
    );
}