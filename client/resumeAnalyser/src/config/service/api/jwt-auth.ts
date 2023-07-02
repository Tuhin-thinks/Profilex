import axios from 'axios';
import { logoutUser } from '../../../redux/action/user.action';


const jwtAxios = axios.create({
  baseURL: process.env.REACT_APP_API_KEY, 
  headers: {
    'Content-Type': 'application/json',
  },
});
const token = localStorage.getItem('token');

if (token) {
  jwtAxios.defaults.headers.common['Authorization'] = `${token}`;
}
jwtAxios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 403 && err.response.data.msg === 'Token Expired') {
      logoutUser()
    }
    return Promise.reject(err);
  },
);

export default jwtAxios;