import FetchClient from "../api/FetchClient";

export const getAllProductsAPI = () => FetchClient("/api/products", {
    method : "GET"
})