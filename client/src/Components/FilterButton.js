import React from 'react';
import {Dropdown} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";
import {ANIME_ROUTE} from "../utils/consts";

const FilterButton = ({genres, filtername}) => {
    const history = useNavigate()
    const location = useLocation()
    return (
        <Dropdown className={"m-2"}>
            <Dropdown.Toggle variant="outline-light">
                {filtername}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {genres.map(genre =>
                    <Dropdown.Item
                        onClick={() =>
                            history(ANIME_ROUTE + "?genre=" + genre.attributes.name)
                        }
                        key={genre.attributes.name}
                    >{genre.attributes.name}</Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default FilterButton;