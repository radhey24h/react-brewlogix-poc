import productConstants from './constants'

export function getProducts() {
    let products = (sessionStorage.getItem('products')) ? JSON.parse(sessionStorage.getItem('products')) : [];
    return {
        type: productConstants.GET_PRODUCTS,
        payload: products
    }
}

export function addProduct(product) {
    return {
        type: productConstants.ADD_PRODUCTS,
        payload: product
    }
}

export function deleteProduct(id) {
    return {
        type: productConstants.DELETE_PRODUCT,
        payload: id
    }
}

export function updateProduct(product) {
    return {
        type: productConstants.EDIT_PRODUCT,
        payload: product
    }

}
