import axios from 'axios'

export default () => {
    return axios.create({
        baseURL: 'http://10.42.82.239:5000/',
    })
}