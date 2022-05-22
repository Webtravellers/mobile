import axios from 'axios'

export default () => {
    return axios.create({
        baseURL: 'https://bihatira.kodchallenge.com/',
    })
}