import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Elementos from './pages/Elementos/Elementos.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />

      <Route path="/elementos" element={<Elementos />} >
      
      </Route>
    </Routes>
  </BrowserRouter>,
)
