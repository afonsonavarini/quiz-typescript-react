import { FunctionComponent } from "react";
import './PercentageBar.style.css'

interface PercentageBarProps {
    percentage: number;
    mainColor?: string | "#21BDCA";
}

const PercentageBar: FunctionComponent<PercentageBarProps> = ({percentage, mainColor}) => {
    return <div className="percentage-bar-container">
              <div className="percentage-bar-content" style={{ width: `${percentage}%`, backgroundColor: mainColor }}></div>
           </div>
}

export default PercentageBar;