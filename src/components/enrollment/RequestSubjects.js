import React, { Component,Fragment } from "react";
import { withRouter } from 'react-router-dom';
import SubjectForm from '../enrollment/RequestSubjectForm';
import SearchRequestSubject from '../elements/SearchRequestSubject';
import { getCurriculum, getStudentRequest,saveSubjectRequest,getStudentRequestSubject,addStudentRequest,cancelStudentRequest } from '../../helpers/apiCalls';
import { getLoggedUserDetails,checkRequestedSubject,toStandardTime,autoTimeEndSetter } from "../../helpers/helper";
import RequestedSubjects from '../elements/RequestedSubjects';

export class RequestSubjects extends Component {
    state = {
        showRequestForm:false, subject_name: null, days: null, time_start: null, time_end:null,requestedSubjects: null,
         requestSubjects: null,rtype: 0, subjects: null, internal_code: null, success: null, closeButton:null, sanitizedSubject: {test: null}
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
        //console.log(getLoggedUserDetails("idnumber"));
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
                //this.sanitizedSubjectList();
            }
        });
        
    }
    
   
    inputChange = input => e => {
        this.setState({
            [input]: e.target.value
        });
        if(input == "time_start"){
            this.setState({
                time_end: autoTimeEndSetter(e.target.value)
            });
        }
        console.log("INPUT ",input);
    }
    
    handleCloseButton = () =>{
        this.setState({
            success: null
        });
        //console.log("test");
    }
    handleAddSubjectButton = (e) =>{
        
        const data = {
            id_number: getLoggedUserDetails("idnumber"),
            internal_code: e
        };
        console.log("handleAddSubject",data);
        addStudentRequest(data)
        .then(response => {
            if(response.data) {     
                this.handleLoadSubjectRequest();
            }
        });
    }
    handleCancelSubjectButton = (e) =>{
        const data = {
            id_number: getLoggedUserDetails("idnumber"),
            internal_code: e
        };
        cancelStudentRequest(data)
        .then(response => {
            if(response.data) {     
                this.handleLoadSubjectRequest();
            }
        });
    }
    handleRequestButton=()=>{
        const{showRequestForm}=this.state;
        this.setState({
            showRequestForm: !showRequestForm
        });
    }
    splitMilitaryTime = (military) =>{
        military = military.split(":");
        var cTime= military[0]+military[1];
        return (parseInt(cTime)).toString();
    }

    handleButtonSubmitRequest = () =>{
        const{internal_code, days, time_start, time_end, mdn, rtype,success} = this.state;
        let mDn = "AM";
        if(this.splitMilitaryTime(time_end) >= 1200){
            mDn = "PM";
        } 
        const data = {
            internal_code: internal_code,
            time_start: toStandardTime(time_start),
            time_end: toStandardTime(autoTimeEndSetter(time_start)),
            m_time_start: this.splitMilitaryTime(time_start),
            m_time_end: this.splitMilitaryTime(autoTimeEndSetter(time_start)),
            mdn: mDn,
            days: days,
            rtype: rtype,
            id_number: getLoggedUserDetails("idnumber")
        }
        console.log("intenral_code",data);
        saveSubjectRequest(data)
        .then(response => {  
            if(response.data) {          
                this.setState({
                    success:  response.data.success
                });
                this.handleLoadSubjectRequest();
            }   
        });
    }
    handleLoadSubjectRequest =()=>{
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
                            requestedSubjects: response.data.request
                        });
                        //const{requestedSubjects} = this.state;
                    }
                });
            }
        }); 
    }
    handleOnChangeSelect = e => {
        const{internal_code} = this.state;
        this.setState({
            internal_code: e.value
        });
        //console.log("test e",e);
    }
    handleCheckBox = (event) => {
        const target = event.target;
        const{rtype,} = this.state;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        value = value? 1 : 0;
        this.setState({
          rtype: value
        });

        //console.log("rtype", rtype)
      }
    render() {
        const{showRequestForm, requestSubjects, subject_name,days,
        time_end,time_start,rtype,subjects,success, internal_code,requestedSubjects} = this.state;
        const values = {subject_name, days, time_end, time_start,rtype,internal_code};
        var count = 0;
        var sanitizedSubjectList = subjects ? subjects.map((subject, index) => {
            return {  value: subject.internal_code, label: subject.subject_name}
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
                            handleCancelSubjectButton = {this.handleCancelSubjectButton}
                        />
                        
                        <SearchRequestSubject
                            requestedSubjects = {requestedSubjects}
                            requestSubjects = {requestSubjects}
                            handleAddSubjectButton = {this.handleAddSubjectButton}
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
