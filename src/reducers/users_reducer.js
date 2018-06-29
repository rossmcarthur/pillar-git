import merge from 'lodash/merge';
import { RECEIVE_INTERNAL_CONTRIBUTIONS  } from '../actions/repos_actions';

const usersReducer = (state = {}, action) => {
  Object.freeze(state);

  switch(action.type) {
      case RECEIVE_INTERNAL_CONTRIBUTIONS:
      return merge({}, state, action.contributors);
    default:
      return state;
  }
};

export default usersReducer;
