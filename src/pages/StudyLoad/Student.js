import React, { Component } from 'react';

import StudyLoad from '../../components/elements/StudyLoad';
import { getStudentSavedSchedules, getStudentInfo, getStudentStatus, getOldStudentInfo } from '../../helpers/apiCalls';
import { getLoggedUserDetails } from '../../helpers/helper';

export default class StudyLoadStudent extends Component {
    state = {
        subjects: null, studentInfo: null, enrollmentStatus: []
    }
    componentDidMount = () => {
        getStudentSavedSchedules(getLoggedUserDetails("idnumber"))
        .then(response => {  
            if(response.data) {          
                this.setState({
                    subjects: response.data.schedules,
                });
            }
        });
        if(["O","R","S"].includes(getLoggedUserDetails("classification"))){
            getOldStudentInfo(getLoggedUserDetails("idnumber"), 0)
            .then(response => {            
                if(response.data) {
                    this.setState({
                        studentInfo: response.data, 
                    }, () => {
                        getStudentStatus(this.state.studentInfo.stud_id)
                        .then(response => {
                            this.setState({
                                enrollmentStatus: response.data.status, 
                            });
                        });
                    }); 
                }
            })
        }
        else {
            getStudentInfo(getLoggedUserDetails("idnumber"), 0) 
            .then(response => {            
                if(response.data) {
                    this.setState({
                        studentInfo: response.data, 
                    }, () => {
                        getStudentStatus(this.state.studentInfo.stud_id)
                        .then(response => {
                            this.setState({
                                enrollmentStatus: response.data.status, 
                            });
                        });
                    }); 
                }
            }) 
        }  
    }
    render() {    
        const { subjects, studentInfo, enrollmentStatus } = this.state;
        const selectSubjectStatus = enrollmentStatus.length > 0 ? enrollmentStatus.filter(status => status.step === 4) : "";
        const isSelectedSubjects = selectSubjectStatus ? (selectSubjectStatus[0].done && selectSubjectStatus[0].approved ? true : false) : false;   
        return (
                <div className="box">
                    <div className="columns">
                        <div className="column is-half-widescreen pt-1 mt-1">
                            { isSelectedSubjects ? (
                                <StudyLoad
                                    subjects={subjects}
                                    studentInfo={studentInfo}
                                    enrollmentStatus={enrollmentStatus}
                                />
                                ) : (
                                    <div className="mb-2">
                                        <div className="notification is-link is-light">
                                            You can only view your study load once you have successfully selected your subjects.                                    
                                        </div>
                                    </div>
                                )
                            }
                            
                        </div>
                    </div>
                </div>     
        );
    };
}

export const StudyLoadHeader = () => (
    <div className="title is-4 ml-1">
        <i className="fas fa-book-reader"></i> Study Load
    </div> 
);