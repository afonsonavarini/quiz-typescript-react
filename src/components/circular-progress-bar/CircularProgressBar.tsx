import { FunctionComponent } from "react";
import './CircularProgressBar.style.css'


interface PageHeaderProps {
    percentage: number;
    circleWidth: number;
}


const CircularProgressBar: FunctionComponent<PageHeaderProps> = ({percentage, circleWidth}) => {
    const radius = circleWidth / 4;
    const dashArray = radius * Math.PI * 2;
    const dashOffset = dashArray - (dashArray * percentage) / 100;
    return <div className="circular-progress-main">
        <svg
            width={circleWidth}
            height={circleWidth}
            viewBox={`0 0 ${circleWidth} ${circleWidth}`}
        >
          <circle
            cx={circleWidth/2}
            cy={circleWidth/2}
            strokeWidth="12px"
            r={radius}
            className="circle-background"
          />
          <circle
            cx={circleWidth/2}
            cy={circleWidth/2}
            strokeWidth="12px"
            r={radius}
            className="circle-progress"
            style={{
                strokeDasharray: dashArray,
                strokeDashoffset: dashOffset,
            }}
            transform={`rotate(-90 ${circleWidth / 2} ${circleWidth / 2})`}
          />

          <text x="50%" y="50%" dy="0.3em" textAnchor="middle" className="percentage-text">{percentage * -1}%</text>
        </svg>
    </div>
}

export default CircularProgressBar;