import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootswatch/dist/Quartz/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router'
import Elementos from './pages/Elementos/Elementos.tsx'
import CrearElemento from './pages/Elementos/CrearElemento/CrearElemento.tsx';
import ElementosHome from './pages/Elementos/ElementosHome.tsx';


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />

      <Route path="/elementos" element={<ElementosHome />} >
        <Route index element={<Elementos />} />
        <Route path="crear" element={<CrearElemento />} />
      </Route>

    </Routes>
  </BrowserRouter>,
)
