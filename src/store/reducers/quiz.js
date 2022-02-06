import { FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS, FETCH_QUIZES_ERROR, FETCH_QUIZ_SUCCESS } from "../actions/actionType"

const initialStore = {
    quizes: [],
    loading: false
}

export default function quizReducer(state = initialStore, action) {
    switch (action.type) {
        case FETCH_QUIZ_SUCCESS:
            return {
                ...state, loading: false, quiz: action.quiz
            }
        case FETCH_QUIZES_START:
            return {
                ...state, loading: true
            }
        case FETCH_QUIZES_SUCCESS:
            return {
                ...state, loading: false, quizes: action.quizes
            }
        case FETCH_QUIZES_ERROR:
            return { ...state, loading: false, errors: action.error }
        default:
            return state
    }
}