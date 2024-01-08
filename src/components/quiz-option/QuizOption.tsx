import { FunctionComponent, useEffect, useState } from "react";
import './QuizOption.style.css'
import WrongIcon from '../../assets/icons/wrong-icon.svg'

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
        {clicked && !isCorrect && <img src={WrongIcon} className="wrong-icon"></img>}
        {clicked && isCorrect && showCorrectAnswer}
      </div>
      <span className="option-text">{text}</span>
    </div>
  );
}

export default QuizOption;