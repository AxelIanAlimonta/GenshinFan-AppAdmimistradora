import { getRegionById, updateRegion } from "../../api/regionService";
import { useEffect, useState } from "react";
import type { Region } from "../../types/Region";

export default function useRegionById(id: number) {

    const [region, setRegion] = useState<Region | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRegion = async () => {
            if (id) {
                try {
                    const data = await getRegionById(id);
                    setRegion(data);
                } catch (e) {
                    setError("Error al obtener la región");
                    console.error(e);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchRegion();
    }, [id]);

    const actualizarRegion = async (regionActualizada: Region) => {
        if (!id) return;

        try {
            const updated = await updateRegion(id, regionActualizada);
            setRegion((prev) => (prev ? { ...prev, ...updated } : null));
        } catch (error) {
            setError("Error al actualizar la región");
            console.error(error);
        }
    };



    return { region, loading, error, actualizarRegion };

}