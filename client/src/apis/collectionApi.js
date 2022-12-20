import {$authHost, $host} from "./index";

export const getAll = async () => {
    const {data} = await $host.get('/collection/')
    return data
}
export const getOneCollections= async (id) => {
    const {data} = await $host.get('/collection/'+id)
    return data
}
export const create = async (collections) => {
    const {data} = await $authHost.post('/collection/create',collections)
    return data
}
export const getMy = async () => {
    const {data} = await $authHost.get('/collection/my')
    return data
}
export const deleteColletion = async (id) => {
    const {data} = await $host.delete('/collection/'+id)
    return data
}
export const addAnime = async (animeId,collectionId) => {
    const {data} = await $authHost.patch('/collection/add/'+collectionId,{animeId})
    return data
}