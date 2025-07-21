import { Outlet } from "react-router";

export default function PersonajesLayout() {
    return (
        <div className="personajes-layout">
            <h2>Personajes</h2>
            <Outlet />
        </div>
    );
}