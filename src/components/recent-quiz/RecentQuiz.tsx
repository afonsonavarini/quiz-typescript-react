import { FunctionComponent } from "react";
import './RecentQuiz.style.css'
import PercentageBar from "../percentage-bar/PercentageBar";
import { percentageCalculation } from "../../constants/functions";

interface RecentQuizProps {
    title: string;
    quiz_icon: string;
    answered: number;
    questions: number;
    mainColor: string;
    onClick?: () => void;
  }


const RecentQuiz: FunctionComponent<RecentQuizProps> = ({title, quiz_icon, answered, questions, mainColor, onClick}) => {

    const percentage = percentageCalculation(answered, questions)

    return <div className="recent-quiz-main" onClick={onClick}>
        <div className="icon-container">
            <div className="icon-box">
                <img src={quiz_icon} alt={`${title} logo`} className="recent-quiz-icon"/>
            </div>
        </div>
        <div className="recent-quiz-info">
            <p className="quiz-title">{title}</p>
            <p className="quiz-percentage">You Completed {percentage}%</p>
            </div>
        <PercentageBar percentage={percentage} mainColor={mainColor}></PercentageBar>
    </div>
}

export default RecentQuiz;