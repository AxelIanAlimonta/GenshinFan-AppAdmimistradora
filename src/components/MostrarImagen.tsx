export default function MostrarImagen({ src, alt }: { src: string, alt: string }) {
    const imagen = src && src.trim() !== '' ? src : '/images/no-encontrada.png';
    return (<>
        <img
            src={imagen}
            alt={alt}
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
