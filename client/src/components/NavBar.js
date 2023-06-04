import React, {useContext} from 'react'
import {Container, Nav, Navbar} from "react-bootstrap"
import {PATHS_ROUTE, STATIONS_ROUTE, TICKETS_ROUTE, TRAINS_ROUTE} from "../utils/consts"
import {useNavigate} from "react-router-dom"
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const NavBar = observer(() => {
    const navigate = useNavigate()
    const {user} = useContext(Context)

    const handleLogout = () => {
        user.setIsAuth(false)
        navigate(TICKETS_ROUTE)
    }

    return (
        <Navbar bg="dark" variant="dark" className="navbar">
            <Container>
                {/*<Navbar.Brand onClick={() => navigate(SCHEDULE_ROUTE)}>Расписание</Navbar.Brand>*/}
                <Nav className="me-auto">
                    <Nav.Link onClick={() => navigate(TICKETS_ROUTE)}>Замовити білет</Nav.Link>
                    <Nav.Link onClick={() => navigate(PATHS_ROUTE)}>Рух потягів</Nav.Link>
                </Nav>
                {user.isAuth ?
                    <Nav>
                        <Nav.Link onClick={() => navigate(STATIONS_ROUTE)}>Станції</Nav.Link>
                        <Nav.Link onClick={() => navigate(TRAINS_ROUTE)}>Потяги</Nav.Link>
                        <Nav.Link onClick={handleLogout}>Вихід</Nav.Link>
                    </Nav>
                    :
                    <Nav>
                        <Nav.Link onClick={() => user.setIsAuth(true)}>Авторизація</Nav.Link>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;