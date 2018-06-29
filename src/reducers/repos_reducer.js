import merge from 'lodash/merge';
import {
  RECEIVE_ALL_REPOS,
  RECEIVE_ALL_CONTRIBUTORS
} from '../actions/repos_actions';

const reposReducer = (state = {}, action) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_ALL_REPOS:
      return action.repos;
    case RECEIVE_ALL_CONTRIBUTORS:
      return merge({}, state, { [action.contributors.repo]: action.contributors.count });
    default:
      return state;
  }
};

export default reposReducer;
