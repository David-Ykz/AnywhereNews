import WorldMap from "./WorldMap";
import {Container, Nav, Navbar} from "react-bootstrap";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HelloWorld from "./HelloWorld";
import {
    DisplayBreakingNews,
    DisplayFinanceNews,
    DisplayTechnologyNews,
    DisplaySportsNews,
    DisplayPoliticsNews
} from "./NewsArticlesDisplay";

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
                        <Nav.Link href="/finance" style={navTextStyle}>Finance</Nav.Link>
                        <Nav.Link href="/technology" style={navTextStyle}>Technology</Nav.Link>
                        <Nav.Link href="/sports" style={navTextStyle}>Sports</Nav.Link>
                        <Nav.Link href="/politics" style={navTextStyle}>Politics</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <Routes>
                <Route exact path="/" element={<DisplayBreakingNews/>}/>
                <Route path="/world-map" element={<WorldMap/>}/>
                <Route path="/finance" element={<DisplayFinanceNews/>}/>
                <Route path="/technology" element={<DisplayTechnologyNews/>}/>
                <Route path="/sports" element={<DisplaySportsNews/>}/>
                <Route path="/politics" element={<DisplayPoliticsNews/>}/>
            </Routes>
        </Router>
    );
}

export default App;
