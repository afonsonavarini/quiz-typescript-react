import React, {useEffect, useState} from 'react';
import './home.style.css';
import UserBox from '../../components/user-box/UserBox';
import ResultBox from '../../components/result-box/ResultBox';
import RecentQuiz from '../../components/recent-quiz/RecentQuiz';
import PopularQuiz from '../../components/popular-quiz/PopularQuiz';
import { useNavigate } from 'react-router-dom';

import { loadDatabaseFile, updateQuizTimestamp } from '../../constants/firebase';
import { orderQuizzesByTimestamp, percentageCalculation } from '../../constants/functions';

const POPULAR_QUIZ_MAXRENDER_NUMBER = 3;
const RECENT_QUIZ_MAXRENDER_NUMBER = 2;

const Home: React.FC = () => {
  const [displayedQuizes, setDisplayedQuizes] = useState<any[]>([]);
  const [percentageCompleted, setPercentageCompleted] = useState(0)
  const [notificationHome, setNotificationHome] = useState('')

  const navigate = useNavigate();

  useEffect(() => {
    const notification = localStorage.getItem("notification");
    if (notification) {
      setNotificationHome(notification)
      localStorage.removeItem("notification");
    }
  }, []);


  useEffect(() => {
    async function loadQuizes() {
        const databaseQuizzesData = await loadDatabaseFile('/quizzes');
        setDisplayedQuizes(databaseQuizzesData);
        const totalAnswered = databaseQuizzesData.reduce((acc: any, quiz: any) => acc + quiz.answered, 0);
        const totalQuestions = databaseQuizzesData.reduce((acc: any, quiz: any) => acc + quiz.questions.length, 0);

        const totalFinished = percentageCalculation(totalAnswered, totalQuestions)
        setPercentageCompleted(totalFinished * -1)
    }
  
    loadQuizes();
  }, []);
  
  const quizzesOrderedByTimestamp = orderQuizzesByTimestamp(displayedQuizes);

  const renderRecentQuizzes = (maxRender: number) => {
  
    return (
      <div className='section-box'>
        <p className='section-title'>Recent Quiz</p>
        <div className='recent-quizes-box'>
          {quizzesOrderedByTimestamp.map((quiz, index) => (
            index < maxRender &&
            <RecentQuiz
              key={index}
              title={quiz.title}
              quiz_icon={quiz.quiz_icon}
              answered={quiz.answered}
              questions={quiz.questions.length}
              mainColor={quiz.main_color}
              onClick={() => handleQuizClick(quiz)}
            />
          ))}
        </div>
      </div>
    );
  };

  async function handleQuizClick(quiz: object) {
    await updateQuizTimestamp(quiz, "/quizzes")
    navigate('/details', { state: { quiz } });
  };


  const renderPopularQuizzes = (maxRender: number) => {
    const quizzesNotInRecentQuizzes = quizzesOrderedByTimestamp.slice(-maxRender).reverse();
  
    return (
      <div className='section-box'>
        <p className='section-title'>Popular Quiz</p>
        <div className='popular-quizes-box'>
          {quizzesNotInRecentQuizzes.map((quiz, index) => (
            console.log(quiz),

            <PopularQuiz
              key={index}
              title={quiz.title}
              questions={quiz.questions.length}
              quiz_rating={quiz.quiz_rating}
              quiz_icon={quiz.quiz_icon}
              main_bg_color={quiz.main_bg_color}
              onClick={() => handleQuizClick(quiz)}
            />
          ))}
        </div>
      </div>
    );
  };

  return <div className='phone-screen-size container'>
          <UserBox username='Jessica' notification={notificationHome}/>
          <ResultBox percentage={percentageCompleted} circleWidth={150}/>
          <section>{renderRecentQuizzes(RECENT_QUIZ_MAXRENDER_NUMBER)}</section>
          <section>{renderPopularQuizzes(POPULAR_QUIZ_MAXRENDER_NUMBER)}</section>
        </div>;
};

export default Home;