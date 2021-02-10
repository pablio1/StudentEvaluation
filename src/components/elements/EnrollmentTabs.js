import React, { Component } from 'react';

export default class EnrollmentTabs extends Component {
    state = {
        selectedTab: "pending"  
    }
    handleOnClickTab = (tab, value) => {
        this.props.handleOnClickTab(tab, value);
        this.setState({
            selectedTab : tab
        });
    }
    render(){
        const { pending, approved, disapproved, totalPending, totalApproved, totalDisapproved, totalRequests, requests, viewer } = this.props;
        const { selectedTab } = this.state;
        /*const loadRequests = ["DEAN", "CHAIRPERSON"].includes(viewer) && requests !== "none" ? (
            <button name="requests" className={"button " + (selectedTab === "requests" ? "is-info is-selected" : "")} 
                    onClick={() => this.handleOnClickTab("requests", requests)}>
                <span className="icon is-small">
                    <i className="fas fa-business-time"></i>
                </span>
                <span>Requests <span className="tag is-danger">{totalRequests}</span></span>
            </button>
        ) : ""; */
        return(
            <div className="buttons has-addons is-centered">                
                <button name="pending" className={"button " + (selectedTab === "pending" ? "is-info is-selected" : "")} 
                        onClick={() => this.handleOnClickTab("pending", pending)}>
                    <span className="icon is-small">
                        <i className="fas fa-envelope-open-text"></i>
                    </span>
                    {/*totalPending > 0 ? <span title="" className="badge is-danger is-top-left ">{totalPending}</span> : ""*/}
                    <span>Pending Approval <span className="tag is-danger">{totalPending}</span></span>
                </button>
                <button name="approved" className={"button " + (selectedTab === "approved" ? "is-info is-selected" : "")}
                        onClick={() => this.handleOnClickTab("approved", approved)}>
                    <span className="icon is-small">
                        <i className="fas fa-check-circle"></i>
                    </span>
                    <span>Approved <span className="tag is-link">{totalApproved}</span></span>
                </button>
                {
                    viewer === "ACCOUNTING" || viewer === "CASHIER" || disapproved === "disabled" ? "" : (
                        <button name="disapproved" className={"button " + (selectedTab === "disapproved" ? "is-info is-selected" : "")} 
                            onClick={() => this.handleOnClickTab("disapproved", disapproved)}>
                            <span className="icon is-small">
                                <i className="fas fa-ban"></i>
                            </span>
                            <span>Disapproved <span className="tag is-link">{totalDisapproved}</span></span>
                        </button>
                    )
                }
                {/*loadRequests*/}
            </div>   
        );
    };
}