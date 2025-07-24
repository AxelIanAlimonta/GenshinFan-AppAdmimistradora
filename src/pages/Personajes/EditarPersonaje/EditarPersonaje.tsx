import './EditarPersonaje.css';
import type { Personaje } from '../../../types/Personaje';
import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import MostrarImagen from '../../../components/MostrarImagen';
import { useElementos } from '../../../hooks/Elementos/useElementos';
import { useRegiones } from '../../../hooks/Regiones/useRegiones';
import { useNavigate, useParams } from 'react-router';
import usePersonajeById from '../../../hooks/Personajes/usePersonajeById';
import Loading from '../../../components/Loading';
import MostrarImagenesPersonaje from '../ImagenesPersonaje/MostrarImageesPersonaje/MostrarImagenesPersonaje';
import MostrarVideosPersonaje from '../VideosPersonaje/MostrarVideosPersonaje/MostrarVideosPersonaje';
import useImagenesPersonajePorIdPersonaje from '../../../hooks/Personajes/useImagenesPersonajePorIdPersonaje';
import { useVideosPersonajePorIdPersonaje } from '../../../hooks/Personajes/useVideosPersonajePorIdPersonaje';
import MostrarAnimacionesPersonaje from '../AnimacionesPersonaje/MostrarAnimacionesPersonaje/MostrarAnimacionesPersonaje';
import useAnimacionesPersonajePorIdPersonaje from '../../../hooks/Personajes/useAnimacionesPersonajePorIdPersonaje';

