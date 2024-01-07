import { FunctionComponent, ReactNode } from "react";
import './PageHeader.style.css'
import {faArrowLeft, faEllipsisV, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PageHeaderProps {
    title: string;
    onClick: () => void;
    children?: ReactNode;
}

const PageHeader: FunctionComponent<PageHeaderProps> = ({title, onClick, children}) => {
    return <div className="page-header-main">
            <div className="page-header-info-section">
                <FontAwesomeIcon icon={faChevronLeft} className="icon-hover" onClick={onClick}/>
                <h3 id="page-header-title">{title}</h3>
            </div>
            <div className="page-header-button-section">
                {children}
            </div>
           </div>   
}

export default PageHeader;