import React from 'react';
import { quizData } from './quizData';

class MainQuiz extends React.Component {
  state = {
    currentQuestion: 0,
    myAnswer: null,
    options: [],
    disabled: true,
    isEnd: false,
    choices: []
  };

  loadQuizData = () => {
    // console.log(quizData[0].question)
    this.setState(() => {
      return {
        questions: quizData[this.state.currentQuestion].question,
        answer: quizData[this.state.currentQuestion].answer,
        myAnswer: quizData[this.state.currentQuestion].myAnswer,
        options: quizData[this.state.currentQuestion].options
      };
    });
  };

  componentDidMount() {
    this.loadQuizData();
  }
  nextQuestionHandler = () => {
    // console.log('test')

    this.setState({
      currentQuestion: this.state.currentQuestion + 1
    });
  };

  prevQuestionHandler = () => {
    this.setState({
      currentQuestion: this.state.currentQuestion - 1
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentQuestion !== prevState.currentQuestion) {
      this.setState(() => {
        return {
          disabled: true,
          questions: quizData[this.state.currentQuestion].question,
          options: quizData[this.state.currentQuestion].options,
          answer: quizData[this.state.currentQuestion].answer,
          myAnswer: quizData[this.state.currentQuestion].myAnswer
        };
      });
    }
  }
  //check answer
  checkAnswer = answer => {
    this.setState({ myAnswer: answer, disabled: false });
    this.setState(prevState => {
      return {
        myAnswer: answer,
        disabled: false,
        choices: [...prevState.choices, answer]
      };
    });
  };
  finishHandler = () => {
    if (this.state.currentQuestion === quizData.length - 1) {
      this.setState({
        isEnd: true
      });
    }
  };
  render() {
    const {
      options,
      answer,
      myAnswer,
      currentQuestion,
      isEnd,
      choices
    } = this.state;

    if (isEnd) {
      return (
        <div className='container'>
          <div className='result'>
            <p>The correct answer's for the questions was</p>
            <ul>
              {quizData.map((item, index) => (
                <li className='ui floating message options' key={index}>
                  {item.choices}
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    } else {
      return (
        <div className='container-two'>
          <div className='App'>
            <h1>{this.state.questions} </h1>
            <span>{`Questions ${currentQuestion}  out of ${quizData.length -
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
            {currentQuestion < quizData.length - 1 && (
              <button
                className='back-btn'
                // disabled={this.state.disabled}
                onClick={this.prevQuestionHandler}
              >
                Back
              </button>
            )}
            {currentQuestion < quizData.length - 1 && (
              <button
                className='next-btn'
                disabled={this.state.disabled}
                onClick={this.nextQuestionHandler}
              >
                Next
              </button>
            )}
            {currentQuestion === quizData.length - 1 && (
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

export default MainQuiz;
