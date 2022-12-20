import React from 'react';
import {Card, Col} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {ANIME_ROUTE} from "../utils/consts";

const AnimeItem = ({anime}) => {
    const history = useNavigate()
    const animeHandler = () => {
        console.log("h")
        history(ANIME_ROUTE+'/'+anime.id)
    }
    return (
        <Col md={3} onClick={animeHandler}>
            <Card style={{width: "auto"}}>
                <Card.Img variant="top" src={anime.attributes.posterImage.medium}/>
                <Card.Body>
                    <Card.Title>{anime.attributes.canonicalTitle}</Card.Title>
                    <Card.Text>
                        Rating
                    </Card.Text>

                </Card.Body>
            </Card>
        </Col>
    );
};

export default AnimeItem;