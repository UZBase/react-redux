import axios from "axios";

export default axios.create({
    baseURL: 'https://quiz-react-d8ea0-default-rtdb.firebaseio.com/'
})