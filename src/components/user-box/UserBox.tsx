import { FunctionComponent } from "react";
import './UserBox.style.css'
import BellImage from '../../assets/bell.svg'

interface UserBoxProps {
    username: string;
}

const UserBox: FunctionComponent<UserBoxProps> = ({username}) => {
    return <div className="user-box-main">
        <div className="user-container-part">
            <div className="user-circle-img"></div>
            <p>Hello, <span className="username">{username}</span></p>
        </div>
        <div className="user-container-part-two">
            <div className="bell-container">
                <img src={BellImage} className="bell-image" alt="Bell"></img>   
            </div>
                  
        </div>
        
    </div>
}

export default UserBox;