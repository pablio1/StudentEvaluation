import React, { Component } from 'react';
import moment from 'moment';
//import Collapsibles from '../../components/elements/Collapsibles';


export class Enrollment extends Component {
    state = {
        showSubRegistrationForm: false, showSubRegistrarApprove: false, showSubDeanApprove: false, showSubSelectSubject: false, showSubDeanApproveSubject: false,
        showSubAccountingApprove: false, showSubCashierApprove: false, showSubOfficiallyEnrolled: false,
        
        searchByEDPCodes: '', searchByEDPSubject: '',

    }
    handleClickPanel = e => {
        let panelName = e.target.getAttribute("panelname");
        this.toggleShowSubPanel("showSub" + panelName.slice(10))
    }
    toggleShowSubPanel = (e) => {
        const subPanelName = this.state[e];
        this.setState({ [e] : !subPanelName });
    }
    handleOnChangeInput = e => {

    }
    render() {
        const { 
            showSubRegistrationForm, showSubRegistrarApprove, showSubDeanApprove, showSubSelectSubject, showSubDeanApproveSubject, showSubAccountingApprove, 
            showSubCashierApprove, showSubOfficiallyEnrolled,

            searchByEDPCodes, searchByEDPSubject
        } = this.state;
        
        return (
            <div className="tile is-ancestor">
                <div className="tile is-4 is-vertical is-parent">
                    <div className="tile is-child box pt-2">
                        <h4 className="is-size-4 has-text-weight-bold mb-2">Enrollment Steps</h4>
                        <div className="notification is-success p-1 mb-0 has-text-weight-semibold">                  
                            <span className="icon">
                                <i className="fas fa-check"></i>
                            </span>
                            <span style={{ cursor: "pointer" }} panelname="enrollStepRegistrationForm" onClick={this.handleClickPanel}>
                                1. Filing of Registration Forms
                            </span>
                            <h4 className="is-size-7 is-pulled-right has-text-weight-bold mr-2 mt-1 is-italic">Submitted</h4>
                        </div>
                        <div className={"has-background-success-light p-3 mb-0 has-text-weight-semibold " + (showSubRegistrationForm ? "" : "is-hidden") }>                  
                            <h4 className="is-size-7 has-text-weight-bold mr-2 mt-1 is-italic">
                                [ {moment().format('MMMM Do YYYY, h:mm:ss a')} ] : 
                                   You have completed and submitted the Registration Forms
                            </h4>
                        </div>
                        <div className="notification is-link p-1 mb-0 mt-2 has-text-weight-semibold">    
                            <span className="icon">
                                <i className="fas fa-hourglass-start fa-pulse"></i>
                            </span>                
                            <span style={{ cursor: "pointer" }} panelname="enrollStepRegistrarApprove" onClick={this.handleClickPanel}>
                                2. Registrar Evaluation and Approval
                            </span>
                            <h4 className="is-size-7 is-pulled-right has-text-weight-bold mr-2 mt-1 is-italic">Processing</h4>
                        </div>
                        <div className={"has-background-success-light p-3 mb-0 has-text-weight-semibold " + (showSubRegistrarApprove ? "" : "is-hidden") }>                  
                            <h4 className="is-size-7 has-text-weight-bold mr-2 mt-1 is-italic">
                                [ {moment("20111031").format('MMMM Do YYYY, h:mm:ss a')} ] : 
                                   The Registrar viewed your application and currently evaluating. The Registrar might call the contact number you have entered 
                                   for verification. 
                            </h4>
                        </div>
                        <div className="notification is-danger p-1 pb-1 mb-0 mt-2 has-text-weight-semibold"> 
                            <span className="icon">
                                <i className="fas fa-times"></i>
                            </span>                    
                            <span style={{ cursor: "pointer" }} panelname="enrollStepDeanApprove" onClick={this.handleClickPanel}>
                                3. Dean/Principal Evaluation Approval
                            </span>
                            <h4 className="is-size-7 is-pulled-right has-text-weight-bold mr-2 mt-1 is-italic">Disapproved</h4>
                        </div>
                        <div className={"has-background-success-light p-3 mb-0 has-text-weight-semibold " + (showSubDeanApprove ? "" : "is-hidden") }>                  
                            <h4 className="is-size-7 has-text-weight-bold mr-2 mt-1 is-italic">
                                [ {moment("20211031").format('MMMM Do YYYY, h:mm:ss a')} ] : 
                                   The Dean/ Principal viewed your application and currently evaluating.  
                            </h4>
                            <h4 className="is-size-7 has-text-weight-bold mr-2 mt-1 is-italic">
                                [ {moment("20211231").format('MMMM Do YYYY, h:mm:ss a')} ] : 
                                   The Dean/ Principal denied your application.
                                   Reason: "The force is too strong for this padawan". 
                                   You can contact the dean to plead your case.  
                            </h4>
                        </div>
                        <div className="notification p-1 mb-0 mt-2 has-text-weight-semibold"> 
                            <span className="icon">
                                <i className="fas fa-minus-square"></i>
                            </span>                    
                            <span style={{ cursor: "pointer" }} panelname="enrollStepSelectSubject" onClick={this.handleClickPanel}>
                                4. Subject Selection
                            </span>
                            <h4 className="is-size-7 is-pulled-right has-text-weight-bold mr-2 mt-1 is-italic">Next Step</h4>
                        </div>
                        <div className="notification p-1 mb-0 mt-2 has-text-weight-semibold">                    
                            <span className="icon">
                                <i className="fas fa-minus-square"></i>
                            </span>                    
                            <span style={{ cursor: "pointer" }} panelname="enrollStepDeanApproveSubject" onClick={this.handleClickPanel}>
                                5. Dean/Principal Subjects Approval
                            </span>
                            <h4 className="is-size-7 is-pulled-right has-text-weight-bold mr-2 mt-1 is-italic">Next Step</h4>
                        </div>
                        <div className="notification p-1 mb-0 mt-2 has-text-weight-semibold">                    
                            <span className="icon">
                                <i className="fas fa-minus-square"></i>
                            </span>                    
                            <span style={{ cursor: "pointer" }} panelname="enrollStepAccountingApprove" onClick={this.handleClickPanel}>
                                6. Accounting Approval
                            </span>
                            <h4 className="is-size-7 is-pulled-right has-text-weight-bold mr-2 mt-1 is-italic">Next Step</h4>
                        </div>
                        <div className="notification p-1 mb-0 mt-2 has-text-weight-semibold">                    
                            <span className="icon">
                                <i className="fas fa-minus-square"></i>
                            </span>                    
                            <span style={{ cursor: "pointer" }} panelname="enrollStepCashierApprove" onClick={this.handleClickPanel}>
                                7. Cashier Approval
                            </span>
                            <h4 className="is-size-7 is-pulled-right has-text-weight-bold mr-2 mt-1 is-italic">Next Step</h4>
                        </div>
                        <div className="notification p-1 mb-0 mt-2 has-text-weight-semibold">                    
                            <span className="icon">
                                <i className="fas fa-minus-square"></i>
                            </span>                    
                            <span style={{ cursor: "pointer" }} panelname="enrollStepOfficiallyEnrolled" onClick={this.handleClickPanel}>
                                8. Officially Enrolled
                            </span> 
                            <h4 className="is-size-7 is-pulled-right has-text-weight-bold mr-2 mt-1 is-italic">Next Step</h4>                           
                        </div>
                    </div>                   
                </div>
                <div className="tile is-parent">
                    <div className="tile is-child box pt-2">
                        <h4 className="is-size-4 has-text-weight-bold mb-2">Subject Selection</h4>
                        
                        <div className="columns">
                            <div className="column">
                                <div className="notification">
                                    You belong in a blocked section. <strong>Section: 3A</strong>. <br />
                                    All subjects are fixed and if you wish to be de-blocked, you can send request to your dean to get de-blocked. <br />
                                    Click the button below to send de-blocking request or accept the subjects and proceed with the next step. <br />
                                    <div className="buttons">
                                        <button className="button is-small is-info mt-2 has-text-weight-semibold">Request de-block</button>
                                        <button className="button is-small is-primary mt-2 has-text-weight-semibold">Accept and Proceed</button>
                                    </div>                                    
                                </div>
                            </div>
                        </div>  

                        <div className="columns">
                            <div className="column">
                                <div className="notification is-danger">
                                    <span className="icon">
                                        <i className="fas fa-exclamation-triangle"></i>
                                    </span>
                                    <strong>Overloaded Units Detected</strong> <br />
                                    Your total selected number of units is over the allowed maximum units. <br />
                                    Click the button below to send request to the dean to allow your overload subjects. <br />
                                    <div className="buttons">
                                        <button className="button is-small is-info mt-2 has-text-weight-semibold">Request Overloading</button>
                                    </div>                                    
                                </div>
                            </div>
                        </div>   

                        <div className="columns">
                            <div className="column">
                                <div className="notification is-danger">
                                    <span className="icon">
                                        <i className="fas fa-exclamation-triangle"></i>
                                    </span>
                                    <strong>Schedule Conflicts Detected!</strong> <br />
                                    Please remove conflicted subjects. Choose another subject without conflicting schedules. <br />                                 
                                </div>
                            </div>
                        </div>               

                        <article className="message mt-0 pt-0">
                            <div className="message-header pt-2 pb-2">
                                <p>Selected Subjects</p>  
                                <button className="button is-small is-success mt-0 mb-0 has-text-weight-semibold">Save Subjects</button>                              
                            </div>
                            <div className="message-body p-0">
                                <div className="table-container">
                                    <table className="table is-striped is-fullwidth">
                                        <thead>
                                            <tr>
                                                <th>No.</th>
                                                <th>EDP Code</th>
                                                <th>Subject</th>
                                                <th>Type</th>
                                                <th>Units</th>
                                                <th>Days</th>
                                                <th>Begin Time</th>
                                                <th>End Time</th>
                                                <th>Room</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tfoot>
                                            <tr>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th>Total</th>
                                                <th className="has-text-centered">30</th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                            </tr>
                                        </tfoot>
                                        <tbody>
                                            <tr className="has-background-danger-light">
                                                <th>1</th>
                                                <td>543656</td>
                                                <td>Subject 1</td>
                                                <td>LEC</td>
                                                <td className="has-text-centered">3</td>
                                                <td>MW</td>
                                                <td className="has-text-right">7:30 AM</td>
                                                <td className="has-text-right">9:00 AM</td>
                                                <td>RM101</td>
                                                <td><span className="tag is-danger">Conflict - 433656</span></td>
                                                <td>
                                                    <button className="button is-small is-danger">
                                                        <span className="icon">
                                                        <i className="fas fa-times "></i>
                                                        </span>
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>2</th>
                                                <td>12356</td>
                                                <td>Subject 2</td>
                                                <td>LAB</td>
                                                <td className="has-text-centered">1</td>
                                                <td>TH</td>
                                                <td className="has-text-right">7:30 AM</td>
                                                <td className="has-text-right">9:00 AM</td>
                                                <td>RM104</td>
                                                <td><span className="tag is-success">Added</span></td>
                                                <td>
                                                    <button className="button is-small is-danger">
                                                        <span className="icon">
                                                        <i className="fas fa-times "></i>
                                                        </span>
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>3</th>
                                                <td>547656</td>
                                                <td>Subject 3</td>
                                                <td>LEC</td>
                                                <td className="has-text-centered">3</td>
                                                <td>T TH</td>
                                                <td className="has-text-right">10:00 AM</td>
                                                <td className="has-text-right">11:00 AM</td>
                                                <td>RM112</td>
                                                <td><span className="tag is-success">Added</span></td>
                                                <td>
                                                    <button className="button is-small is-danger">
                                                        <span className="icon">
                                                        <i className="fas fa-times "></i>
                                                        </span>
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr className="has-background-danger-light">
                                                <th>4</th>
                                                <td>433656</td>
                                                <td>Subject 4</td>
                                                <td>LEC</td>
                                                <td className="has-text-centered">3</td>
                                                <td>MW</td>
                                                <td className="has-text-right">7:30 AM</td>
                                                <td className="has-text-right">9:00 AM</td>
                                                <td>RM101</td>
                                                <td><span className="tag is-danger">Conflict - 543656</span></td>
                                                <td>
                                                    <button className="button is-small is-danger">
                                                        <span className="icon">
                                                        <i className="fas fa-times "></i>
                                                        </span>
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>5</th>
                                                <td>543656</td>
                                                <td>Subject 5</td>
                                                <td>LEC</td>
                                                <td className="has-text-centered">3</td>
                                                <td>F</td>
                                                <td className="has-text-right">2:30 AM</td>
                                                <td className="has-text-right">5:30 AM</td>
                                                <td>RM198</td>
                                                <td><span className="tag is-success">Added</span></td>
                                                <td>
                                                    <button className="button is-small is-danger">
                                                        <span className="icon">
                                                        <i className="fas fa-times "></i>
                                                        </span>
                                                    </button>
                                                </td>
                                            </tr>                                                           
                                        </tbody>
                                    </table>    
                                </div>
                            </div>
                        </article>

                        <div className="columns">   
                            <div className="column">
                                <div className="">
                                    <div className="divider is-size-6 mb-0 pb-0"></div>
                                </div>
                            </div>
                        </div>

                        <div className="columns">                            
                            <div className="column pt-0 is-narrow">
                                <h5 className="has-text-weight-bold mb-2">Units Left</h5>
                                <div className="field">
                                    <button className="button is-danger is-fullwidth is-small ">
                                        <span className="has-text-weight-bold is-size-6 p-0">29</span>
                                    </button>                                   
                                </div>
                            </div>
                            <div className="column pt-0">
                                <h5 className="has-text-weight-bold mb-2">Search by EDP Codes</h5>
                                <div className="field">
                                    <div className="control has-icons-left has-icons-right">                                                    
                                        <input name="searchByEDPCodes" className="input is-small" type="text" placeholder="Search EDP Codes" 
                                            onChange={this.handleOnChangeInput} value={searchByEDPCodes} data-fieldname="EDP Codes"/>
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-barcode"></i>
                                        </span>
                                    </div>
                                </div>   
                            </div>
                            <div className="column pt-0">
                                <h5 className="has-text-weight-bold mb-2">Search by EDP Subject</h5>
                                <div className="field">
                                    <div className="control has-icons-left has-icons-right">                                                    
                                        <input name="searchByEDPSubject" className="input is-small" type="text" placeholder="Search Subject" 
                                            onChange={this.handleOnChangeInput} value={searchByEDPSubject} data-fieldname="Subject"/>
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-barcode"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="column pt-0 is-2">
                                <h5 className="has-text-weight-bold mb-2">&nbsp;</h5>
                                <div className="field">
                                    <button className="button is-info is-small is-fullwidth">
                                        <span className="icon">
                                            <i className="fas fa-search"></i>
                                        </span>
                                        <span className="has-text-weight-semibold is-size-6 p-0">Search</span>
                                    </button>                                   
                                </div>
                            </div>
                        </div>
                        

                        <article className="message mb-0">
                            <div className="message-header">
                                <p>Search Results</p>                                
                                <button className="" aria-label="delete"><i className="fas fa-minus"></i></button>
                            </div>
                            <div className="message-body p-0">
                                <div className="table-container" style={{ overflowY : "auto", maxHeight: "200px" }}>
                                    <table className="table is-striped is-fullwidth">
                                        <thead>
                                            <tr>
                                                <th>EDP Code</th>
                                                <th>Subject</th>
                                                <th>Type</th>
                                                <th>Units</th>
                                                <th>Days</th>
                                                <th>Begin Time</th>
                                                <th>End Time</th>
                                                <th>Room</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="has-background-grey-lighter">
                                                <td>543656</td>
                                                <td>Subject 1</td>
                                                <td>LEC</td>
                                                <td className="has-text-centered">3</td>
                                                <td>MW</td>
                                                <td className="has-text-right">7:30 AM</td>
                                                <td className="has-text-right">9:00 AM</td>
                                                <td>RM101</td>
                                                <td><span className="tag is-danger">Dissolved</span></td>
                                                <td>
                                                    <button className="button is-small is-info">
                                                        <span className="icon">
                                                        <i className="fas fa-plus"></i>
                                                        </span>
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>12356</td>
                                                <td>Subject 2</td>
                                                <td>LAB</td>
                                                <td className="has-text-centered">1</td>
                                                <td>TH</td>
                                                <td className="has-text-right">7:30 AM</td>
                                                <td className="has-text-right">9:00 AM</td>
                                                <td>RM104</td>
                                                <td><span className="tag is-success">Added</span></td>
                                                <td>
                                                    <button className="button is-small is-info">
                                                        <span className="icon">
                                                        <i className="fas fa-plus "></i>
                                                        </span>
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>547656</td>
                                                <td>Subject 3</td>
                                                <td>LEC</td>
                                                <td className="has-text-centered">3</td>
                                                <td>T TH</td>
                                                <td className="has-text-right">10:00 AM</td>
                                                <td className="has-text-right">11:00 AM</td>
                                                <td>RM112</td>
                                                <td><span className="tag is-success">Added</span></td>
                                                <td>
                                                    <button className="button is-small is-info">
                                                        <span className="icon">
                                                        <i className="fas fa-plus "></i>
                                                        </span>
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr className="has-background-grey-lighter">
                                                <td>433656</td>
                                                <td>Subject 4</td>
                                                <td>LEC</td>
                                                <td className="has-text-centered">3</td>
                                                <td>MW</td>
                                                <td className="has-text-right">7:30 AM</td>
                                                <td className="has-text-right">9:00 AM</td>
                                                <td>RM101</td>
                                                <td><span className="tag is-danger">Dissolved</span></td>
                                                <td>
                                                    <button className="button is-small is-info">
                                                        <span className="icon">
                                                        <i className="fas fa-plus "></i>
                                                        </span>
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>543656</td>
                                                <td>Subject 5</td>
                                                <td>LEC</td>
                                                <td className="has-text-centered">3</td>
                                                <td>F</td>
                                                <td className="has-text-right">2:30 AM</td>
                                                <td className="has-text-right">5:30 AM</td>
                                                <td>RM198</td>
                                                <td><span className="tag is-success">Added</span></td>
                                                <td>
                                                    <button className="button is-small is-info">
                                                        <span className="icon">
                                                        <i className="fas fa-plus "></i>
                                                        </span>
                                                    </button>
                                                </td>
                                            </tr>                                                           
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </article>
                        
                        <div className="columns">   
                            <div className="column">
                                <div className="">
                                    <div className="divider is-size-6 mb-0 pb-0"></div>
                                </div>
                            </div>
                        </div>
                                               
                    </div>
                </div>
            </div>     
        );
    };
}

export const EnrollmentHeader = () => (
    <div className="title is-4 ml-1">
        <i className="fas fa-edit"></i> Enrollment
    </div> 
);