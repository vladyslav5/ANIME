import React, {useEffect, useState} from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import AnimeList from "../Components/AnimeList";
import {getOneCollections} from "../apis/collectionApi";
import {useParams} from "react-router-dom";
import {getOne} from "../apis/animeApi";
import Loading from "../Components/Loading";

const CollectionPage = () => {
    const {_id} = useParams()
    const [collection, setCollection] = useState({animes: []})
    const [loading, setloading] = useState(true)
    const [animes, setAnimes] = useState([])
    useEffect(() => {
        getOneCollections(_id).then(res => {
            setCollection(res)
        })
    }, [])
    useEffect(() => {
        const Animes = collection.animes.map(async (id) => {
                return await getOne(id);
            }
        )
        Promise.all(Animes)
            .then((promises) => {
                setAnimes(promises)
                setloading(false)
            })
    }, [collection])
    return (
        <Container>
            {loading
                ?
                <Loading/>
                :
                <Row>
                    <Card className={"d-flex justify-content-center align-items-center"}>
                        <h2>{collection.name}</h2>
                    </Card>
                    <Col md={12}>
                        <AnimeList animes={animes}/>
                    </Col>
                </Row>}
        </Container>
    );
};

export default CollectionPage;