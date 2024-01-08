import { FunctionComponent } from "react";
import './Button.style.css'

interface ButtonProps {
    text: string;
    onClick?: () => void;
    outlined?: boolean;
    buttonWidthPercentage?: number;
  }
  

const Button: FunctionComponent<ButtonProps> = ({text, onClick, outlined, buttonWidthPercentage}) => {
    return <div className={`button-main ${outlined ? 'outlined' : ''}`} style={{width: `${buttonWidthPercentage}%`}} onClick={onClick}>
                <span>{text}</span>
           </div>
}

export default Button;