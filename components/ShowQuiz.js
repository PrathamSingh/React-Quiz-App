import React from 'react';
import { quizQuestions } from './quizQuestions';

class ShowQuiz extends React.Component {
  state = {
    curQuestion: 0,
    options: [],
    myAnswer: null,
    disabled: true,
    isEnd: false,
    choices: []
  };

  loadQuizQuestion = () => {
    // console.log(quizData[0].question)
    this.setState(() => {
      return {
        questions: quizQuestions[this.state.curQuestion].question,
        answer: quizQuestions[this.state.curQuestion].answer,
        options: quizQuestions[this.state.curQuestion].options
      };
    });
  };

  componentDidMount() {
    this.loadQuizQuestion();
  }
  nextQuestionHandler = () => {
    // console.log('test')

    this.setState({
      curQuestion: this.state.curQuestion + 1
    });
  };

  prevQuestionHandler = () => {
    this.setState({
      curQuestion: this.state.curQuestion - 1
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.curQuestion !== prevState.curQuestion) {
      this.setState(() => {
        return {
          disabled: true,
          questions: quizQuestions[this.state.curQuestion].question,
          options: quizQuestions[this.state.curQuestion].options,
          answer: quizQuestions[this.state.curQuestion].answer
        };
      });
    }
  }
  // for check answer
    checkAnswer = answer => {
    this.setState(prevState => {
      return {
        myAnswer: answer,
        disabled: false,
        choices: [...prevState.choices, answer]
      };
    });
  };
  finishHandler = () => {
    if (this.state.curQuestion === quizQuestions.length - 1) {
      this.setState({
        isEnd: true
      });
    }
  };
  render() {
    const { options, answer, myAnswer, curQuestion, isEnd } = this.state;

    if (isEnd) {
      return (
        <div className='container'>
          <div className='result'>
           <p>
              The Submitted answers are : {JSON.stringify(this.state.choices)}
            </p>
            <p>
              The correct answer's for the questions was
              <ul>
                {quizQuestions.map((item, index) => (
                  <li className='ui floating message options' key={index}>
                    {item.answer}
                  </li>
                ))}
              </ul>
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <div className='container-two'>
          <div className='App'>
            <h1>{this.state.questions} </h1>
            <span>{`Questions ${curQuestion}  out of ${quizQuestions.length -
              1} remaining `}</span>
            {options.map(option => (
              <p
                key={option.id}
                className={`option
                ${
                  myAnswer === option
                    ? myAnswer === answer
                      ? 'correctAnswer'
                      : 'incorrectAnswer'
                    : null
                }
                 `}
                onClick={() => this.checkAnswer(option)}
              >
                {option}
              </p>
            ))}
              {curQuestion > 0 && (
              <button
                className='back-btn'
                // disabled={this.state.disabled}
                onClick={this.prevQuestionHandler}
              >
                Back
              </button>
            )}
            {curQuestion < quizQuestions.length - 1 && (
              <button
                className='next-btn'
                disabled={this.state.disabled}
                onClick={this.nextQuestionHandler}
              >
                Next
              </button>
            )}
            {curQuestion === quizQuestions.length - 1 && (
              <button
                className='finish-btn'
                onClick={this.finishHandler}
                disabled={this.state.disabled}
              >
                Finish
              </button>
            )}
          </div>
        </div>
      );
    }
  }
}

export default ShowQuiz;
