const axios = require("axios");

export function getItems(items) {
  return axios.request({
    url: `/${items}`,
    method: "GET",
    baseURL: "https://jsonplaceholder.typicode.com/",
    responseType: "json",
  });
}

export function getItemsById(items, id) {
  return axios.request({
    url: `/${items}/${id}`,
    method: "GET",
    baseURL: "https://jsonplaceholder.typicode.com/",
    responseType: "json",
  });
}