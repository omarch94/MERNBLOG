import axios from "axios"
const request=axios.create({
    baseURL:"http://localhost:8002"
})
export default request;