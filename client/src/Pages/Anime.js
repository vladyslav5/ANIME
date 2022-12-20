import React, {useEffect, useState} from 'react';
import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";
import AnimeList from "../Components/AnimeList";
import AnimeFilter from "../Components/AnimeFilter";
import {getAll} from "../apis/animeApi";
import Loading from "../Components/Loading";
import {useLocation} from "react-router-dom";

const Anime = () => {
    const location = useLocation()
    const {search} = location
    const params = new URLSearchParams(search)
    const [animes, setAnimes] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalCount, setTotalCount] = useState(1)
    const [fetching, setFetching] = useState(true)
    const fetch = () => {
        const text = params.get("text")
        const genre = params.get("genre")
        if (fetching) {
            getAll(currentPage, 10, text,genre).then((res) => {
                setAnimes([...animes, ...res.data])
                setTotalCount(res.meta.count)
                setCurrentPage(currentPage + 1)

            }).finally(() => {
                setFetching(false)
            })

        }
    }
    useEffect(() => {
        fetch()
    }, [fetching])
    useEffect(() => {
        setFetching(true)
        setAnimes([])
        setCurrentPage(1)
    }, [location.search])
    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [])
    const scrollHandler = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100
            && animes.length < totalCount) {
            console.log(true)
            setFetching(true)
        }
    }

    return (
        <Container>
            <Row class={"d-flex column-reverse"}>
                <Col md={9}>
                    <AnimeList animes={animes}/>
                    {fetching && <Loading/>}
                </Col>
                <Col md={3}>
                    <AnimeFilter/>
                </Col>
            </Row>
        </Container>
    );
};

export default Anime;