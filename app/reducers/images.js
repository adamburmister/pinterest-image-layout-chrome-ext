import * as ActionTypes from '../constants/ActionTypes';
import find from 'lodash.find';

const initialState = [];

export const getImageById = (state, id) => find(state, { id });

const actionsMap = {
  [ActionTypes.ADD_IMAGE](state, { image }) {
    return [...state, image];
  },
  [ActionTypes.SELECT_IMAGE](state, { id }) {
    return [
      ...state,
      {
        ...getImageById(state, id),
        isSelected: true
      }
    ];
  },
  [ActionTypes.DESELECT_IMAGE](state, { id }) {
    return [
      ...state,
      {
        ...getImageById(state, id),
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
