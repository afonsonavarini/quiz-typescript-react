import React, { FunctionComponent, useState } from "react";
import './UserBox.style.css';
import BellImage from '../../assets/bell.svg';

interface UserBoxProps {
    username: string;
    notification?: string;
}

const UserBox: FunctionComponent<UserBoxProps> = ({ username, notification }) => {
    const [showNotification, setShowNotification] = useState(false);

    function toggleNotification(): void {
        // Adiciona ou remove a classe 'highlighted' da imagem do sino
        const bellImage = document.querySelector('.bell-image');
        if (bellImage) {
            if (showNotification) {
                bellImage.classList.remove('highlighted');
            } else {
                bellImage.classList.add('highlighted');
            }
        }
    
        // Alterna o estado showNotification
        setShowNotification(!showNotification);
    }

    return (
        <div className="user-box-main">
            <div className="user-container-part">
                <div className="user-circle-img"></div>
                <p>Hello, <span className="username">{username}</span></p>
            </div>
            <div className={showNotification ? "notification-box" : "notification-box hidden"}>
                <span className="notification-info">{notification ? notification : "No notifications."}</span>
            </div>
            <div className="user-container-part-two">
                <div className="bell-container" onClick={toggleNotification}>
                    <img
                        src={BellImage}
                        className={showNotification || (notification && notification.length > 0) ? "bell-image highlighted" : "bell-image"}
                        alt="Bell"
                    />
                </div>
            </div>
        </div>
    );
}

export default UserBox;
