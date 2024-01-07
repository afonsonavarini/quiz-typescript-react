import { FunctionComponent } from "react";
import './ResultBox.style.css'
import CircularProgressBar from "../circular-progress-bar/CircularProgressBar";

interface ResultBoxProps {
    percentage: number,
    circleWidth: number
  }

const ResultBox: FunctionComponent<ResultBoxProps> = ({percentage, circleWidth}) => {
    return <div className="result-box-main">
        <div className="circle" id="first-left-circle">
            <div className="center" id="first-left-center"></div>
        </div>
        <div className="circle" id="first-right-circle">
            <div className="center-right" id="first-right-center"></div>
        </div>
        <div className="result-box-content">
            <div className="circular-container">
                <CircularProgressBar percentage={percentage} circleWidth={circleWidth}></CircularProgressBar>
            </div>
            <div className="feedback-container">
                <h3 className="feedback-title">Good Result!</h3>
                <p className="feedback-description">Share your achievement with you friend</p>
            </div>
        </div>
        
    </div>
}

export default ResultBox;