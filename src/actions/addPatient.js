import { v4 as uuidv4 } from 'uuid';
import { ADD_PATIENT, CHANGE_STATUS } from './types';

export const addPatient = (name, disease, date, treatement, status) => (
  dispatch
) => {
  const id = uuidv4();

  dispatch({
    type: ADD_PATIENT,
    payload: {
      name: name,
      disease: disease,
      date: date,
      treatement: treatement,
      id: id,
      status: status,
    },
  });
};

export const changeStatus = () => (dispatch) => {
  //  const id = uuidv4();

  dispatch({
    type: CHANGE_STATUS,
  });
};
