import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";

export default function Home() {
    const navigate = useNavigate();
    return (<>
        <h1>Home 😀</h1>
        <Button variant="primary" onClick={() => navigate('/elementos')}>Ir a la Elementos</Button>
    </>);
}