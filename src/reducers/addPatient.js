import { ADD_PATIENT, CHANGE_STATUS } from '../actions/types';

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_PATIENT:
      return [...state, payload];
    case CHANGE_STATUS:
      return [...state];
    default:
      return state;
  }
}
