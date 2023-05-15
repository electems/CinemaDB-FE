/* eslint-disable no-undef */
import fetch from 'isomorphic-fetch'

const headers = {
  Authorization: `Bearer ${localStorage.getItem('@cinimaDb:Token')}`,
  'Content-type': 'application/json'
}

export async function post (url, data) {
  url = 'http://localhost:3001/form/EN/shashiform'
  return fetch(await url, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  }).then((response) => response)
}

export async function get (url) {
  return fetch(url, {
    method: 'GET',
    headers
  }).then((response) => response.json())
}
