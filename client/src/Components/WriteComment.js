import React, {useState} from 'react';
import {Button, Form, Row} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {add, answer} from "../apis/commentApi";
import {useDispatch} from "react-redux";
import {addAnswer, addComment, setAnsweringComment} from "../store/CommentReducer";

const WriteComment = ({placeholder, isAnswer, commentId, collapse, answerOn, username}) => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const [value, setValue] = useState("")
    const addCommentHandler = async () => {
        if (isAnswer) {
            const text = answerOn === commentId ? value : "@" + username + " " + value
            dispatch(addAnswer({
                _id: answerOn,//commentId
                answer: await answer(id, answerOn, {text: text})
            }))
            dispatch(setAnsweringComment({}))
            setValue("")
            collapse(true)

        } else {
            add(id, {text: value})
                .then((res) => {
                    console.log(res, "add")
                    dispatch(addComment(res))
                })
            setValue("")
        }

    }
    return (
        <Row className={"m-2"}>
            <Form
                className={'col-10 mt-2'}
            >
                <Form.Control
                    value={value}
                    placeholder={placeholder}
                    onChange={e => setValue(e.target.value)}
                />
            </Form>
            <Button
                className={'col-2 mt-2'}
                variant={"outline-light"}
                onClick={addCommentHandler}
            >
                Добавить
            </Button>
        </Row>
    );
};

export default WriteComment;