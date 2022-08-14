import Axios from 'axios';
import { Message } from 'element-ui'
const axios = Axios.create({
    baseURL: '',
    timeout: 5000,
    headers: {
        "content-type": "application/json",
    }
})


export default axios