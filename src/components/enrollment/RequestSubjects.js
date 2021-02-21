import React, { Component,Fragment } from "react";
import { withRouter } from 'react-router-dom';
import SubjectForm from '../enrollment/RequestSubjectForm';
import SearchRequestSubject from '../elements/SearchRequestSubject';
import { getCurriculum, getStudentRequest,saveSubjectRequest,getStudentRequestSubject } from '../../helpers/apiCalls';
import { getLoggedUserDetails } from "../../helpers/helper";
import RequestedSubjects from '../elements/RequestedSubjects';

export class RequestSubjects extends Component {
    state = {
        showRequestForm:false, subject_name: null, days: null, time_start: null, time_end:null,requestedSubjects: null,
         requestSubjects: null,rtype: 0, subjects: null, internal_code: null, success: null, closeButton:null
    }
    
    componentDidMount = () => {
         getStudentRequest(getLoggedUserDetails("coursecode"))
         .then(response => {  
            if(response.data) {          
                this.setState({
                    requestSubjects: response.data.request
                });
            }
        }); 
        getCurriculum(getLoggedUserDetails("idnumber"))
        .then(response => {  
            if(response.data) {          
                this.setState({
                    subjects:  response.data.subjects
                });
            }
        }); 
        getStudentRequestSubject(getLoggedUserDetails("idnumber"))
        .then(response => {
            if(response.data) {          
                this.setState({
                    requestedSubjects:  response.data.request
                });
                const{requestedSubjects} = this.state;
                console.log(requestedSubjects);
            }
        });
    }
    
    inputChange = input => e => {
        this.setState({
            [input]: e.target.value
        });
    };
    handleCloseButton = () =>{
        this.setState({
            success: null
        });
        console.log("test");
    }
    handleRequestButton=()=>{
        const{showRequestForm}=this.state;
        this.setState({
            showRequestForm: !showRequestForm
        });
    }
    
    handleButtonSubmitRequest = () =>{
        const{internal_code, days, time_start, time_end, mdn, rtype,success} = this.state;
        const data = {
            internal_code: internal_code,
            time_start: time_start,
            time_end: time_end,
            mdn: "AM",
            days: days,
            rtype: rtype,
            id_number: getLoggedUserDetails("idnumber")
        }
        saveSubjectRequest(data)
        .then(response => {  
            if(response.data) {          
                this.setState({
                    success:  response.data.success
                });
                getStudentRequest(getLoggedUserDetails("coursecode"))
                .then(response => {  
                    if(response.data) {          
                        this.setState({
                            requestSubjects: response.data.request
                        });

                        getStudentRequestSubject(getLoggedUserDetails("idnumber"))
                        .then(response => {
                            if(response.data) {          
                                this.setState({
                                    requestedSubjects:  response.data.request
                                });
                                const{requestedSubjects} = this.state;
                                console.log(requestedSubjects);
                            }
                        });
                    }
                }); 
            }
        });

        if(success > 0){
            this.setState({
                id_number: getLoggedUserDetails("idnumber")
            });
        }
    }
    handleOnChangeSelect = e => {
        const{internal_code} = this.state;
        this.setState({
            internal_code: e

        });
    }
    handleCheckBox = (event) => {
        const target = event.target;
        const{rtype,} = this.state;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        value = value? 1 : 0;
        this.setState({
          rtype: value
        });

        console.log("rtype", rtype)
      }
      handleButtonAdd = () =>{
      }
    render() {
        const{showRequestForm, requestSubjects, subject_name,days,
        time_end,time_start,rtype,subjects,success, internal_code,requestedSubjects} = this.state;
        const values = {subject_name, days, time_end, time_start,rtype,internal_code};
        var count = 0;
        var sanitizedSubjectList = subjects ? subjects.map((subject, index) => {
            return { value: subject.internal_code, name: subject.subject_name}
        }):[];
        
        return (
        <Fragment>
            <div className="box ml-1 mb-1">
                <div className="columns">
                    <div className="column is-two-thirds">
                        <RequestedSubjects 
                            showRequestForm = {showRequestForm}
                            handleRequestButton = {this.handleRequestButton}
                            requestedSubjects = {requestedSubjects}
                        />
                        
                        <SearchRequestSubject
                            requestSubjects = {requestSubjects}
                        />
                    </div>
                    {showRequestForm ? 
                        <SubjectForm
                            inputChange = {this.inputChange}
                            values = {values}
                            handleButtonSubmitRequest = {this.handleButtonSubmitRequest}
                            sanitizedSubjectList = {sanitizedSubjectList}
                            handleCheckBox = {this.handleCheckBox}
                            success = {success}
                            handleOnChangeSelect = {this.handleOnChangeSelect}
                            handleCloseButton = {this.handleCloseButton}
                        /> : ""
                    }
                   
                </div> 
                
            </div>
            
        </Fragment>
        )
    };
}
export const RequestSubjectHeader = () => (
    <div className="title is-4 ml-1">
        <i className="fas fa-edit"></i> Enrollment / Subject Request
    </div> 
);
