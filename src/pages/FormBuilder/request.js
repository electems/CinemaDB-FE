import fetch from "isomorphic-fetch";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json; charset=utf-8",
  OPTIONS: "",
};

export async function post(url, data) {
  url = "http://localhost:3001/form/EN/shashiform";
  return fetch(await url, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  }).then((response) => response);
}

export async function get(url) {
  return fetch(url, {
    method: "GET",
    headers,
  }).then((response) => response.json());
}
