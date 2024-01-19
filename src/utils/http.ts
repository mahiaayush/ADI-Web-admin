import axios from 'axios';
import { Auth } from 'aws-amplify'

const http = axios.create({
    timeout: 30000,
});

http.interceptors.request.use(async (config) => {
    const token = (await Auth.currentSession()).getAccessToken().getJwtToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default http;