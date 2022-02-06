import { FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS, FETCH_QUIZES_ERROR, FETCH_QUIZ_SUCCESS, QUIZ_SET_STATE, FINISH_QUIZ,QUIZ_NEXT_QUESTION } from "../actions/actionType"

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
        case QUIZ_SET_STATE:
            return { ...state, answerState: action.answerState, results: action.results }
        case FINISH_QUIZ:
            return { ...state, isFinished: true }
        case QUIZ_NEXT_QUESTION:
            return { ...state, answerState: null, actionQuestion: action.number }
        default:
            return state
    }
}