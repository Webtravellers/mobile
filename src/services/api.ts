import axios from 'axios'

export default () => {
    return axios.create({
        baseURL: 'http://192.168.1.21:5000/',
        // baseURL: 'https://bihatira.kodchallenge.com/',
    })
}