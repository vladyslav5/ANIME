import AppRouter from "./Components/AppRouter";
import {BrowserRouter} from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./Components/NavBar";
import {Button, Spinner} from "react-bootstrap";
import {useEffect, useState} from "react";
import {check, getInfo} from "./apis/userApi";
import {useDispatch} from "react-redux";
import {loginUser, setAvatar} from "./store/UserReducer";
import Loading from "./Components/Loading";

function App() {
    const [loading, setLodading] = useState(true)
    const dispatch = useDispatch()
    useEffect(() => {
        check().then(async (data) => {
            let {avatar} = await getInfo(data._id)
            dispatch(setAvatar(avatar))
            dispatch(loginUser(data))
            // console.log("u",data)
        }).finally(() => setLodading(false))
    }, [])
    if (loading) {
        return <Loading/>
    }
    return (
        <BrowserRouter>
            <NavBar/>
            <AppRouter/>
            <Button
                variant={"outline-light"}
                onClick={() => window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                })}>^</Button>
        </BrowserRouter>
    );
}

export default App;
