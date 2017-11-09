import axios from 'axios';
import envConfig from 'env-config';

export default axios.create({
  baseURL: envConfig.baseURL,
});
