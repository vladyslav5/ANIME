import React from 'react';
import Container from "react-bootstrap/Container";
import {useSelector} from "react-redux";
import OneComment from "./OneComment";
import WriteComment from "./WriteComment";

const Comments = ({comments}) => {
    const isAuth = useSelector(state => state.users.isAuth)
    return (
        <Container>
            <hr/>
            <h2>Комментарии</h2>
            {isAuth
                &&
                <WriteComment placeholder={"Написать комментарий"} isAnswer={false}/>
            }
            {comments.length===0 && <div className={"d-flex justify-content-center align-items-center"}>Здесь ничего нету </div>}
            {
                comments.map(
                    comment =>
                        <OneComment
                            answerOn={comment._id}
                            isAnswer={false}
                            key={comment._id}
                            comment={comment}
                        />
                )
            }
        </Container>
    );
};

export default Comments;