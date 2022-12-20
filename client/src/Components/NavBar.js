import React, {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {NavLink, useNavigate} from "react-router-dom";
import {
    ANIME_ROUTE,
    COLLECTION_ROUTE,
    LOGIN_ROUTE,
    MY_COLLECTION_ROUTE,
    PROFILE_ROUTER
} from "../utils/consts";
import {Button, Form, Nav, Dropdown, Image} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {loginUser, out} from "../store/UserReducer"

const NavBar = () => {
    const isAuth = useSelector(state => state.users.isAuth)
    const avatar = useSelector(state => state.users.avatar)
    const history = useNavigate();
    const [searchValue,setSearchValue] = useState("")
    const dispatch = useDispatch()
    const authHandler = () => {
        isAuth
            ?
            dispatch(loginUser(false))
            :
            history(LOGIN_ROUTE);
    }
    return (
        <>
            <Navbar bg="dark" className="mb-2">
                <Container className={"d-flex justify-content"} fluid>

                    <div className={"d-flex justify-content-start"}>
                        <Navbar.Brand style={{color: "white"}}>
                            ANIME &#9773;
                        </Navbar.Brand>
                        <NavLink className={"m-2"} to={ANIME_ROUTE}>Anime</NavLink>
                        <NavLink
                            className={"m-2"}
                            to={ANIME_ROUTE + "/" + (Math.floor(Math.random() * 10000) + 1)}
                        >
                            случайное аниме
                        </NavLink>
                        <NavLink className={"m-2"} to={COLLECTION_ROUTE}>Коллекции</NavLink>
                    </div>
                    <div className={"d-flex justify-content-end align-items-center"}>
                        <Form className="d-flex">
                            <Form.Control
                                value={searchValue}
                                onChange={e=>setSearchValue(e.target.value)}
                                type="search"
                                variant={"dark"}
                                placeholder="Search"
                                className="me-2"
                            />
                            <Nav>
                                <Button
                                    onClick={()=>history(ANIME_ROUTE+"?text="+searchValue)}
                                    variant="dark"
                                >
                                    Поиск
                                </Button>
                            </Nav>
                        </Form>

                        {isAuth
                            ?
                            <Dropdown
                                align="end"
                            >
                                <Dropdown.Toggle
                                    variant={"dark"}
                                >
                                    <Image alt={"avatar"}
                                           style={{height: "40px", width: "40px", borderRadius: "100%"}}
                                           src={process.env.REACT_APP_API_URL + avatar}
                                    />
                                </Dropdown.Toggle>
                                <Dropdown.Menu
                                    variant={"dark"}
                                >
                                    <Dropdown.Item
                                        onClick={() => {
                                            history(PROFILE_ROUTER)
                                        }}
                                    >
                                        Профиль
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => {
                                            history(MY_COLLECTION_ROUTE)
                                        }}
                                    >
                                        Мои коллекции
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => dispatch(out())}>
                                        Выйти
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            :
                            <Button
                                variant="outline-light"
                                onClick={authHandler}
                            >
                                войти
                            </Button>
                        }
                    </div>
                </Container>
            </Navbar>
        </>
    );
};

export default NavBar;