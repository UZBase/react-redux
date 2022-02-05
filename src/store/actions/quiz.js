import axios from "../../axios/axios-quiz"
import { FETCH_QUIZES_START,FETCH_QUIZES_SUCCESS,FETCH_QUIZES_ERROR } from "../actions/actionType"

export function fetchQuizes(){
    return async dispatch =>{
                try {
            const res = await axios.get('/quizes.json')

            const quizes = []
            Object.keys(res.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Test N${index + 1}`
                })
            })

            dispatch(fetchQuizesSuccess(quizes))
        } catch (error) {
            console.log(error);
        }
    }
}

export function fetchQuizesStart(){
    return {
        type:FETCH_QUIZES_START
    }
}
export function fetchQuizesSuccess(quizes) {
    return {
        type:FETCH_QUIZES_SUCCESS,
        quizes
    }
}
export function fetchError(e) {return {
    type:FETCH_QUIZES_ERROR
}}