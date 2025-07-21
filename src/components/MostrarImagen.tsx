export default function MostrarImagen({ src, alt, width, maxWidth, height, maxHeight }: { src: string | undefined, alt: string | undefined, width?: number, maxWidth?: number, height?: number, maxHeight?: number }) {
    const imagen = src && src.trim() !== '' ? src : '/images/no-encontrada.png';
    return (<>
        <img
            src={imagen}
            alt={alt || 'Imagen no disponible'}
            style={{ width: width ? `${width}px` : '65px', height: height ? `${height}px` : 'auto', maxWidth: maxWidth ? `${maxWidth}px` : '100%', maxHeight: maxHeight ? `${maxHeight}px` : '100%' }}
            onError={(e) => {
                const target = e.currentTarget;
                target.onerror = null; 
                target.src = '/images/no-encontrada.png'; 
            }}
        />
    </>
    );
}
