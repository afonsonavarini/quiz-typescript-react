import React, {useEffect, useState} from 'react';
import './home.style.css';
import UserBox from '../../components/user-box/UserBox';
import ResultBox from '../../components/result-box/ResultBox';
import RecentQuiz from '../../components/recent-quiz/RecentQuiz';
import PopularQuiz from '../../components/popular-quiz/PopularQuiz';
import { useNavigate } from 'react-router-dom';
import { useJsonManager } from '../../hooks/useJsonManager';


import quizesDataLocal from '../../constants/quizes.json';
import recentQuizesData from '../../constants/recentQuizes.json';
import { loadDatabaseFile, lerDados } from '../../constants/firebase';

const POPULAR_QUIZ_MAXRENDER_NUMBER = 3;

const quizDatabase = "https://afonsonavarini.github.io/json-storage/quizes.json"
const recentQuizesDatabase = "https://afonsonavarini.github.io/json-storage/recentQuizes.json"

const Home: React.FC = () => {
  const [recentQuizes, setRecentQuizes] = useState({});
  const [quizesData, setQuizesData] = useState({})
  const [displayedQuizes, setDisplayedQuizes] = useState<any[]>([]);
  const [displayedRecentQuizes, setDisplayedRecentQuizes] = useState<any[]>([]);

  const {loadJSONInfo} = useJsonManager()
  const navigate = useNavigate();


  useEffect(() => {
    async function loadQuizes() {
        const databaseQuizzesData = await loadDatabaseFile('/quizzes');
        const databaseRecentQuizzesData = await loadDatabaseFile('/recentQuizes');
        setQuizesData(databaseQuizzesData);
        setRecentQuizes(databaseRecentQuizzesData);
        setDisplayedQuizes(databaseQuizzesData);
        setDisplayedRecentQuizes(databaseRecentQuizzesData)
    }
  
    loadQuizes();
  }, []);

  const renderRecentQuizzes = () => {
    // Filtra os quizzes recentes com base nos IDs em displayedRecentQuizes
    const recentesFiltrados = displayedRecentQuizes.map(recent => {
      const quizCorrespondente = displayedQuizes.find(quiz => quiz.id === recent.id);
      return quizCorrespondente;
    }).filter(Boolean); // Filtra para remover valores nulos ou undefined
  
    return (
      <div className='section-box'>
        <p className='section-title'>Recent Quiz</p>
        <div className='recent-quizes-box'>
          {recentesFiltrados.map((quiz, index) => (
            <RecentQuiz
              key={index}
              title={quiz.title}
              quiz_icon={quiz.quiz_icon}
              answered={quiz.answered}
              questions={quiz.questions.length}
              mainColor={quiz.main_color}
            />
          ))}
        </div>
      </div>
    );
  };

  const handleQuizClick = (quiz: object) => {
    console.log(quiz)
    navigate('/details', { state: { quiz } });
  };


  const renderPopularQuizzes = (maxRender: number) => {
    return (
      <div className='section-box'>
        <p className='section-title'>Popular Quiz</p>
        <div className='popular-quizes-box'>
          {displayedQuizes.map((quiz, index) => (
            index < maxRender && (
            <PopularQuiz
              key={index}
              title={quiz.title}
              questions={quiz.questions.length}
              quiz_rating={quiz.quiz_rating}
              quiz_icon={quiz.quiz_icon}
              main_color={quiz.main_color}
              onClick={() => handleQuizClick(quiz)}
              />
            )
          ))}
        </div>
      </div>
    );
  };

  return <div className='phone-screen-size container'>
          <UserBox username='Jessica' />
          <ResultBox />
          <section>{renderRecentQuizzes()}</section>
          <section>{renderPopularQuizzes(POPULAR_QUIZ_MAXRENDER_NUMBER)}</section>
        </div>;
};

export default Home;