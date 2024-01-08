import React, {useState} from 'react';
import './QuizPage.style.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import PageHeader from '../../components/page-header/PageHeader';
import Button from '../../components/button/Button';
import Timer from '../../components/timer/Timer';
import PercentageBar from '../../components/percentage-bar/PercentageBar';
import QuizOption from '../../components/quiz-option/QuizOption';

import {percentageCalculation } from '../../constants/functions';

import { updateAnswersQuiz} from '../../constants/firebase';

const QuizPage: React.FC = () => {

const location = useLocation();
const navigate = useNavigate()
  
const quiz = location.state?.quiz;
const percentageBarQuizColor = "#21BDCA";

const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
const [correctOptionIndex, setCorrectOptionIndex] = useState<number | null>(null);
const [resetStyles, setResetStyles] = useState(false);
const [totalAnswered, setTotalAnswered] = useState(quiz.answered)
const [correctAnswers, setCorrectAnswers] = useState(0)
const [correctValidation, setCorrectValidation] = useState(false)

const percentage = percentageCalculation(correctAnswers, quiz.questions.length)

  

  function onClickGoBack() {
    navigate(-1)
  }

  async function handleNextQuestion() {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setCorrectOptionIndex(null);
      setResetStyles(true);
      setTotalAnswered(totalAnswered + 1)
      setCorrectValidation(false)
    } else {
        const currentPercentageCompleted = percentageCalculation(correctAnswers, quiz.questions.length)
        localStorage.setItem("notification", `You got ${currentPercentageCompleted}% on ${quiz.title} last attempt.`);
        navigate('/');
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
      setCorrectOptionIndex(null);
      setResetStyles(true);
      setTotalAnswered(totalAnswered - 1)
    } else {
      navigate(-1)
    }
  };

  async function handleOptionClick(isCorrect: boolean, optionIndex: number){
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

  const currentQuestion = quiz.questions[currentQuestionIndex];


  return <div className='phone-screen-size container'>
            <PageHeader title={quiz.title} onClick={onClickGoBack}>
                <Timer time={quiz.duration} onTimeExpired={onClickGoBack}/>
            </PageHeader>
            <PercentageBar percentage={percentage} mainColor={percentageBarQuizColor}></PercentageBar>
            <p className="quiz-percentage">Completed {percentage}%</p>
            <div className='question-box'>
              <p className='question-title'>{currentQuestion.question}</p>
                  <div className="question-img-box">
                    <div className='question-img' style={{ backgroundImage: `url(${currentQuestion.question_img})`, backgroundSize: 'cover' }}>
                  </div>
                  <div className='question-options'>
                        {currentQuestion.options.map((option: string, optionIndex: number) => (
                          <QuizOption
                              key={optionIndex}
                              text={option}
                              isCorrect={option === currentQuestion.correct_answer}
                              onClick={(isCorrect) => handleOptionClick(isCorrect, optionIndex)}
                              showCorrectAnswer={correctOptionIndex !== null && optionIndex === correctOptionIndex}
                              resetStyles={resetStyles}
                        />
                          ))}
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