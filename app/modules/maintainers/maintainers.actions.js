import { ACTION_TYPES } from './maintainers.constants';


export function getMaintainers() {
  return {
    type: ACTION_TYPES.GET,
  };
}

export function getMaintainersSuccess(dataValue) {
  return {
    type: ACTION_TYPES.GET_SUCCESS,
    data: dataValue,
  };
}

export function getMaintainersError(data) {
  return {
    type: ACTION_TYPES.GET_FAIL,
    error: data,
  };
}

