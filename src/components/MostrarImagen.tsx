export default function MostrarImagen({ src, alt }: { src: string | undefined, alt: string | undefined }) {
    const imagen = src && src.trim() !== '' ? src : '/images/no-encontrada.png';
    return (<>
        <img
            src={imagen}
            alt={alt || 'Imagen no disponible'}
            className="imgIco"
            onError={(e) => {
                const target = e.currentTarget;
                target.onerror = null; // Evita bucles infinitos si la imagen de fallback tampoco carga
                target.src = '/images/no-encontrada.png'; // Reemplazalo con tu imagen por defecto
            }}
        />
    </>
    );
}
