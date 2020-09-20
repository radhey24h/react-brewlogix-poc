import productConstants from "../actions/constants"

export default (state = [], action) => {
     
    switch (action.type) {
        case productConstants.GET_PRODUCTS:
            return action.payload;

        case productConstants.ADD_PRODUCTS:
            let stateCopy = [...state, action.payload];
            sessionStorage.setItem('products', JSON.stringify(stateCopy));
            return stateCopy;

        case productConstants.EDIT_PRODUCT:
            let products = [...state, action.payload];
            products = state.map((product) => {
                const { id, name, grade, school } = action.payload;
                if (product.id === id) {
                    // product.name = name;
                    // product.grade = grade;
                    // product.school = school;
                }
                return product;
            })
            sessionStorage.setItem('products', JSON.stringify(products));
            return products;

        case productConstants.DELETE_PRODUCT:
            let stateC = [...state, action.payload];
            stateC = state.filter(x => x.id !== action.payload);
            sessionStorage.setItem('products', JSON.stringify(stateC));
            return stateC

        default:
            return state;

    }
}
