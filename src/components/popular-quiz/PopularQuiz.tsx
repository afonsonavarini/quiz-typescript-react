import { FunctionComponent} from "react";
import './PopularQuiz.style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import QuizContainer from "../quiz-container/QuizContainer";

interface PopularQuizProps {
  title: string;
  questions: number;
  quiz_rating: string;
  quiz_icon: string;
  main_color: string;
  onClick?: () => void;
}

const PopularQuiz: FunctionComponent<PopularQuizProps> = ({ title, questions, quiz_rating, quiz_icon, main_color, onClick}) => {

    
  return (
    <QuizContainer onClick={onClick}>
        <div className="info-side">
          <div className="logo-container" style={{backgroundColor: main_color}}>
            <img src={quiz_icon} alt={`${title} logo`} />
          </div>
          <div className="quiz-info">
            <p id="popular-quiz-title">{title}</p>
            <p id="popular-quiz-questions">{questions} Questions</p>
          </div>
        </div>
        <div className="rating-info">
          <FontAwesomeIcon icon={faStar} style={{ color: "orange" }} />
          <div className="rating">{quiz_rating}</div>
        </div>
        
    </QuizContainer>
  );
}

export default PopularQuiz;