export default function EditarPersonaje() {

    const { id: idParam } = useParams();
    if (!idParam) {
        return <div>Error: ID del personaje no proporcionado</div>;
    }

    const id: number = parseInt(idParam, 10);
    if (isNaN(id)) {
        return <div>Error: ID del personaje no válido</div>;
    }



    const [nombre, setNombre] = useState<string>('');
    const [descripcion, setDescripcion] = useState<string>('');
    const [rareza, setRareza] = useState<number>();
    const [avatarURL, setAvatarURL] = useState<string>('');
    const [splashArtURL, setSplashArtURL] = useState<string>('');
    const [tarjetaURL, setTarjetaURL] = useState<string>('');
    const [fechaLanzamiento, setFechaLanzamiento] = useState<string | ''>('');
    const [elementoId, setElementoId] = useState<number>();
    const [regionId, setRegionId] = useState<number>();



    const { editarPersonaje, personaje, loading } = usePersonajeById(id);
    const { elementos } = useElementos();
    const { regiones } = useRegiones();
    const { imagenesPersonaje, eliminarImagen, loading: loadingImagenes, error: errorImagenes } = useImagenesPersonajePorIdPersonaje(id);
    const { videos, deleteVideo, loading: loadingVideos, error: errorVideos } = useVideosPersonajePorIdPersonaje(id);
    const { animaciones, eliminarAnimacion, loading: loadingAnimaciones, error: errorAnimaciones } = useAnimacionesPersonajePorIdPersonaje(id);

    const navigate = useNavigate();

    useEffect(() => {
        if (personaje) {
            setNombre(personaje.nombre || '');
            setDescripcion(personaje.descripcion || '');
            setRareza(personaje.rareza ?? undefined);
            setAvatarURL(personaje.avatarURL || '');
            setSplashArtURL(personaje.splashArtURL || '');
            setTarjetaURL(personaje.tarjetaURL || '');
            setFechaLanzamiento(personaje.fechaLanzamiento || '');
            setElementoId(personaje.elementoId ?? undefined);
            setRegionId(personaje.regionId ?? undefined);
        }
    }, [personaje]);


    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const nuevoPersonaje: Personaje = {
            id,
            nombre,
            descripcion,
            rareza,
            avatarURL,
            splashArtURL,
            tarjetaURL,
            fechaLanzamiento: fechaLanzamiento !== '' ? fechaLanzamiento : null,
            elementoId,
            regionId
        }

        editarPersonaje(nuevoPersonaje).then(() => {
            navigate('/personajes');
        }).catch((error) => {
            console.error("Error al Guardar el personaje:", error);
        });
    }


    if (loading) {
        return <Loading />;
    }

    return (<>
        <Form className="formularioEditarpersonaje" onSubmit={handleSubmit}>

            <section className="infoBasica">
                <section className="datosBasicos">

                    <Form.Group controlId="formNombre" className="grupoFormulario">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese el nombre del personaje"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formAvatarURL" className="grupoFormulario contenedorAvatar">
                        <MostrarImagen src={avatarURL} alt={nombre} style={{ width: 90 }} />
                        <div className='contenedorAvatar-labelYcontrol'>
                            <Form.Label>URL del Avatar</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese la URL del avatar del personaje"
                                value={avatarURL}
                                onChange={(e) => setAvatarURL(e.target.value)}
                            />
                        </div>

                    </Form.Group>

                    <Form.Group controlId="formDescripcion" className="grupoFormulario">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control as={"textarea"}
                            placeholder="Ingrese una breve descripción del personaje"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />
                    </Form.Group>

                    <div className="contenedorRarezaElementoRegion">
                        <Form.Group controlId="formRareza" className="grupoFormulario">
                            <Form.Label className='contenedorRarezaElementoRegion-label'>Rareza</Form.Label>
                            <Form.Select
                                value={rareza}
                                onChange={(e) => setRareza(Number(e.target.value))}
                            >
                                <option value="">Seleccione la rareza</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="formElemento" className="grupoFormulario">
                            <Form.Label className='contenedorRarezaElementoRegion-label'>Elemento</Form.Label>
                            <Form.Select
                                value={elementoId}
                                onChange={(e) => setElementoId(Number(e.target.value))}
                            >
                                <option value="">Seleccione un elemento</option>
                                {elementos.map((elemento) => (
                                    <option key={elemento.id} value={elemento.id}>
                                        {elemento.nombre}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group controlId="formRegion" className="grupoFormulario">
                            <Form.Label className='contenedorRarezaElementoRegion-label'>Región</Form.Label>
                            <Form.Select
                                value={regionId}
                                onChange={(e) => setRegionId(Number(e.target.value))}
                            >
                                <option value="">Seleccione una región</option>
                                {regiones.map((region) => (
                                    <option key={region.id} value={region.id}>
                                        {region.nombre}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </div>

                    <Form.Group controlId="formFechaLanzamiento" className="grupoFormulario">
                        <Form.Label>Fecha de Lanzamiento</Form.Label>
                        <Form.Control
                            type="date"
                            placeholder="Ingrese la fecha de lanzamiento del personaje"
                            value={fechaLanzamiento}
                            onChange={(e) => setFechaLanzamiento(e.target.value)}
                        />
                    </Form.Group>

                </section>

                    <Form.Group controlId="formSplashArtURL" className="grupoFormulario contenedorSplashArt">
                        <Form.Label className='labelSplashArt'>URL del Splash Art</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese la URL del splash art del personaje"
                            value={splashArtURL}
                            onChange={(e) => setSplashArtURL(e.target.value)}
                        />
                        {splashArtURL && (
                            <MostrarImagen src={splashArtURL} alt={nombre} style={{ width: 500 }} />
                        )}
                    </Form.Group>

                    <Form.Group controlId="formTarjetaURL" className="grupoFormulario contenedorTarjeta">
                        <Form.Label className='labelTarjeta'>URL de la Tarjeta</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese la URL de la tarjeta del personaje"
                            value={tarjetaURL}
                            onChange={(e) => setTarjetaURL(e.target.value)}
                        />
                        {tarjetaURL && (
                            <MostrarImagen src={tarjetaURL} alt={nombre} style={{ width: 200 }} />
                        )}
                    </Form.Group>

            </section>



            <section className="editarPersonaje-imagenesPersonajeSection">
                <h3>Imagenes del personaje</h3>
                <Button variant="primary" onClick={() => navigate(`/personajes/imagenes-personaje/${id}/agregar`)}>
                    Agregar Imagen
                </Button>
                <MostrarImagenesPersonaje imagenesPersonaje={imagenesPersonaje} loading={loadingImagenes} error={errorImagenes} eliminarImagen={eliminarImagen} />
            </section>

            <section className="editarPersonaje-videosPersonajeSection">
                <h3>Videos del personaje</h3>
                <Button variant="primary" onClick={() => navigate(`/personajes/videos-personaje/${id}/agregar`)}>
                    Agregar Video
                </Button>
                <MostrarVideosPersonaje videos={videos} loading={loadingVideos} error={errorVideos} deleteVideo={deleteVideo} />
            </section>

            <section className="editarPersonaje-animacionesPersonajeSection">
                <h3>Animaciones del personaje</h3>
                <Button variant="primary" onClick={() => navigate(`/personajes/animaciones-personaje/${id}/agregar`)}>
                    Agregar Animación
                </Button>
                <MostrarAnimacionesPersonaje animaciones={animaciones} loading={loadingAnimaciones} error={errorAnimaciones} eliminarAnimacion={eliminarAnimacion} />
            </section>

            <Form.Group className="grupoFormularioBotones">
                <Button type="submit" variant="success">Guardar Cambios</Button>
                <Button variant="danger" onClick={() => navigate('/personajes')}>Cancelar</Button>
            </Form.Group>

            <button className='btn-guardarFlotante' type='submit'><img src="/public/images/guardar.png" alt="Guardar" /></button>
        </Form>
    </>
    );
}