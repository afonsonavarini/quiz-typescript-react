import { FunctionComponent, ReactNode} from "react";
import './QuizContainer.style.css'

interface QuizContainerProps {
  children: ReactNode;
  onClick?: () => void;
}

const QuizContainer: FunctionComponent<QuizContainerProps> = ({children, onClick}) => {
    if (!Array.isArray(children) || children.length < 2) {
        console.error("QuizContainer requires at least two elements.");
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