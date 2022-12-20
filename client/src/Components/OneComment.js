import React, {useState} from 'react';
import Container from "react-bootstrap/Container";
import {Col, Collapse, Image, Row} from "react-bootstrap";
import WriteComment from "./WriteComment";
import {useDispatch, useSelector} from "react-redux";
import {setAnsweringComment} from "../store/CommentReducer";
import {NavLink} from "react-router-dom";
import {PROFILE_ROUTER} from "../utils/consts";

const OneComment = ({comment, isAnswer,answerOn}) => {

    const dispatch = useDispatch()
    const answeringComment = useSelector(state => state.comments.answeringComment)
    const isAuth = useSelector(state => state.users.isAuth)
    const [answering, setAnswering] = useState(false)
    const [isCollapsed, setIsCollapsed] = useState(false)
    const answerHandler = () => {
        dispatch(setAnsweringComment(comment._id))
    }
    const collapseHandler = (boll) => {
        setIsCollapsed(boll)
    }
    return (
        <Container>
            <hr/>
            <Row>
                <Col md={1}>
                    <Image alt={"avatar"}
                           src={process.env.REACT_APP_API_URL + comment.userId.avatar}
                           style={{borderRadius: "100%", width: "75px"}}
                    />
                </Col>
                <Col md={11}>
                    <NavLink to={PROFILE_ROUTER + '/' + comment.userId._id}>
                        <h4
                            style={{color: "gray"}}>{comment.userId.email}
                        </h4>
                    </NavLink>
                    <div style={{fontSize: "1.2em"}}>
                        {comment.text}
                    </div>

                </Col>
            </Row>

            {isAuth
                &&
                <div>{
                    answeringComment === comment._id
                        ?
                        <WriteComment
                            username={comment.userId.email}
                            commentId={comment._id}
                            placeholder={"Написать ответ"}
                            isAnswer={true}
                            answerOn={answerOn}
                            collapse={collapseHandler}
                        />
                        :
                        <a style={{cursor: "pointer"}}
                           className={"mt-2"}
                           onClick={answerHandler}
                        >
                            <h5>Ответить</h5></a>

                }
                </div>
            }
            {!isAnswer && <div> {comment.answers.length > 0
                &&
                <div>
                    <div
                        style={{cursor: "pointer"}}
                        onClick={()=>collapseHandler(!isCollapsed)}
                    >
                        {"Показать все ответы(" + comment.answers.length + ")"}
                    </div>
                    <Collapse in={isCollapsed} className={"m-3"}>
                        <div>
                            {comment.answers.map(answer =>
                                <OneComment key={answer._id}
                                            comment={answer}
                                            isAnswer={true}
                                            answerOn={comment._id}
                                />
                            )}
                        </div>
                    </Collapse>
                </div>
            }
            </div>}

        </Container>
    );
};

export default OneComment;