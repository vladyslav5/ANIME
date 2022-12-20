import React, {useState} from 'react';
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, PROFILE_ROUTER, REGISTRATION_ROUTE} from "../utils/consts";
import Container from "react-bootstrap/Container";
import {Button, Card, Form} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {loginUser, setAvatar} from "../store/UserReducer";
import {getInfo, login, registration} from "../apis/userApi";


const AuthPage = () => {
    const dispatch = useDispatch()
    const history = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const click = async () => {
        if (isLogin) {
            const user = await login(email, password)
            dispatch(loginUser(user))
            const {avatar} = await  getInfo(user._id)
            dispatch(setAvatar(avatar))
            history(PROFILE_ROUTER)

        } else {
            const user = await registration(email, password)
            dispatch(loginUser(user))
            history(PROFILE_ROUTER)
        }

    }
    return (
        <Container
            style={{height: window.innerHeight - 54}}
            className={"d-flex justify-content-center align-items-center"}
        >
            <Card
                style={{width: "500px"}}
            >
                <h2 className={"m-auto"}>{isLogin ? "Вход" : "Регистрация"}</h2>
                <Form
                    className={"d-flex flex-column   m-5"}
                >
                    <Form.Control
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className={"mt-3"}
                        placeholder={"Емейл"}
                    />
                    <Form.Control
                        type={"password"}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        variant={"dark"}
                        className={"mt-3"}
                        placeholder={"Пароль"}
                    />
                    <Form.Check
                        className={"m-2"}
                        type={"checkbox"}
                        label={"Запомнить меня"}/>
                    <Button
                        variant={"outline-light"}
                        className={"mt-2"}
                        onClick={click}>
                        {isLogin ? "Вход" : "Зарегистрироваться"}
                    </Button>
                    <NavLink
                        to={isLogin ? REGISTRATION_ROUTE : LOGIN_ROUTE}>{isLogin ? "Зарегистрировать аккаунт" : "Войти"}</NavLink>
                </Form>

            </Card>
        </Container>

    );
};

export default AuthPage;