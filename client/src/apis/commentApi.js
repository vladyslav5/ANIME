import {$authHost, $host} from "./index";

export const getAll = async (id) => {
    const {data} = await $host.get('/anime/' + id + '/comments/')
    return data
}
export const answer = async (id,commentId, answer) => {
    const {data} = await $authHost.post('/anime/' + id + '/comment/' + commentId, answer)
    return data
}
export const add = async (_id, comment) => {
    const {data} = await $authHost.post('anime/' + _id + '/comment/', comment)
    return data
}
// export const deleteColletion = async (id) => {
//     const {data} = await $host.delete('/collection/' + id)
//     return data
// }
