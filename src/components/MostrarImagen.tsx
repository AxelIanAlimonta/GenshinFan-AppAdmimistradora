export default function MostrarImagen({ src, alt, style }: { src: string | undefined, alt: string | undefined, style?: React.CSSProperties }) {
    const imagen = src && src.trim() !== '' ? src : '/images/no-encontrada.png';
    return (
        <img
            src={imagen}
            alt={alt || 'Imagen no disponible'}
            style={style}
            onError={(e) => {
                const target = e.currentTarget;
                target.onerror = null;
                target.src = '/images/no-encontrada.png';
            }}
        />
    );
}
