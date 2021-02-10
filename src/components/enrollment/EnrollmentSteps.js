import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import store from 'store2';

import isLoggedIn from '../../helpers/isLoggedIn';
import { getLoggedUserDetails, determineEnrollmentStepStatus, sortArrayObjectsByProp } from '../../helpers/helper';
import { cancelEnrollment } from '../../helpers/apiCalls';

import StepPanel from '../elements/StepPanel';

class EnrollmentSteps extends Component {
    state = {
        idnumber: '', enrollmentStatus: [], notifications: [], classification: '', enrollmentCancelled: false, oldStudentUpdated: false,
        isEnrollmentPeriod: true, isAdjustmentPeriod: false, hasAdjustment: false
    }
    componentDidMount = () => {        
        if (isLoggedIn()) {  
                const idNumber = getLoggedUserDetails("idnumber");
                const data = { id_number: idNumber };
                const headers = { 
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': 'Bearer ' + store.get("token")
                };
                const apiRequest1 = axios.post(process.env.REACT_APP_API_UC_CHECK_ENROLLMENT_STATUS, data, {headers});
                const apiRequest2 = axios.post(process.env.REACT_APP_API_UC_NOTIFICATIONS, data, {headers});
                Promise.all([apiRequest1, apiRequest2]).then(values =>  {
                    if(values[0] && values[0].data.status) {
                        const enrollStatus = values[0].data.status;
                        this.setState({
                            enrollmentStatus: enrollStatus.length > 0 ? enrollStatus : dummyStudentStatus.status, 
                            notifications: values[1].data.notifications,
                            classification: enrollStatus.length > 0 ? values[0].data.classification : getLoggedUserDetails("classification"),
                            enrollmentCancelled: values[0].data.is_cancelled === 0 ? false : true,
                            idnumber: idNumber,
                            oldStudentUpdated: enrollStatus.length > 0 ? true : false,
                            isEnrollmentPeriod: values[0].data.enrollment_open === 1 ? true : false, 
                            isAdjustmentPeriod: values[0].data.adjustment_open === 1 ? true : false,
                            hasAdjustment: values[0].data.has_adjustment === 1 ? true : false
                        });
                    }
                    else {
                        alert("Connectivity issue detected. Your session has been terminated. Please login again.");
                        store.remove('token');
                        store.remove('loggeduser');
                        const { history } = this.props;
                        history.push('/login');
                    }
                }).catch(error => {
                    console.log(error);
                });
        }
    }
    handleClickPanel = e => {
        let panelName = e.target.getAttribute("panelname");
        this.toggleShowSubPanel("showSub" + panelName.slice(10))
    }
    toggleShowSubPanel = e => {
        const subPanelName = this.state[e];
        this.setState({ [e] : !subPanelName });
    }
    handleStartButton = e => {
        const { history } = this.props;
        // e = enrollment step number
        if(e === 1) {
            if(["O","R","S"].includes(this.state.classification)) { //If old student
                history.push("/enrollment/student/updateverifyemail");
            }
            else {
                history.push("/enrollment/student/register");
            }    
        } 
        if(e === 4) {
            history.push("/enrollment/student/selectsubjects/enrollment");
        } 
        if(e === 7) {
            history.push("/enrollment/student/uploadpayment");
        }
        if(e === 11) {
            history.push("/enrollment/student/selectsubjects/adjustment");
        }    
    }
    handleCancelEnrollment = () => {
        const confirmMsg = "Are you sure you want to cancel your Enrollment? You will loose all your accomplished steps and start again if you decide to re-enroll later.";
        if(window.confirm(confirmMsg)) {            
            cancelEnrollment(this.state.idnumber)
            .then(response => {
                if(response.data.success) {
                    this.setState({
                        enrollmentCancelled: true,
                    });
                    alert("Enrollment Cancelled.");
                }
                else alert("Enrollment Cancellation Failed! Please try again, if the issue persist please contact the EDP Office.")      
            });  
        }
    }
    render() {
        let {enrollmentStatus, notifications, enrollmentCancelled, oldStudentUpdated, isAdjustmentPeriod, isEnrollmentPeriod, hasAdjustment} = this.state; 
        let showStepsPanels = (
            <div className="notification">
                <p>
                    <span className="icon">
                        <i className="fas fa-spinner fa-pulse"></i>
                    </span>
                    &nbsp;<strong>Loading Steps</strong>
                </p>
                <p className="mt-2">If its still loading after 30 seconds, there might be a connectivity issue. Please logout and login again to refresh the session. </p>                                   
            </div>  
        );
        const stepsTitle = {
            1: ["H","T","C"].includes(this.state.classification) ? "Filing of Registration Forms" : "Updating of Contact Details",
            2: "Registrar Evaluation and Approval",
            3: "Dean/Principal Evaluation Approval",
            4: "Subject Selection",
            5: "Dean/Principal Subjects Approval",
            6: "Accounting Approval",
            7: "Cashier Approval",
            8: "Officially Enrolled"
        };
        if(enrollmentStatus.length > 0) {
            enrollmentStatus = sortArrayObjectsByProp(enrollmentStatus, "step");            
            showStepsPanels = enrollmentStatus.map((status, index) => {
                let stepStatus = determineEnrollmentStepStatus(status, enrollmentStatus);
                //if(!["H","T"].includes(this.state.classification) && status.step === 1) stepStatus = "current";
                if(!oldStudentUpdated && status.step === 1) stepStatus = "current";
                return <StepPanel
                            key={index}
                            stepMsgs={notifications.filter(notif => notif.message.includes("Step " + status.step))} 
                            stepNumber={status.step}
                            stepTitle={stepsTitle[status.step]}
                            stepStatus={stepStatus}  // done,current, process, denied, next
                            handleStartButton={this.handleStartButton}
                        />
            });
        }

        const isEnrolled = enrollmentStatus[7] && enrollmentStatus[7].done && enrollmentStatus[7].approved ? true : false;
        const isValidAdjustment = enrollmentStatus[4] && enrollmentStatus[4].done && enrollmentStatus[4].approved ? true : false;
        /*const loadCancelEnrollementBtn = !isEnrolled ?  (
                <button className="button is-fullwidth is-danger"
                    onClick={this.handleCancelEnrollment} >
                Cancel Enrollment</button>    
            ) : "";*/
        const loadAdjustEnrollementBtn = isValidAdjustment && isAdjustmentPeriod ?  (
            <button className="button is-fullwidth is-link has-text-weight-bold"
                onClick={() => this.handleStartButton(11)} >
            Adjust Schedules</button>    
        ) : "";  
        const loadAdjustEnrollementMsg = isValidAdjustment && isAdjustmentPeriod ?  (
            <div className="notification is-info is-light">
                <div className="content">
                    <h4 className="has-text-weight-semibold is-size-5">Adjustment Period is Open</h4>
                    You are now allowed to make adjustments with your selected schedules <strong>once (1)</strong> during the adjustment period.<br />Click the Adjust Subject button below the enrollment steps if you need to adjust otherwise just ignore.
                </div>
            </div>    
        ) : "";
        const loadAdjustmentUsedMsg = isValidAdjustment && isAdjustmentPeriod ?  (
            <div className="notification is-danger is-light">
                <div className="content">
                    <h4 className="has-text-weight-semibold is-size-5">Schedule Adjustment Used</h4>
                    You have already used up your schedule adjustment privilege. If you already submitted your adjustments, please wait for your dean/principal to evaluate and approve it. <br />
                    If the dean/principal already approved your submission and you want to request for another adjustment please contact your dean/principal to reactivate your adjustment privilege.
                </div>
            </div>    
        ) : "";   
        const loadMainSteps = (
            <div className="columns">
                <div className="column is-4">
                    <h4 className="is-size-4 has-text-weight-bold mb-2">Enrollment Steps</h4>
                    {showStepsPanels}   
                    <br />
                    { /*enrollmentStatus.length > 0 ?  loadCancelEnrollementBtn : ""*/ }  
                    { !hasAdjustment ? loadAdjustEnrollementBtn : "" }                
                </div> 
                <div className="column">
                    { !hasAdjustment ? loadAdjustEnrollementMsg : loadAdjustmentUsedMsg }
                    {
                        isEnrolled ? (
                            <div className="notification is-success is-light">
                                <div className="content">
                                    <h4 className="has-text-weight-semibold is-size-5">You have successfully enrolled to {process.env.REACT_APP_CURRENT_SCHOOL_TERM_FULL}</h4>
                                    <p>                                
                                        You will receive an email notification with your study load. Please check your inbox and spam folders. 
                                        To view your study load here, just click the Study Load button in the side navigation panel.     
                                    </p> 
                                    <p className="mb-0"><strong>Should you wish to withdraw your enrollment or any course/subject you will be charged as follows:</strong></p>
                                    <ol type="A" className="mt-1">
                                        <li>Registration fees - If you withdraw during enrollment period</li>
                                        <li>10% of total tuition plus registration fees - If you withdraw within first week of classes</li>
                                        <li>20% of total tuition plus registration fees - If you withdraw within second week of classes</li>
                                        <li>Full charges - If you withdraw after second week of classes</li>
                                    </ol>
                                    <h4 className="has-text-weight-semibold is-size-5">Happy Learning!</h4>
                                </div>
                            </div>
                        ) : (
                            <div className="notification is-success is-light">
                                <div className="content">
                                    <h4 className="has-text-weight-semibold is-size-5">Welcome to S.Y. 2020-21 2nd Semester Enrollment!</h4> 
                                    <p>                                
                                        We have prepared a step by step journey for you to get enrolled with ease. 
                                        You just have to follow <strong>8</strong> steps diligently and you will be fine. 
                                        We - your UC family - will be there with you with every step. You can reachout to us through {process.env.REACT_APP_EDP_EMAIL} if 
                                        you need assistance throughout the process. Your Dean or Principal are also glad to help you along the way.    
                                    </p>
                                    <h4 className="has-text-weight-semibold is-size-5">Are you ready? Lets get started.</h4>
                                    <p>                                  
                                        You can see all the steps in the panel to the left (or above if you are on mobile), but first here are some indicators you need to know:
                                    </p>
                                        <ol type="1">
                                            <li>A <span className="has-text-link has-text-weight-bold">Blue</span> colored step with the <i className="fas fa-exclamation"></i> icon is where you are currently at.</li>
                                            <li>
                                                If it requires action on your side there will be a <strong>Start Now</strong> button on the right side to redirect you
                                                to a form or an instruction page. It will not move to the next step if you will not accomplish it.
                                            </li>
                                            <li>
                                                Once the step is completed the Step bar will turn <span className="has-text-success has-text-weight-bold">Green</span> with 
                                                the <i className="fas fa-check"></i> icon. 
                                            </li>
                                            <li>
                                                If the action needed is from the Dean or from the Registrar, Accounting and Cashier then the Step Bar color will 
                                                remain <span className="has-text-link has-text-weight-bold">Blue</span> but the icon  will turn <i className="fas fa-hourglass-start fa-pulse"></i>
                                                . You will have to wait for them to process and evaluate your request. 
                                            </li>
                                            <li>
                                                If something is wrong with the Registrar and Dean's evaluation then the Step bar will turn <span className="has-text-danger has-text-weight-bold">Red</span> with 
                                                &nbsp;<i className="fas fa-times"></i> icon. You can see a message by clicking the Step bar Title. 
                                            </li>
                                            <li>
                                                To track each steps activity you can click on the Step bar Title and you can see the history. 
                                            </li>
                                        </ol>
                                        <h4 className="has-text-weight-semibold is-size-6">Onward to the next Step!</h4>  
                                </div>
                            </div>
                        )
                    }
                    
                    
                </div>                        
            </div>
        );
        const loadEnrollmentCancelled = (
            <div className="columns">
                <div className="column is-4">
                    <h4 className="is-size-4 has-text-weight-bold mb-2">Enrollment Cancelled</h4>
                    <p>
                        You have cancelled your enrollment for {process.env.REACT_APP_CURRENT_SCHOOL_TERM_FULL}. <br />
                        If you wish to go through again with the enrollment please contact the EDP office to reactivate you enrollment steps.  
                    </p>
                </div>
            </div>       
        );
        const loadEnrollmentPeriodEnded = (
            <div className="columns">
                <div className="column is-4">
                    <h4 className="is-size-4 has-text-weight-bold mb-2">Enrollment Period Ended</h4>
                    <p>
                        Enrollment for {process.env.REACT_APP_CURRENT_SCHOOL_TERM_FULL} has ended. <br />
                        For further details regarding Admission please contact our registrar's office through {process.env.REACT_APP_REGISTRAR_EMAIL}.
                        Open your portal from time to time for news and announcement. You can also visit out Facebook page for announcements. 
                    </p>
                </div>
            </div>       
        );
        let loadPanel = enrollmentCancelled ? loadEnrollmentCancelled : loadMainSteps; 
        if(!isEnrollmentPeriod) loadPanel = loadEnrollmentPeriodEnded;
        return(
            <Fragment>
                {enrollmentStatus && notifications ? loadPanel : "" }
            </Fragment>
        )
    }
}

export default withRouter(EnrollmentSteps)


const dummyStudentStatus = {
    classification: "O",
    is_cancelled: 0,
    status: [
      {
        step: 1,
        done: 0,
        approved: 0,
        date:  null
      },
      {
        step: 2,
        done: 0,
        approved: 0,
        date: null
      },
      {
        step: 3,
        done: 0,
        approved: 0,
        date: null
      },
      {
        step: 4,
        done: 0,
        approved: 0,
        date: null
      },
      {
        step: 5,
        done: 0,
        approved: 0,
        date: null
      },
      {
        step: 6,
        done: 0,
        approved: 0,
        date: null
      },
      {
        step: 7,
        done: 0,
        approved: 0,
        date: null
      },
      {
        step: 8,
        done: 0,
        approved: 0,
        date: null
      }
    ],
    needed_payment: "0"
  };