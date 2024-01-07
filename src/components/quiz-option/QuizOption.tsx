import { FunctionComponent, useEffect, useState } from "react";
import './QuizOption.style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from '@fortawesome/free-solid-svg-icons';

interface QuizOptionProps {
  text: string;
  isCorrect: boolean;
  onClick: (isCorrect: boolean) => void;
  showCorrectAnswer: boolean;
  resetStyles: boolean;
}

const QuizOption: FunctionComponent<QuizOptionProps> = ({ text, isCorrect, onClick, showCorrectAnswer, resetStyles }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    onClick(isCorrect);
  };

  useEffect(() => {
    if (resetStyles) {
      setClicked(false);
    }
  }, [resetStyles]);

  return (
    <div className={`quizoption-main ${(isCorrect && showCorrectAnswer && !clicked) ? 'highlight-correct' : ''} ${clicked ? (isCorrect ? 'correct' : 'incorrect') : ''}`} onClick={handleClick}>
      <div className={`${clicked ? (isCorrect ? 'select-correct' : 'select-incorrect') : 'circle-option'}`}>
        {clicked && !isCorrect && <p className="circle-content">X</p>}
        {clicked && isCorrect && showCorrectAnswer}
      </div>
      <span>{text}</span>
    </div>
  );
}

export default QuizOption;