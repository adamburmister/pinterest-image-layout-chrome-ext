import * as ActionTypes from '../constants/ActionTypes';
import remove from 'lodash.remove';

const initialState = [];

// Modify an image in the state, merging in changes
const merge = (state, id, changes) => {
  const target = remove(state, { id })[0];
  return [...state, { ...target, ...changes }];
};

const actionsMap = {
  [ActionTypes.ADD_IMAGE](state, { image }) {
    return [...state, image];
  },
  [ActionTypes.SELECT_IMAGE](state, { id }) {
    return merge(state, id, { isSelected: true })
  },
  [ActionTypes.DESELECT_IMAGE](state, { id }) {
    return merge(state, id, { isSelected: false })
  }
};

export default function images(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}
