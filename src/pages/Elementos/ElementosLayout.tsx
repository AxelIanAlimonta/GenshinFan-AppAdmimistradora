import { Outlet } from "react-router";

export default function ElementosLayout() {
    return (
        <>
            <h2>Elementos</h2>
            <Outlet />
        </>
    );
}