import React, {useEffect, useState} from 'react';
import Container from "react-bootstrap/Container";
import {Card, Col, Collapse, Image, Row} from "react-bootstrap";
import {NavLink, useParams} from "react-router-dom";
import {COLLECTION_ROUTE, MY_COLLECTION_ROUTE} from "../utils/consts";
import {useDispatch, useSelector} from "react-redux";
import {getInfo} from "../apis/userApi";
import EditeProfile from "../Components/modals/EditeProfile";
import {setAvatar} from "../store/UserReducer";
import CreateCollection from "../Components/modals/CreateCollection";

const ProfilePage = () => {
    const [user, setUser] = useState({collections: []})
    let userId = useParams()
    let [isMy, setIsmy] = useState(false)
    const dispatch = useDispatch()
    const myId = useSelector(state => state.users.user._id)
    useEffect(() => {
        if (!userId._id) {
            setIsmy(true)
            getInfo(myId).then(r => {
                setUser(r)
                const {avatar} = r
                dispatch(setAvatar(avatar))
            })
        } else {
            getInfo(userId._id).then(r => {
                setUser(r)
            })
        }
    }, [])
    const [showEdite, setShowEdite] = useState(false)
    const [isCollapse, setIsCollapse] = useState(false)
    const [showCreateCollection, setShowCreateCollection] = useState(false)
    const onHideCollections = () => {
        setShowCreateCollection(!showCreateCollection)
    }
    const onHideEdite = () => {
        setShowEdite(!showEdite)
    }
    useEffect(() => {
        if (!userId._id) {
            setIsmy(true)
            getInfo(myId).then(r => {
                setUser(r)
                const {avatar} = r
                dispatch(setAvatar(avatar))
            })
        } else {
            getInfo(userId._id).then(r => {
                setUser(r)
            })
        }}, [showEdite, showCreateCollection])

    return (
        <Container>
            <EditeProfile show={showEdite} onHide={onHideEdite}/>
            <CreateCollection show={showCreateCollection} onHide={onHideCollections}/>
            <Row>
                <Col md={9}>
                    <Card>
                        <Image
                            className={"align-self-center"}
                            style={{width: "900px", height: "450"}}
                            alt={"head"}
                            src={process.env.REACT_APP_API_URL + user.header}
                        />
                        <div
                            className={"d-flex justify-content-start align-items-center"}
                            style={{position: "absolute", top: "375px", left: "25px", margin: "7px 7px 7px 0"}}
                        >
                            <Image
                                style={{
                                    width: "300px",
                                    height: "300px",
                                    borderRadius: "100%",
                                    border: "2px solid",
                                    float: "left",
                                }}
                                src={process.env.REACT_APP_API_URL + user.avatar}
                                alt={"avatar"}
                            />

                            <div className={"mt-5 ms-4"}>
                                <h2>{user.email}</h2>
                                <p>на сайте с {user.regDate}</p>
                                <hr/>
                            </div>
                        </div>

                    </Card>
                </Col>
                <Col md={3}>
                    {isMy
                        &&
                        <Card
                            className={"m-3"}
                            style={{cursor: "pointer"}}
                            onClick={() => setShowEdite(true)}
                        >
                            <div>
                                &#8634; Редактровать Профиль
                            </div>
                        </Card>}
                    <NavLink to={MY_COLLECTION_ROUTE}><h3>Коллекции</h3></NavLink>
                    <Card>

                        <h5
                            style={{cursor: "pointer"}}
                            onClick={() => {
                                setIsCollapse(!isCollapse)
                            }}
                        >
                            &#8744; Развернуть
                        </h5>
                        <Collapse in={isCollapse}>
                            <div>
                                {user.collections.map(
                                    collection =>
                                        <p>
                                            <NavLink to={COLLECTION_ROUTE + '/' + collection._id}>
                                                {collection.name}
                                            </NavLink>
                                        </p>)}

                                {isMy &&
                                    <p
                                        className={"m-3"}
                                        style={{cursor: "pointer"}}
                                        onClick={() => setShowCreateCollection(true)}>
                                        &#9776; Добавить коллекцию
                                    </p>}
                            </div>
                        </Collapse>

                    </Card>
                </Col>

            </Row>

        </Container>
    )

};

export default ProfilePage;