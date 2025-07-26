import Loading from "../../components/Loading";
import useEtiqueta from "../../hooks/Etiquetas/useEtiqueta";
import Etiqueta from "../../components/Etiqueta";



export default function AdministrarEtiquetas() {
    const { etiquetas, loading, error } = useEtiqueta();

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h1>Administrar Etiquetas</h1>
            <div className="contenedorDeEtiquetas">
                {etiquetas.map((etiqueta) => (
                    <Etiqueta key={etiqueta.id} etiqueta={etiqueta} crossFunction={(id) => console.log(`Cross button clicked for id: ${id}`)} />
                ))}
            </div>

        </div>
    );
}
