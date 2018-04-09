import axios from 'axios';
import envConfig from 'env-config';
import {
  map,
  mapObjIndexed,
  pipe,
  toLower,
  evolve,
  when,
  complement,
  endsWith,
  ifElse,
  is,
  not,
  anyPass,
  startsWith,
  clone,
} from 'ramda';
import { camelize, camelizeKeys, decamelizeKeys } from 'humps';

export const camelizeErrors = mapObjIndexed(ifElse(
  is(Array),
  map(pipe(toLower, camelize)),
  when(
    is(String),
    pipe(toLower, camelize)
  )
));

// fix sharing default headers between multiple axios instances
const defaultHeaders = clone(axios.defaults.headers);

export const api = axios.create({
  baseURL: envConfig.baseURL,
});

api.defaults.headers = defaultHeaders;

api.interceptors.response.use(evolve({
  data: camelizeKeys,
}), (error) => {
  return Promise.reject(error);
});

api.interceptors.request.use(evolve({
  url: when(
    complement(anyPass([endsWith('/'), startsWith('http')])),
    (url) => `${url}/`
  ),
  data: when(pipe(is(FormData), not), decamelizeKeys),
}), (error) => Promise.reject(error));
