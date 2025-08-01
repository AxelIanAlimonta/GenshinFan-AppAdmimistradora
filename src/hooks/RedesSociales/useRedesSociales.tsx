import type { RedSocial } from "../../types/RedSocial";

import { getRedesSociales, getRedSocialById, createRedSocial, updateRedSocial, deleteRedSocial } from "../../api/redesSocialesService";
import { useEffect, useState } from "react";


export default function useRedesSociales() {
    const [redesSociales, setRedesSociales] = useState<RedSocial[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getRedesSociales();
            setRedesSociales(data);
        };
        fetchData();
    }, []);

    const crearRedSocial = async (redSocial: RedSocial) => {
        const nuevaRedSocial = await createRedSocial(redSocial);
        setRedesSociales(prev => [...prev, nuevaRedSocial]);
    };

    const actualizarRedSocial = async (id: number, redSocial: RedSocial) => {
        const updatedRedSocial = await updateRedSocial(id, redSocial);
        setRedesSociales(prev => prev.map(rs => rs.id === id ? updatedRedSocial : rs));
    };

    const eliminarRedSocial = async (id: number | undefined) => {
        await deleteRedSocial(id);
        setRedesSociales(prev => prev.filter(rs => rs.id !== id));
    };

    const obtenerRedSocialPorId = async (id: number): Promise<RedSocial> => {
        return await getRedSocialById(id);
    };

    return {
        redesSociales,
        crearRedSocial,
        actualizarRedSocial,
        eliminarRedSocial,
        obtenerRedSocialPorId
    };
}   