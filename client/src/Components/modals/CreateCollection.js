import React, {useState} from 'react';
import {Button, Form, Modal, Row} from "react-bootstrap";
import {create} from "../../apis/collectionApi";


const CreateCollection = ({show, onHide}) => {
    const [value, setValue] = useState("")
    const closeHandler = () => {
        setValue("")
        onHide()
    }
    const addHandler = async () => {
        if (!value) alert("Введите название")
        else {
            const res = await create({name:value})
            alert(res)

        }
        closeHandler()


    }
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header>
                <Modal.Title>
                    Создать коллекцию
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Form>
                        <Form.Control
                            value={value}
                            onChange={e => setValue(e.target.value)}
                            placeholder={"Введите имя коллекции"}
                        >
                        </Form.Control>
                    </Form>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant={"outline-light"}
                    className={"m-2"}
                    onClick={closeHandler}
                >
                    Закрыть
                </Button>
                <Button
                    variant={"outline-light"}
                    className={"m-2"}
                    onClick={addHandler}
                >
                    Добавить
                </Button>

            </Modal.Footer>

        </Modal>
    )
        ;
};

export default CreateCollection;