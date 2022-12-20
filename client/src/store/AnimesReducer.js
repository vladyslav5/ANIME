import {createSlice} from "@reduxjs/toolkit";

const AnimeInitialState = {
    anime: {
        attributes:
            {
                posterImage: {large: ""},
                ageRating: {},
                canonicalTitle: {},
                description: {},
                showType: {}, status: {},
                youtubeVideoId: {}
            }
    }


}

const AnimeSlice = createSlice({
    name: "animes",
    initialState: AnimeInitialState,
    reducers: {}
})

export default AnimeSlice.reducer
export const {r} = AnimeSlice.actions