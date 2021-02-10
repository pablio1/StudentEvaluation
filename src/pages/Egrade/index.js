import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import { getLoggedUserDetails } from '../../helpers/helper';

import StudentView from './StudentView';
import StaffView from './StaffView';

class Egrade extends Component {
    render() {
        let showPanel = "";
        switch(getLoggedUserDetails("usertype")) {         
            case "STUDENT": showPanel = <StudentView />; break;
            case "FACULTY": showPanel = <StaffView />; break;
            case "DEAN": showPanel = <StaffView />; break;
            case "CHAIRPERSON": showPanel = <StaffView />; break;
            case "COOR": showPanel = <StaffView />; break;
            case "ACAD": showPanel = <StaffView />; break;
            case "LINKAGE": showPanel = <StaffView />; break;
            case "EDP": showPanel = <StaffView />; break;
            case "ADMIN": showPanel = <StaffView />; break;
            default: return <div>---</div>   
        }
        return (           
            <Fragment>
                {showPanel}
            </Fragment>    
        );
    }
}

export default withRouter(Egrade)

export class EgradeHeader extends Component {
    render() {
        return(
            <div className="title is-4 ml-1">
                <i className="fas fa-table"></i> E-Grade
            </div> 
        )
    }
    
}