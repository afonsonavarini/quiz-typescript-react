import { FunctionComponent, ReactNode } from "react";
import './PageHeader.style.css'
import {faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PageHeaderProps {
    title: string;
    onClick: () => void;
    children?: ReactNode;
}

const PageHeader: FunctionComponent<PageHeaderProps> = ({title, onClick, children}) => {
    return <div className="page-header-main">
            <div className="page-header-info-section">
                <div className="icon-container-go-back">
                    <FontAwesomeIcon icon={faChevronLeft} className="icon-hover-go-back" onClick={onClick}/>
                </div>
                <div className="page-header-container">
                    <h3 id="page-header-title">{title}</h3>
                </div>
            </div>
            <div className="page-header-button-section">
                {children}
            </div>
           </div>   
}

export default PageHeader;