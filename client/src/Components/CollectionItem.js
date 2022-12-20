import React, {useEffect, useState} from 'react';
import {Card, Row} from "react-bootstrap";
import AnimeItem from "./AnimeItem";
import {NavLink, useNavigate} from "react-router-dom";
import {COLLECTION_ROUTE} from "../utils/consts";
import {getOne} from "../apis/animeApi";
import Loading from "./Loading";

const CollectionItem = ({collection}) => {
    const history = useNavigate()
    const [animes, setAnimes] = useState([])
    const [load, setLoad] = useState(true)
    const [showAnimes, setShowAnimes] = useState([])
    useEffect(() => {
        const Animes = collection.animes.map(async (id) => {
                return await getOne(id);

            }
        )
        Promise.all(Animes).then((promises) => {
            setAnimes(promises)
            setShowAnimes(promises.slice(0,4))
            setLoad(false)
        })
    }, [])


    return (<Row>
        {load ? <Loading/> :
            <>
                <NavLink to={COLLECTION_ROUTE + '/' + collection._id}>
                    <h2
                        className={"d-flex justify-content-center"}>{collection.name}
                    </h2>
                </NavLink>
                {showAnimes.map(anime => <AnimeItem key={anime.id} anime={anime}/>)}
                {collection.animes.length > 4
                    &&
                    <Card
                        style={{cursor: "pointer"}}
                        className={"d-flex justify-content-center align-items-center"}
                        onClick={() => history(COLLECTION_ROUTE + '/' + collection._id)}
                    >
                        <h2>Еще</h2>
                    </Card>
                }
                <hr/>
            </>}

    </Row>);
};

export default CollectionItem;