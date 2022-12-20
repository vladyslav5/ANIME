import React, {useEffect, useRef, useState} from 'react';
import {useParams, useSearchParams} from "react-router-dom";
import Container from "react-bootstrap/Container";
import {Button, Card, Col, Dropdown, Image, Row, Spinner} from "react-bootstrap";
import Comments from "../Components/Comments";
import {addAnime, getMy} from "../apis/collectionApi";
import {getOne} from "../apis/animeApi";
import {useDispatch, useSelector} from "react-redux";
import {_setComments} from "../store/CommentReducer";
import ReactPlayer from "react-player";
import {getAll} from "../apis/commentApi";
import Loading from "../Components/Loading";


const AnimePage = () => {
    const {id} = useParams()
    const commentsRef = useRef();
    const executeScroll = () => {
        commentsRef.current.scrollIntoView()
    }
    const comments = useSelector(state => state.comments.comments)
    const dispatch = useDispatch()
    const [anime, setAnime] = useState()
    const [loading, setLoading] = useState(true)
    const [collections, setCollections] = useState([])
    useEffect(() => {
        getOne(id)
            .then((a) => {
                setAnime(a)
                setLoading(false)
            })
        getAll(id)
            .then((res) => {
                dispatch(_setComments(res))
            })
        getMy().then(res => setCollections(res))

    }, [])
    useEffect(() => {
        setLoading(true)
        getOne(id)
            .then((a) => {
                setAnime(a)
                console.log(a.attributes)
                setLoading(false)
            })
        getAll(id)
            .then((res) => {
                dispatch(_setComments(res))
            })
        getMy().then(res => setCollections(res))

    }, [id])
    const addToCollection = async (_id) => { //col id
        alert(await addAnime(anime.id, _id))
    }
    return (
        <Container>
            {loading
                ?
                <Loading/>
                :
                <Card>
                    <Image
                        height={400}
                        width={"100%"}
                        style={{objectFit:"cover"}}
                        src={anime.attributes.coverImage ? anime.attributes.coverImage.original : "https://kitsu.io/images/default_cover-22e5f56b17aeced6dc7f69c8d422a1ab.png"}
                        alt={"cover"}
                    />
                    <Row>
                        <Col md={4}>
                            <Image
                                height={400}
                                alt={"img"}
                                src={anime.attributes.posterImage.large}/>
                            <Button
                                onClick={executeScroll}
                                className={'mt-2'}
                                variant={"outline-light"}
                            >Написать Отзыв</Button>
                            <Dropdown
                                className={'mt-2'}
                                variant={"danger"}
                            >
                                <Dropdown.Toggle
                                    variant="outline-light"
                                >
                                    +Добавить в коллекцию
                                </Dropdown.Toggle>
                                <Dropdown.Menu
                                    variant="dark"
                                >
                                    {collections.map(collection =>
                                        <Dropdown.Item
                                            onClick={() => addToCollection(collection._id)}
                                            key={collection.name}>
                                            {collection.name}
                                        </Dropdown.Item>)}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                        <Col md={8}>
                            <h2>{anime.attributes.canonicalTitle}</h2>
                            <p>Возрастной
                                рейтинг: {anime.attributes.ageRating + " (" + anime.attributes.ageRatingGuide + ")"} </p>
                            <p>Описание: {anime.attributes.description}</p>
                            <p>Тип: {anime.attributes.showType}</p>
                            <p>количество епизодов:{anime.attributes.episodeCount}</p>
                        </Col>
                    </Row>

                    <div className={"d-flex justify-content-center"}>
                        <ReactPlayer
                            url={"https://www.youtube.com/watch?v=" + anime.attributes.youtubeVideoId}
                        />
                    </div>
                    {/*<Image*/}
                    {/*    src={anime.attributes.coverImage ? anime.attributes.coverImage.small : "https://kitsu.io/images/default_cover-22e5f56b17aeced6dc7f69c8d422a1ab.png"}*/}
                    {/*    alt={"cover"}*/}
                    {/*/>*/}
                    <div ref={commentsRef}>
                        <Comments comments={comments}/>
                    </div>
                </Card>
            }
        </Container>
    );
};

export default AnimePage;