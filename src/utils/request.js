import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  Accept: 'application/json',
})

export const request = ({ ...options }) => {
  if (localStorage.getItem('token')) {
    client.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
      'token',
    )}`
  }

  const onSuccess = (response) => response
  const onError = (error) => {
    throw error
  }

  return client(options).then(onSuccess).catch(onError)
}
