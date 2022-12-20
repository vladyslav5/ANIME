import axios from "axios";

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})
const $anime = axios.create({
    baseURL:"https://kitsu.io"
})
const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const authInterceptors = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptors)

export {
    $anime,
    $host,
    $authHost
}