import repos from './repos_reducer';
import { combineReducers } from 'redux';

const entitiesReducer = combineReducers({ repos });

export default entitiesReducer;
