import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

// eslint-disable-next-line
const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => {
        return response.data
    })
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => {
        return response.data
    })
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => {
        return response.data
    })
}

// eslint-disable-next-line
export default {create , update, getAll}