import { FunctionComponent} from "react";
import './PopularQuiz.style.css'
import QuizContainer from "../quiz-container/QuizContainer";
import StarRating from '../../assets/icons/star-rating.png'

interface PopularQuizProps {
  title: string;
  questions: number;
  quiz_rating: string;
  quiz_icon: string;
  main_bg_color: string;
  onClick?: () => void;
}

const PopularQuiz: FunctionComponent<PopularQuizProps> = ({ title, questions, quiz_rating, quiz_icon, main_bg_color, onClick}) => {

    
  return (
    <QuizContainer onClick={onClick}>
        <div className="info-side">
        <div className="logo-container" style={{ backgroundColor: main_bg_color}}>
            <img src={quiz_icon} alt={`${title} logo`} />
          </div>
          <div className="quiz-info">
            <p id="popular-quiz-title">{title}</p>
            <p id="popular-quiz-description">{questions} Questions</p>
          </div>
        </div>
        <div className="rating-info">
          <div className="star-box">
            <img src={StarRating} alt="rating-star"/>
          </div>
          <div className="rating">{quiz_rating}</div>
        </div>
        
    </QuizContainer>
  );
}

export default PopularQuiz;