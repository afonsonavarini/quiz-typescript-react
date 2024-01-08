import { FunctionComponent, useEffect, useState } from "react";
import './Timer.style.css';
import TimerIcon from '../../assets/icons/timer.svg';
import { formatTime } from "../../constants/functions";

interface TimerProps {
    time: number;
    onTimeExpired?: () => void;
}



const Timer: FunctionComponent<TimerProps> = ({time, onTimeExpired}) => {

    const [remainingTime, setRemainingTime] = useState<number>(time * 60);

    useEffect(() => {
      const timerInterval = setInterval(() => {
        setRemainingTime(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
      if (remainingTime === 0 && onTimeExpired) {
        onTimeExpired();
      }
  
      return () => clearInterval(timerInterval);
    }, [time, remainingTime]);

    
    
    return <div className="timer-main">
        <div className="timer-content">
            <img src={TimerIcon} alt="Clock Icon" id="timer-icon"></img>
            <span>{formatTime(remainingTime)}</span>
        </div>
    </div>
}

export default Timer;