import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';

import { getLoggedUserDetails } from '../../helpers/helper';

import AssessmentReports from './AssessmentReports';

class AdminTools extends Component {
    state = {
        selectedTab: "reports"
    }
    handleOnClickTab = e => {
        this.setState({
            selectedTab: e,
        });
    }
    render() {
        if (!["ACCOUNTING", "CASHIER"].includes(getLoggedUserDetails("usertype") )) {
            return <Redirect to="/login" />;
        }
        const { selectedTab } = this.state;
        const loadAssessmentReports = (
            <AssessmentReports />
        );
        return (
            <div className="box ml-1">
                <div className="buttons has-addons is-centered">                
                    <button name="reports" className={"button " + (selectedTab === "reports" ? "is-info is-selected" : "")} 
                            onClick={() => this.handleOnClickTab("reports")}>
                        <span className="icon is-small">
                            <i className="fas fa-chart-bar"></i>
                        </span>
                        <span>Reports</span>
                    </button>                      
                </div>  
                <div className="">
                    <div className="divider is-size-6 mt-0 pt-0"></div>
                </div> 
                { selectedTab === "reports" ? loadAssessmentReports : "" }               
            </div>       
        );
    }
}

export default withRouter(AdminTools)

export class AdminToolsHeader extends Component {
    render() {
        return(
            <div className="title is-4 ml-1">
                <i className="fas fa-edit"></i> Admin Tools
            </div> 
        )
    }
    
}