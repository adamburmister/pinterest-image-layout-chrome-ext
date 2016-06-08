import * as ActionTypes from '../constants/ActionTypes';
import remove from 'lodash.remove';

const initialState = [];

const removeImageById = (state, id) => remove(state, { id })[0];

const actionsMap = {
  [ActionTypes.ADD_IMAGE](state, { image }) {
    return [...state, image];
  },
  [ActionTypes.SELECT_IMAGE](state, { id }) {
    const target = removeImageById(state, id)
    return [
      ...state,
      {
        ...target,
        isSelected: true
      }
    ];
  },
  [ActionTypes.DESELECT_IMAGE](state, { id }) {
    const target = removeImageById(state, id)
    return [
      ...state,
      {
        ...target,
        isSelected: false
      }
    ];
  }
};

export default function images(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}
