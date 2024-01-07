import React from 'react';
import './details.style.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import PageHeader from '../../components/page-header/PageHeader';
import PopularQuiz from '../../components/popular-quiz/PopularQuiz';
import QuizContainer from '../../components/quiz-container/QuizContainer';
import QuestionIcon from'../../assets/icons/question.svg';
import ClockIcon from '../../assets/icons/clock.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { formatDuration } from '../../constants/functions';
import Button from '../../components/button/Button';
import {faArrowLeft, faEllipsisV, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const Details: React.FC = () => {

  const location = useLocation();
  const navigate = useNavigate()
  const iconColor = "#FFF6EA"
  
  const quiz = location.state?.quiz;

  const duration = formatDuration(quiz.duration)

  function onClickGoBack() {
    navigate(-1)
  }

  const handleButtonClick = (quiz: object) => {
    navigate('/quiz', { state: { quiz } });
  };


  return <div className='phone-screen-size container'>
          <PageHeader
              title='Detail Quiz'
              onClick={() => onClickGoBack()}
          >
            <FontAwesomeIcon icon={faEllipsisV} className="icon-hover" />
          </PageHeader>
          <PopularQuiz
              title={quiz.title}
              questions={quiz.questions.length}
              quiz_rating={quiz.quiz_rating}
              quiz_icon={quiz.quiz_icon}
              main_color={quiz.main_color}
          />
          <h3 className='details-screen-title'>Brief explanation about this quiz</h3>
          <QuizContainer>
            <div className="info-side">
              <div className="logo-container-details" style={{backgroundColor: iconColor}}>
                <img src={QuestionIcon} alt="Questions Icon" />
              </div>
              <div className="quiz-info">
                <p id="popular-quiz-title">{quiz.questions.length} Questions</p>
                <p id="popular-quiz-questions">10 points for a correct answer</p>
              </div>
            </div>
            <div></div>
          </QuizContainer>
          <QuizContainer>
            <div className="info-side">
              <div className="logo-container-details" style={{backgroundColor: iconColor}}>
                <img src={ClockIcon} alt="Questions Icon" />
              </div>
              <div className="quiz-info">
                <p id="popular-quiz-title">{duration}</p>
                <p id="popular-quiz-questions">Total duration of the quiz</p>
              </div>
            </div>
            <div></div>
          </QuizContainer>
          <h3 className='details-screen-title'>Please read the text below carefully so you can understand it</h3>
          <ul className='details-screen-tips container'>
            <li>10 points awarded for a correct answer and no marks for a incorrect answer</li>
            <li>Tap on options to select the correct answer</li>
            <li>Click submit if you are sure you want to complete all the quizzes</li>
          </ul>
          <Button text='Get Started' onClick={() => handleButtonClick(quiz)}></Button>

  </div>
};

export default Details;