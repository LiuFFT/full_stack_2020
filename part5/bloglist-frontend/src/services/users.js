import axios from 'axios'
const baseUrl = '/api/users'

const getById = (id) => {
    const request = axios.get(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

export default { getById }