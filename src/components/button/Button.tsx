import { FunctionComponent } from "react";
import './Button.style.css'

interface ButtonProps {
    text: string;
    onClick?: () => void;
    outlined?: boolean;
  }
  

const Button: FunctionComponent<ButtonProps> = ({text, onClick, outlined}) => {
    return <div className={`button-main ${outlined ? 'outlined' : ''}`} onClick={onClick}>
                <span>{text}</span>
           </div>
}

export default Button;