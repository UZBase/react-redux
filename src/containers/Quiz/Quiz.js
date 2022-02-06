import React, { Component } from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import Loader from '../../components/UI/Loader/Loader'
import { connect } from 'react-redux'
import { fetchQuizById,quizAnswerClick } from '../../store/actions/quiz'
class Quiz extends Component {
    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    }
    componentDidMount() {
        this.props.fetchQuizByid(this.props.match.params.id)
    }

    onAnswerClickHandler = (answerId) => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]  // object ichidaga index kalitni topib beradi
            if (this.state.answerState[key] === 'success') {
                return
            }
        }

        const question = this.state.quiz[this.state.activeQuestion]  // object // 2 / 1 / 2
        const results = this.state.results

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success' //{ 3: 'success', 2: 'success'}
            }
            this.setState({
                answerState: { [answerId]: 'success' },
                results
            })

            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }
                window.clearTimeout(timeout)
            }, 1000)
        }
        else {
            // console.log(false); 
            results[question.id] = 'error' // {4: 'error', 1: 'error'}
            this.setState({
                answerState: { [answerId]: 'error' },
                results
            })
        }
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Check all answers</h1>

                    {this.props.loading || !this.props.quiz
                        ? <Loader />
                        : this.props.isFinished
                            ?
                            <FinishedQuiz
                                results={this.props.results}
                                quiz={this.props.quiz}
                                onRetry={this.retryHandler}
                            />
                            :
                            <ActiveQuiz
                                answers={this.props.quiz[this.props.activeQuestion].answers}
                                question={this.props.quiz[this.props.activeQuestion].question}
                                onAnswerClick={this.props.quizAnswerClick}
                                quizLength={this.props.quiz.length}
                                answerNumber={this.props.activeQuestion + 1}
                                state={this.props.answerState}
                            />
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        results: state.quiz.results,
        isFinished: state.quiz.isFinished,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState,  //{[id]: 'success' 'error'}
        quiz: state.quiz.quiz,
        loading: state.quiz.loading
    }
}
function MapDispatchToPorps(dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        quizAnswerClick:answerId=>dispatch(quizAnswerClick(answerId)),
        // retryQuiz:()=>dispatch(retryQuiz)
    }
}
export default connect(mapStateToProps, MapDispatchToPorps)(Quiz)
