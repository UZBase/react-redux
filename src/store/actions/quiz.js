import axios from "../../axios/axios-quiz"
import { FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS, FETCH_QUIZES_ERROR, FETCH_QUIZ_SUCCESS } from "../actions/actionType"

// const initialStore = {
//     results: {},
//     isFinished: false,
//     activeQuestion: 0,
//     answerState: null,  //{[id]: 'success' 'error'}
//     quiz: null
// }
export function fetchQuizes() {
    return async dispatch => {
        try {
            const res = await axios.get('/quizes.json')

            const quizes = []
            Object.keys(res.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Test N${index + 1}`
                })
            })

            dispatch(fetchQuizSuccess(quizes))
        } catch (e) {
            dispatch(fetchQuizesError(e))
            console.log(e);
        }
    }
}
export function fetchQuizById(quizId) {
    return async dispatch => {
        dispatch(fetchQuizesStart())

        try {
            const res = await axios.get(`/quizes/${quizId}.json`)
            const quiz = res.data
            dispatch(fetchQuizSuccess(quiz))
        } catch (error) {
            dispatch(fetchQuizesError(error))
        }
    }
}
export function fetchQuizSuccess(quiz) {
    return { type: FETCH_QUIZ_SUCCESS, quiz }
}
export function fetchQuizesStart() {
    return {
        type: FETCH_QUIZES_START
    }
}
export function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes
    }
}
export function fetchQuizesError(e) {
    return {
        type: FETCH_QUIZES_ERROR,
        error: e
    }
}