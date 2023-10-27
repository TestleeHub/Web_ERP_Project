import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { getUserId } from '../../helpers/axios_helper';

function Header() {
    return (
        <div>
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
                integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
                crossorigin="anonymous"
            />

            <Navbar bg="dark" data-bs-theme="dark" expand="xl" style={{ minWidth: '1500px', height:'75px' }}>
                <Container fluid>
                    <Navbar.Brand href="#">Web-ERP Service</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link href="/main">Home</Nav.Link>
                            {getUserId() === 'null' || getUserId() === null ?
                                <NavDropdown title="마이페이지" id="navbarScrollingDropdown">
                                    <NavDropdown.Item href="/myEdit">내 정보 수정</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                </NavDropdown>
                                :
                                <NavDropdown title={getUserId()} id="navbarScrollingDropdown">
                                    <NavDropdown.Item href="/myEdit">내 정보 수정</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                </NavDropdown>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>

    );
}

export default Header;