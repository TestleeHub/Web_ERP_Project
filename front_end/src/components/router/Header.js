import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


function Header() {
    return (
        <div>
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
                integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
                crossorigin="anonymous"
            />

            <Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link href="/test">Home</Nav.Link>
                            <Nav.Link href="/samples">SampleList</Nav.Link>
                            <NavDropdown title="마이페이지" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="/add-member">Sample추가</NavDropdown.Item>
                                <NavDropdown.Item href="#action1">장바구니</NavDropdown.Item>
                                <NavDropdown.Item href="#action2">Sample탈퇴</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action3">구매</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">환불</NavDropdown.Item>
                                <NavDropdown.Divider />
                            </NavDropdown>
                            <NavDropdown title="커뮤니티" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="/board">게시판</NavDropdown.Item>
                                <NavDropdown.Item href="/qna">QNA</NavDropdown.Item>
                                <NavDropdown.Item href="/notice">공지사항</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action3">찾아오기</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">컨택</NavDropdown.Item>
                                <NavDropdown.Divider />
                            </NavDropdown>
                            <Nav.Link href="#" disabled>
                                로그인
                            </Nav.Link>
                        </Nav>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>

    );
}

export default Header;