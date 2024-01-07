import React, { useEffect, useState } from 'react';
import './QuizPage.style.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import PageHeader from '../../components/page-header/PageHeader';
import PopularQuiz from '../../components/popular-quiz/PopularQuiz';
import QuizContainer from '../../components/quiz-container/QuizContainer';
import QuestionIcon from'../../assets/icons/question.svg';
import ClockIcon from '../../assets/icons/clock.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { formatDuration, percentageCalculation, saveAnsweredQuestionJSON } from '../../constants/functions';
import Button from '../../components/button/Button';
import Timer from '../../components/timer/Timer';
import PercentageBar from '../../components/percentage-bar/PercentageBar';
import QuizOption from '../../components/quiz-option/QuizOption';

import quizesData from '../../constants/quizes.json';

import { useJsonManager } from '../../hooks/useJsonManager';

const QuizPage: React.FC = () => {

const location = useLocation();
const navigate = useNavigate()
  
const quiz = location.state?.quiz;
const percentageBarQuizColor = "#21BDCA";

// const quizes = quizesData.quizzes;

const quizDatabase = "https://json.extendsclass.com/bin/e48f43d26d12"
const recentQuizDatabase = "https://json.extendsclass.com/bin/31809eb5fda6"


const [quizes, setQuizes] = useState({})
const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
const [correctOptionIndex, setCorrectOptionIndex] = useState<number | null>(null);
const [resetStyles, setResetStyles] = useState(false);
const [totalAnswered, setTotalAnswered] = useState(quiz.answered)
const [correctAnswers, setCorrectAnswers] = useState(0)
const [correctValidation, setCorrectValidation] = useState(false)
const [data, setData] = useState(null);
const {loadJSONInfo, saveAnsweredQuestion, saveRecentQuiz} = useJsonManager()

useEffect(() => {
  async function loadQuizes() {
    const quizesData = await loadJSONInfo(quizDatabase)
    setQuizes(quizesData.quizzes)
    saveRecentQuiz(quiz, recentQuizDatabase)
  }
  loadQuizes()
})

  const duration = formatDuration(quiz.duration)

  const percentage = percentageCalculation(correctAnswers, quiz.questions.length)

  function onClickGoBack() {
    navigate(-1)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setCorrectOptionIndex(null);
      setResetStyles(true);
      setTotalAnswered(totalAnswered + 1)
      setCorrectValidation(false)
    } else {
        navigate("/");
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
      setCorrectOptionIndex(null);
      setResetStyles(true);    /* False não reseta o estilo ao voltar a página */
      setTotalAnswered(totalAnswered - 1)
    }
  };

  const handleOptionClick = (isCorrect: boolean, optionIndex: number) => {
    if (!isCorrect) {
      setCorrectOptionIndex(currentQuestion.options.findIndex((opt: string) => opt === currentQuestion.correct_answer));
    } else {
      if (correctValidation !== true) {
        setCorrectAnswers(correctAnswers + 1)
        setCorrectValidation(true)
        console.log('eae')
      }
    }
    setResetStyles(false);
  };

  const currentQuestion = quiz.questions[currentQuestionIndex];

  useEffect(() => {
    saveAnsweredQuestion(correctAnswers, quiz.id, quizDatabase)
  }, [correctAnswers])


  return <div className='phone-screen-size container'>
            <PageHeader title={quiz.title} onClick={onClickGoBack}>
                <Timer time={quiz.duration} onTimeExpired={onClickGoBack}/>
            </PageHeader>
            <PercentageBar percentage={percentage} mainColor={percentageBarQuizColor}></PercentageBar>
            <p className="quiz-percentage">Completed {percentage}%</p>
            <div className='question-box'>
                <p className='question-title'>{currentQuestion.question}</p>
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
            </div>
            <div className='quizpage-buttons-container'>
                <div className="previous-button">
                    <Button text='Previous' onClick={handlePreviousQuestion} outlined></Button>
                </div>
                <div className="next-button">
                    <Button text='Next' onClick={handleNextQuestion}></Button>
                </div>
            </div>
         </div>

};

export default QuizPage;