import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async updatedObject => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.put(`${baseUrl}/${updatedObject.id}`, updatedObject, config)
  return request.then(response => response.data)
}

const deleteBlog = async id => {
  const config = {
    headers: { Authorization: token },
  }
  return axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, create, update, setToken, deleteBlog }