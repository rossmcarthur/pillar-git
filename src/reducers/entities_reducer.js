import repos from './repos_reducer';
import contributors from './contributors_reducer';
import users from './users_reducer';
import { combineReducers } from 'redux';

const entitiesReducer = combineReducers({ repos, contributors, users });

export default entitiesReducer;
