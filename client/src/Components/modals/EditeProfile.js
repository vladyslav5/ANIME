import React, {useState} from 'react';
import {Button, Form, Image, Modal} from "react-bootstrap";
import {edite} from "../../apis/userApi";

const EditeProfile = ({show, onHide}) => {
    const [avatar, setAvatar] = useState(null)
    const [header, setHeader] = useState(null)
    const selectAvatar = e => {
        setAvatar(e.target.files[0])
    }
    const selectHeader = e => {
        setHeader(e.target.files[0])
    }
    const closeHandler = () => {
        setAvatar(null)
        setHeader(null)
        onHide()
    }
    const saveHandler = async () => {
        if (!avatar || !header) alert("Заргрузите фото")
        else {
            const formData = new FormData()
            formData.append("avatar",avatar)
            formData.append("header",header)
            const res = await edite(formData)


        }
        closeHandler()
    }
    return (
        <Modal
            show={show}
            onHide={onHide}

        >
            <Modal.Header>
                <Modal.Title> Шапка и аватарка</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <Image width={450}
                           height={225}
                           src={header && URL.createObjectURL(header)}
                    />
                </div>
                <div
                    style={{position: "absolute", top: "135px", left: "25px"}}
                >
                    <Image
                        style={{
                            width: "150px",
                            height: "150px",
                            borderRadius: "100%",
                            border: "1px solid",
                        }}
                        src={avatar && URL.createObjectURL(avatar)}
                    />
                </div>
                <Form className={"mt-5"}>
                    <Form.Label>Аватарка</Form.Label>
                    <Form.Control
                        type={"file"}
                        onChange={e => selectAvatar(e)}
                    />
                    <Form.Label>Шапка</Form.Label>
                    <Form.Control
                        type={"file"}
                        onChange={e => selectHeader(e)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={closeHandler}
                    variant={"outline-light"}
                >
                    Закрыть</Button>
                <Button
                    onClick={saveHandler}
                    variant={"outline-light"}
                >
                    Сохранить изменения</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditeProfile;