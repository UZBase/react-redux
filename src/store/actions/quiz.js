import axios from "../../axios/axios-quiz"
import { FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS, FETCH_QUIZES_ERROR, FETCH_QUIZ_SUCCESS,QUIZ_SET_STATE,FINISH_QUIZ ,QUIZ_NEXT_QUESTION} from "../actions/actionType"
import {isQuizFinished} from '../../store/actions/quiz'
const initialStore = {
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,  //{[id]: 'success' 'error'}
    quiz: null
}
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
export function finishQuiz(){
    return{
        type:FINISH_QUIZ
    }
}
export function quizNextQuestion(number){
    return{
        type:QUIZ_NEXT_QUESTION,number
    }
}
export function quizAnswerClick(answerId) {
    return (dispatch, getState) => {
        const state = getState().quiz
        if (state.answerState) {
            const key = Object.keys(state.answerState)[0]  // object ichidaga index kalitni topib beradi
            if (state.answerState[key] === 'success') {
                return
            }
        }

        const question = state.quiz[state.activeQuestion]  // object // 2 / 1 / 2
        const results = state.results

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }
            dispatch(quizSetState({ [answerId]: 'success' },results))
            const timeout = window.setTimeout(() => {
                if (finishQuiz()) {
                    dispatch(finishQuiz())
                } else {
                    // this.setState({
                    //     activeQuestion: this.state.activeQuestion + 1,
                    //     answerState: null
                    // })
                    dispatch(quizNextQuestion(state.activeQuestion + 1))
                }
                window.clearTimeout(timeout)
            }, 1000)
        } else {
            // console.log(false); 
            results[question.id] = 'error' // {4: 'error', 1: 'error'}
            dispatch(quizSetState({ [answerId]: 'error' },results))

            // this.setState({
            //     answerState: { [answerId]: 'error' },
            //     results
            // })
        }
      
    }
}
// function qu
export function quizSetState(answerState,results){
    return{
        type:QUIZ_SET_STATE,
        answerState,results
    }
}
