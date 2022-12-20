import React, {useEffect, useState} from 'react';
import {getMy} from "../apis/collectionApi";
import {Card, Container} from "react-bootstrap";
import CollectionItem from "../Components/CollectionItem";
import CreateCollection from "../Components/modals/CreateCollection";

const MyCollections = () => {
    const [myCollections, setMyCollections] = useState([])
    useEffect(() => {
        getMy().then(res => setMyCollections(res))
    }, [])

    const [showCreateCollection, setShowCreateCollection] = useState(false)
    const onHide = () => {
        setShowCreateCollection(!showCreateCollection)
    }
    useEffect(() => {
        getMy().then(res => setMyCollections(res))
    }, [showCreateCollection])
    return (
        <Container>
            <CreateCollection
                show={showCreateCollection}
                onHide={onHide}
            />
            <Card
                className={"m-3"}
                style={{cursor: "pointer"}}
                onClick={() => setShowCreateCollection(true)}
            >
                <div>
                    &#9776; Добавить коллекцию
                </div>
            </Card>
            <hr/>
            {myCollections.map(
                collection =>
                    <CollectionItem key={collection.name} collection={collection}/>
            )}
        </Container>
    );
};

export default MyCollections;