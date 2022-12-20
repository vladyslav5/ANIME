import React from 'react';
import {Row} from "react-bootstrap";
import AnimeItem from "./AnimeItem";

const AnimeList = ({animes}) => {

    return (
        <Row>
            {animes.map(anime=>(
               <AnimeItem key={anime.id} anime={anime}/>
            ))}
        </Row>
    );
};

export default AnimeList;