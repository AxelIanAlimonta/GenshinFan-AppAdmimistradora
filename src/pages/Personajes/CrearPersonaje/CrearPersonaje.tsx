import './CrearPersonaje.css';
import type { Personaje } from '../../../types/Personaje';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import MostrarImagen from '../../../components/MostrarImagen';
import { useElementos } from '../../../hooks/Elementos/useElementos';
import { useRegiones } from '../../../hooks/Regiones/useRegiones';
import usePersonajes from '../../../hooks/Personajes/usePersonajes';
import { useNavigate } from 'react-router';

export default function CrearPersonaje() {

    const [nombre, setNombre] = useState<string>('');
    const [descripcion, setDescripcion] = useState<string>('');
    const [rareza, setRareza] = useState<number>();
    const [avatarURL, setAvatarURL] = useState<string>('');
    const [splashArtURL, setSplashArtURL] = useState<string>('');
    const [tarjetaURL, setTarjetaURL] = useState<string>('');
    const [fechaLanzamiento, setFechaLanzamiento] = useState<string | ''>('');
    const [elementoId, setElementoId] = useState<number>();
    const [regionId, setRegionId] = useState<number>();


    const { elementos } = useElementos();
    const { regiones } = useRegiones();
    const { createPersonaje } = usePersonajes();

    const navigate = useNavigate();

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const nuevoPersonaje: Personaje = {
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

        createPersonaje(nuevoPersonaje).then(() => {
            navigate('/personajes');
        }).catch((error) => {
            console.error("Error al crear el personaje:", error);
            alert("Hubo un error al crear el personaje. Por favor, inténtelo de nuevo.");
        });
    }

    return (<>
        <Form className="formularioCrearPersonaje" onSubmit={handleSubmit}>
            <section className='infoBasica'>
                <section className='datosBasicos'>
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
                        <MostrarImagen src={avatarURL} alt={nombre} style={{ maxWidth: 100 }} />
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


                <Form.Group controlId="formSplashArtURL" className="grupoFormulario contenedorSplashArt">
                    <Form.Label className='labelSplashArt'>URL del Splash Art</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese la URL del splash art del personaje"
                        value={splashArtURL}
                        onChange={(e) => setSplashArtURL(e.target.value)}
                    />
                    {splashArtURL && (
                        <MostrarImagen src={splashArtURL} alt={nombre} style={{ width: 700 }} />
                    )}
                </Form.Group>

            </section>


            <Form.Group className="grupoFormularioBotones">
                <Button type="submit" variant="success">Crear Personaje</Button>
                <Button variant="danger" onClick={() => navigate('/personajes')}>Cancelar</Button>
            </Form.Group>
        </Form>
    </>
    );
}