import merge from 'lodash/merge';
import {  RECEIVE_ALL_CONTRIBUTORS, RECEIVE_INTERNAL_CONTRIBUTIONS  } from '../actions/repos_actions';

const contributorsReducer = (state = {}, action) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_ALL_CONTRIBUTORS:
      return merge({}, state, { [action.contributors.repo]: action.contributors.count });
    default:
      return state;
  }
};

export default contributorsReducer;
