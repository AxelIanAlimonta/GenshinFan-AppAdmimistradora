import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/Minty/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router'
import ElementosLayout from './pages/Elementos/ElementosLayout.tsx';
import Elementos from './pages/Elementos/Elementos.tsx'
import CrearElemento from './pages/Elementos/CrearElemento/CrearElemento.tsx';
import EditarElemento from './pages/Elementos/EditarElemento/EditarElemento.tsx';
import Home from './pages/Home/Home.tsx';
import Regiones from './pages/Regiones/Regiones.tsx';
import RegionesLayout from './pages/Regiones/RegionesLayout.tsx';
import CrearRegion from './pages/Regiones/CrearRegion/CrearRegion.tsx';
import EditarRegion from './pages/Regiones/EditarRegion/EditarRegion.tsx';
import Personajes from './pages/Personajes/Personajes.tsx';
import PersonajesLayout from './pages/Personajes/PersonajesLayout.tsx';
import CrearPersonaje from './pages/Personajes/CrearPersonaje/CrearPersonaje.tsx';
import EditarPersonaje from './pages/Personajes/EditarPersonaje/EditarPersonaje.tsx';
import Prueba from './pages/Pruebas/Prueba.tsx';
import AgregarImagenPersonaje from './pages/Personajes/ImagenesPersonaje/AgregarImagenPersonaje/AgregarImagenPersonaje.tsx';
import AgregarVideoPersonaje from './pages/Personajes/VideosPersonaje/AgregarVideoPersonaje/AgregarVideoPersonaje.tsx';
import AgregarAnimacionPersonaje from './pages/Personajes/AnimacionesPersonaje/AgregarAnimacionPersonaje/AgregarAnimacionPersonaje.tsx';
import AdministrarEtiquetas from './pages/Etiquetas/AdministrarEtiquetas.tsx';
import AdministrarVideos from './pages/AdministrarVideos/AdministrarVideos.tsx';
import EditarVideo from './pages/EditarVideo/EditarVideo.tsx';
import RedesSociales from './pages/RedesSociales/RedesSociales.tsx';


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>


    <Routes>

      <Route path="/" element={<App />} >

        <Route index element={<Home />} />

        <Route path="elementos" element={<ElementosLayout />} >
          <Route index element={<Elementos />} />
          <Route path="crear" element={<CrearElemento />} />
          <Route path=":id/editar" element={<EditarElemento />} />
        </Route>

        <Route path="regiones" element={<RegionesLayout />} >
          <Route index element={<Regiones />} />
          <Route path="crear" element={<CrearRegion />} />
          <Route path=":id/editar" element={<EditarRegion />} />
        </Route>

        <Route path="personajes" element={<PersonajesLayout />} >
          <Route index element={<Personajes />} />
          <Route path="crear" element={<CrearPersonaje />} />
          <Route path=":id/editar" element={<EditarPersonaje />} />
          <Route path="imagenes-personaje/:id/agregar" element={<AgregarImagenPersonaje />} />
          <Route path="videos-personaje/:id/agregar" element={<AgregarVideoPersonaje />} />
          <Route path="animaciones-personaje/:id/agregar" element={<AgregarAnimacionPersonaje />} />
        </Route>

        <Route path="etiquetas" element={<AdministrarEtiquetas />} />

        <Route path='administrar-videos' element={<AdministrarVideos />} />

        <Route path="editar-video/:id" element={<EditarVideo />} />

        <Route path="redes-sociales" element={<RedesSociales />} />

        <Route path="pruebas" element={<Prueba />} />

      </Route>
    </Routes>
  </BrowserRouter>,
)
