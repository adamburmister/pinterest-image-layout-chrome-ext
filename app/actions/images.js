import * as types from '../constants/ActionTypes';

export function addImage(image) {
  return { type: types.ADD_IMAGE, image };
}

export function replaceImages(images) {
  return { type: types.REPLACE_IMAGES, images };
}

export function selectImage(id) {
  return { type: types.SELECT_IMAGE, id };
}

export function deselectImage(id) {
  return { type: types.DESELECT_IMAGE, id };
}

export function toggleImageSelection(id) {
  return { type: types.TOGGLE_IMAGE_SELECTION, id };
}
