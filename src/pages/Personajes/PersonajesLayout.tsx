import { Outlet } from "react-router";

export default function PersonajesLayout() {
    return (
        <div className="personajes-layout">
            <h1>Personajes</h1>
            {/* Aquí irían los componentes o rutas anidadas para manejar los personajes */}
            <Outlet />
        </div>
    );
}