import { useRegiones } from "../../hooks/Regiones/useRegiones";
import Loading from "../../components/Loading";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import "./Regiones.css";
import MostrarImagen from "../../components/MostrarImagen";

export default function Regiones() {
  const { regiones, loading, error, eliminarRegion } = useRegiones();
  const navigate = useNavigate();

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="contenedorDeRegiones">
      <Button
        variant="success"
        onClick={() => navigate("/regiones/crear")}
        className="btnAgregarRegion"
      >
        Agregar Región
      </Button>

      <div className="region-itemsContainer">
        {regiones.map((region) => (
          <div key={region.id} className="region-item">
            <p className="nombreRegion">{region.nombre}</p>

            <MostrarImagen
              src={region.imagenURL}
              alt={region.nombre}
              style={{
                width: "80%",
                backgroundColor: "gray",
                borderRadius: 10,
                objectFit: "cover",
                flexGrow: 1,
                overflow: "hidden",
              }}
            />

            <div className="region-botonesContainer">
              <Button
                variant="primary"
                onClick={() => navigate(`/regiones/${region.id}/editar`)}
              >
                Editar
              </Button>
              <Button
                variant="danger"
                onClick={() => eliminarRegion(region.id)}
              >
                Eliminar
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
