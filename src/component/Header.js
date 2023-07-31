import { useEffect, useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";
import { NavLink, useNavigate, Outlet } from "react-router-dom";


const Header = (props) => {
    const navigate = useNavigate();
    const [emailLogin, setEmailLogin] = useState("");

    useEffect(() => {
        const emailLog = localStorage.getItem("email");
        setEmailLogin(emailLog);
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        setEmailLogin("");
        navigate("/");
    }
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <NavLink to="/" className={"navbar-brand"}>LapVQ</NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
                        <Nav className="mr-auto">
                            <NavLink to="/" className={"nav-link"}>Home</NavLink>
                            <NavLink to="/users" className={"nav-link"}>Manage users</NavLink>
                        </Nav>
                        <Nav>
                            <NavDropdown title={emailLogin ? `Wellcome ${emailLogin}` : "Account"} id="basic-nav-dropdown">
                                {!emailLogin ?
                                    <NavLink to="/login" className={"dropdown-item"}>Login</NavLink>
                                    :
                                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                                }
                                {/* <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </>
    )
}
export default Header;