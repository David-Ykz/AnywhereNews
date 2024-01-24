import WorldMap from "./WorldMap";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HelloWorld from "./HelloWorld";
import FinanceNews from "./FinanceNews";

const navTextStyle = {
    fontFamily: "Segoe UI",
    marginLeft: "10px"
}




function App() {
    return (
        <Router>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">AnywhereNews</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/world-map" style={navTextStyle}>Map</Nav.Link>
                        <Nav.Link href="/breaking-news" style={navTextStyle}>Breaking News</Nav.Link>
                        <Nav.Link href="/finance-news" style={navTextStyle}>Finance</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <Routes>
                <Route exact path="/" element={<HelloWorld></HelloWorld>}></Route>
                <Route path="/world-map" element={<WorldMap></WorldMap>}></Route>
                <Route path="/finance-news" element={<FinanceNews></FinanceNews>}></Route>
            </Routes>
        </Router>
    );
}

export default App;
