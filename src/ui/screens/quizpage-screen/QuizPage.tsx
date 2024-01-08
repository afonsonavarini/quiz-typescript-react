import React, {useState} from 'react';
import './QuizPage.style.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import PageHeader from '../../../components/page-header/PageHeader';
import Button from '../../../components/button/Button';
import Timer from '../../../components/timer/Timer';
import PercentageBar from '../../../components/percentage-bar/PercentageBar';
import QuizOption from '../../../components/quiz-option/QuizOption';


import {percentageCalculation } from '../../../constants/functions';

import { updateAnswersQuiz} from '../../../constants/firebase';
import { useAppNavigation } from '../../../hooks/useAppNavigation';
import { useNotification } from '../../../hooks/useNotification';

const QuizPage: React.FC = () => {

const location = useLocation();
const navigate = useNavigate()
const {navigateBack, navigateTo} = useAppNavigation();
const {createNotification} = useNotification();
  
const quiz = location.state;
const percentageBarQuizColor = "#21BDCA";

const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
const [correctOptionIndex, setCorrectOptionIndex] = useState<number | null>(null);
const [resetStyles, setResetStyles] = useState<boolean>(false);
const [totalAnswered, setTotalAnswered] = useState<number>(quiz.answered)
const [correctAnswers, setCorrectAnswers] = useState<number>(0)
const [correctValidation, setCorrectValidation] = useState<boolean>(false)

const percentage = percentageCalculation(correctAnswers, quiz.questions.length)

  async function handleNextQuestion() {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setCorrectOptionIndex(null);
      setResetStyles(true);
      setTotalAnswered(totalAnswered + 1)
      setCorrectValidation(false)
    } else {
        const currentPercentageCompleted = percentageCalculation(correctAnswers, quiz.questions.length)
        createNotification(`You got ${currentPercentageCompleted}% on ${quiz.title} last attempt.`)
        navigateTo('/');
    }
  };

  const timeIsUp = () => {
    createNotification(`Your time on ${quiz.title} ran up.`);
    navigateTo('/');
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
      setCorrectOptionIndex(null);
      setResetStyles(true);
      setTotalAnswered(totalAnswered - 1)
    } else {
      navigateBack()
    }
  };

  async function handleOptionClick(isCorrect: boolean){
    if (!isCorrect) {
      setCorrectOptionIndex(currentQuestion.options.findIndex((opt: string) => opt === currentQuestion.correct_answer));
    } else {
      if (correctValidation !== true) {
        setCorrectAnswers(correctAnswers + 1)
        await updateAnswersQuiz(quiz, correctAnswers + 1, "/quizzes")
        setCorrectValidation(true)
      }
    }
    setResetStyles(false);
  };

  function renderQuestionOptions() {
    return currentQuestion.options.map((option: string, optionIndex: number) => (
      <QuizOption
        key={optionIndex}
        text={option}
        isCorrect={option === currentQuestion.correct_answer}
        onClick={(isCorrect) => handleOptionClick(isCorrect)}
        showCorrectAnswer={correctOptionIndex !== null && optionIndex === correctOptionIndex}
        resetStyles={resetStyles}
      />
    ));
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];


  return <div className='phone-screen-size container'>
            <PageHeader title={quiz.title} onClick={navigateBack}>
                <Timer time={quiz.duration} onTimeExpired={timeIsUp}/>
            </PageHeader>
            <PercentageBar percentage={percentage} mainColor={percentageBarQuizColor}></PercentageBar>
            <p className="quiz-percentage">Completed {percentage}%</p>
            <div className='question-box'>
              <p className='question-title'>{currentQuestion.question}</p>
                  <div className="question-img-box">
                    <div className='question-img' style={{ backgroundImage: `url(${currentQuestion.question_img})`, backgroundSize: 'cover' }}>
                  </div>
                  <div className='question-options'>
                    {renderQuestionOptions()}
                  </div>
                  <div className='quizpage-buttons-container'>
                    <div className="previous-button">
                        <Button text='Previous' onClick={handlePreviousQuestion} outlined buttonWidthPercentage={95}></Button>
                    </div>
                    <div className="next-button">
                        <Button text='Next' onClick={handleNextQuestion} buttonWidthPercentage={95}></Button>
                    </div>
                  </div>
                </div>    
              </div>
         </div>

};

export default QuizPage;