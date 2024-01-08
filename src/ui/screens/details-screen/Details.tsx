  import React, { useState } from 'react';
  import './details.style.css';
  import { useLocation } from 'react-router-dom';
  import { useAppNavigation } from '../../../hooks/useAppNavigation';
  import PageHeader from '../../../components/page-header/PageHeader';
  import PopularQuiz from '../../../components/popular-quiz/PopularQuiz';
  import QuizContainer from '../../../components/quiz-container/QuizContainer';
  import QuestionIcon from'../../../assets/icons/question.svg';
  import ClockIcon from '../../../assets/icons/clock.svg'
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { formatDuration } from '../../../constants/functions';
  import Button from '../../../components/button/Button';
  import {faEllipsisV} from '@fortawesome/free-solid-svg-icons';
  import { Quiz } from '../../../constants/interfaces';
  import {updateAnswersQuiz} from '../../../constants/firebase';
  import { useNotification } from '../../../hooks/useNotification';

  const Details: React.FC = () => {

    const location = useLocation();
    const {navigateBack, navigateTo} = useAppNavigation();
    const {createNotification} = useNotification();
    const [isHovered, setIsHovered] = useState<boolean>(false);
    
    const ICON_COLOR = "#FFF6EA"
    
    const quiz = location.state;

    const RESET_QUIZ_VALUE = 0;

    const duration = formatDuration(quiz.duration)

    async function onIconClick() {
      createNotification(`${quiz.title} quiz reset.`)
      await updateAnswersQuiz(quiz, RESET_QUIZ_VALUE, "/quizzes")
      navigateTo('/')
    }

    async function handleButtonClick(quiz: Quiz){
      navigateTo('/quiz', quiz);
    };

    return <div className='phone-screen-size container'>
            <PageHeader
                title='Detail Quiz'
                onClick={() => navigateBack()}
            >
              <div className="icon-container">
                <FontAwesomeIcon
                  icon={faEllipsisV}
                  className="icon-hover"
                  onClick={onIconClick }
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                />
                <div className={`hover-info ${isHovered ? 'visible' : 'hidden'}`}>RESET QUIZ</div>
              </div>
            </PageHeader>
            <PopularQuiz
                title={quiz.title}
                questions={quiz.questions.length}
                quiz_rating={quiz.quiz_rating}
                quiz_icon={quiz.quiz_icon}
                main_bg_color={quiz.main_bg_color}
            />
            <h3 className='details-screen-title'>Brief explanation about this quiz</h3>
            <QuizContainer>
              <div className="info-side">
                <div className="logo-container-details" style={{backgroundColor: ICON_COLOR}}>
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
                <div className="logo-container-details" style={{backgroundColor: ICON_COLOR}}>
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