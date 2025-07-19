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
      </Route>


    </Routes>
  </BrowserRouter>,
)
