import { GET_USERS, GET_USERS_SUCCESS, GET_USERS_FAIL } from './user.constants';


export function getUsers(localeValue = 'en') {
  return {
    type: GET_USERS,
    locale: localeValue,
  };
}

export function getUsersSuccess(dataValue) {
  return {
    type: GET_USERS_SUCCESS,
    data: dataValue,
  };
}

export function getUsersError(data) {
  return {
    type: GET_USERS_FAIL,
    error: data,
  };
}

