import React, {useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import CollectionItem from "../Components/CollectionItem";
import {getAll} from "../apis/collectionApi";

const Collections = () => {
    const [collections, setCollections] = useState([])

    useEffect(() => {
        getAll().then(res => setCollections(res))
    }, [])
    return (
        <Container>
            <hr/>
            {collections.map(
                collection =>
                    <CollectionItem key={collection.name} collection={collection}/>
            )}
        </Container>
    );
};

export default Collections;