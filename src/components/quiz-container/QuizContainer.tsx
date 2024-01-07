import { FunctionComponent, ReactNode} from "react";
import './QuizContainer.style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

interface QuizContainerProps {
  children: ReactNode;
  onClick?: () => void;
}

const QuizContainer: FunctionComponent<QuizContainerProps> = ({children, onClick}) => {
    if (!Array.isArray(children) || children.length < 2) {
        console.error("QuizContainer requer pelo menos dois elementos children.");
        return null;
      }
    
      const [topChild, bottomChild] = children;
    
  return (
    <div className="quiz-container-main" onClick={onClick}>
       <div className="quiz-first-content">
        {topChild || <div></div>}
      </div>
      <div className="quiz-second-content">
        {bottomChild || <div></div>}
      </div>
    </div>
  );
}

export default QuizContainer;