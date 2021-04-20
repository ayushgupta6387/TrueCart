import { API } from "../config";


// create a method to get all the products
export const getProducts = sortBy => {
    // fetch 6 products every time in descending order
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

// pull categories from database and populate

export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};