import axios from 'axios';
import Cookies from 'js-cookie';

const token = Cookies.get('jwt') || '';

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export default axios;