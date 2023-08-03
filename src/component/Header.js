import { useEffect } from "react";
import { Container, Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { userActionLogout, userActionRefresh } from "../redux/actions/userAction";
import { ToastContainer, toast } from "react-toastify";


const Header = (props) => {
    const navigate = useNavigate();
    const user = useSelector(state => state.user.userState);
    const dispatch = useDispatch();
    const emailUser = localStorage.getItem("email");
    const tokenUser = localStorage.getItem("token");

    useEffect(() => {
        if (user && user.auth === false) {
            navigate("/");
            toast.success("Log out success!");
        }
        if (localStorage.getItem("token") && !user.token) {
            dispatch(userActionRefresh(emailUser, tokenUser))
        }
    }, [user, navigate])

    const handleLogout = () => {
        dispatch(userActionLogout());
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
                            <NavDropdown title={user.email ? `Wellcome ${user.email}` : "Account"} id="basic-nav-dropdown">
                                {!user.email ?
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
            <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                theme="light"
            />
            <Outlet />
        </>
    )
}
export default Header;