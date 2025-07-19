import { useEffect, useState } from "react";
import { getRegiones, deleteRegion } from "../../api/regionService";
import type { Region } from "../../types/Region";

export const useRegiones = () => {
    const [regiones, setRegiones] = useState<Region[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRegiones = async () => {
            try {
                const data = await getRegiones();
                setRegiones(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRegiones();
    }, []);

    async function eliminarRegion(id: number | undefined) {
        try {
            await deleteRegion(id);
            setRegiones((prev) => prev.filter(region => region.id !== id));
        } catch (err: any) {
            setError(err.message);
        }
    }

    return { regiones, loading, error, eliminarRegion };
}