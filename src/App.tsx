import { Outlet } from 'react-router'
import './App.css'
import NavBar from './components/NavBar'

function App() {

  return (
    <>
      <NavBar />
      <main className="AppMain">
        <Outlet />
      </main>

    </>
  )
}

export default App
