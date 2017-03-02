import { GET_MAINTAINERS, GET_MAINTAINERS_SUCCESS, GET_MAINTAINERS_FAIL } from './maintainers.constants';


export function getMaintainers() {
  return {
    type: GET_MAINTAINERS,
  };
}

export function getMaintainersSuccess(dataValue) {
  return {
    type: GET_MAINTAINERS_SUCCESS,
    data: dataValue,
  };
}

export function getMaintainersError(data) {
  return {
    type: GET_MAINTAINERS_FAIL,
    error: data,
  };
}

