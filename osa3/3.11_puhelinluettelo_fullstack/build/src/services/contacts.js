import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

export const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
};

export const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
};

export const deleteContact = id => {
  axios.delete(`${baseUrl}/${id}`);
};

export const updateContact = (newObject) => {
  const request = axios.put(`${baseUrl}/${newObject.id}`, newObject);
  return request.then(response => response.data);
};