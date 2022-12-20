import {$anime} from "./index";

export const getAll = async (page, limit, text,genre) => {
   if(text && genre){
       const {data} = await $anime.get(`api/edge/anime?page[limit]=${limit}&page[offset]=${[(page - 1) * limit]}&filter[categories]=${genre}&filter[text]=${text}`)
       return data
   }
   else if(text){
       const {data} = await $anime.get(`api/edge/anime?page[limit]=${limit}&page[offset]=${[(page - 1) * limit]}&filter[text]=${text}`)
       return data
   }
   else if(genre){
       const {data} = await $anime.get(`api/edge/anime?page[limit]=${limit}&page[offset]=${[(page - 1) * limit]}&filter[categories]=${genre}`)
       return data
   }else{
       const {data} = await $anime.get(`api/edge/anime?page[limit]=${limit}&page[offset]=${[(page - 1) * limit]}`)
       return data
   }
}
export const getOne = async (id) => {
    const {data} = await $anime.get("api/edge/anime/" + id)

    return data.data
}
export const getGenres = async () => {
    const {data} = await $anime.get("api/edge/genres?page[limit]=62")
    return data
}
