import { FunctionComponent, useState } from "react";
import './UserBox.style.css';
import BellImage from '../../assets/bell.svg';
import NoNotificationBellImage from '../../assets/bell-no-notifications.svg'

interface UserBoxProps {
    username: string;
    notification?: string;
}

const UserBox: FunctionComponent<UserBoxProps> = ({ username, notification }) => {
    const [showNotification, setShowNotification] = useState<boolean>(false);

    function toggleNotification(): void {
        const bellImage = document.querySelector('.bell-image') as HTMLImageElement;;
        if (bellImage) {
            if (showNotification) {
                bellImage.src = NoNotificationBellImage
                bellImage.className = "bell-image"              
            } else {
                bellImage.className = "bell-image highlighted"
            }
        }
    
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
                        src={showNotification || (notification) ? BellImage : NoNotificationBellImage}
                        className="bell-image"
                        alt="Bell"
                    />
                </div>
            </div>
        </div>
    );
}

export default UserBox;
