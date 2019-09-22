import axios from 'axios';

const api = axios.create({
    // run: adb reverse tcp:8163 tcp:8163
    // baseURL: 'http://127.0.0.1:3333',
    baseURL: 'http://10.0.3.2:3333',
});

export default api;
