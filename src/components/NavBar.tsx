import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router';


function NavBar() {

    const navigate = useNavigate();

    return (
        <Navbar expand="lg" className="bg-body-tertiary mb-3">
            <Container>
                <Navbar.Brand onClick={() => navigate('/')}>GenshinFan</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
                        <Nav.Link onClick={() => navigate('/personajes')}>Personajes</Nav.Link>
                        <Nav.Link onClick={() => navigate('/videos')}>Videos</Nav.Link>
                        <Nav.Link onClick={() => navigate('/elementos')}>Elementos</Nav.Link>
                        <Nav.Link onClick={() => navigate('/regiones')}>Regiones</Nav.Link>
                        <Nav.Link onClick={() => navigate('/etiquetas')}>Etiquetas</Nav.Link>
                        <Nav.Link onClick={() => navigate('/redes-sociales')}>Redes Sociales</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;