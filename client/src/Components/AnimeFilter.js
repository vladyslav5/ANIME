import React, {useEffect, useState} from 'react';
import {Card, Container, Form} from "react-bootstrap";
import FilterButton from "./FilterButton";
import Loading from "./Loading";
import {getGenres} from "../apis/animeApi";


const AnimeFilter = () => {
    const [loading, setLoading] = useState(true)
    const [genres,setGenres] = useState()
    useEffect(()=>{
        getGenres()
            .then((res)=>{
            setGenres(res.data)
                console.log(res)
        })
            .finally(()=>{
                setLoading(false)
            })
    },[])
    const [value, setValue] = useState(0);
    return (
        <Container className={"d-flex flex-column"}>
            {loading ? <Loading/> :
                <Card>
                    <h2>Фильтр</h2>
                    {/*<h4>Год</h4>*/}
                    {/*<Form>*/}
                    {/*    <Form.Range min={1959} max={2022}/>*/}

                    {/*</Form>*/}
                    <h4>Жанр</h4>
                    <FilterButton genres={genres} filtername={"Выберите Жанр"}/>
                    {/*<h4>Тип</h4>*/}
                    {/*/!*<FilterButton genres={types} filtername={"Выберите Тип"}/>*!/*/}
                </Card>}
        </Container>
    );
};

export default AnimeFilter;