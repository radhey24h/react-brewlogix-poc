import productReducer from './product.reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({ products: productReducer });
export default rootReducer;