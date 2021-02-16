import React, { Component,Fragment } from "react";
import { withRouter } from 'react-router-dom';
import SubjectForm from '../enrollment/RequestSubjectForm';
import SearchRequestSubject from '../elements/SearchRequestSubject';
import { getCurriculum, getStudentRequest } from '../../helpers/apiCalls';
import { getLoggedUserDetails } from "../../helpers/helper";


export class RequestSubjects extends Component {
    state = {
        showRequestForm:false, subject_name: null, days: null, time_start: null, time_end:null,
         requestSubjects: null,rtype: null, subjects: null
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
    }
    inputChange = input => e => {
        
        this.setState({
            [input]: e.target.value
        });
        
    };
    handleRequestButton=()=>{
        const{showRequestForm}=this.state;
        this.setState({
            showRequestForm: !showRequestForm
        });

        console.log("test", showRequestForm);
    }
    handleButtonSubmitRequest= () =>{
        const{time_start,subject_name} = this.state;
        console.log("time_start",subject_name);
    }
    render() {
        const{showRequestForm, requestSubjects, subject_name,days,time_end,time_start,rtype,subjects} = this.state;
        const values = {subject_name, days, time_end, time_start,rtype};
        var count = 0;
        var sanitizedSubjectList = subjects ? subjects.map((subject, index) => {
            return { value: subject.internal_code, name: subject.subject_name}
        }):"";
    
        //var loadselectedRequest = selectedRequest ? selectedRequest.filter().map((selected, key)=>{
            
        //}):"";
        
        return (
        <Fragment>
            <div className="box ml-1 mb-1">
                <div className="columns">
                    <div className="column is-two-thirds">

                        <article className="message mb-0 is-small">
                            <div className="message-header">
                                <p>Requested Subjects</p>                                
                                <button className="is-small p-0" aria-label="delete">
                                    <span className="icon is-small">
                                    <i className="fas fa-minus"></i>
                                    </span>
                                </button>
                            </div>
                            <div className="message-body p-0">
                                <div className="table-container">
                                    <table className="table is-striped is-fullwidth is-hoverable">
                                        <thead>
                                            <tr>
                                                <th className="is-narrow">EDP Code</th>
                                                <th className="has-text-centered">Subject</th>
                                                <th className="has-text-centered">Type</th>
                                                <th className="has-text-centered">Days</th>
                                                <th className="has-text-centered">Time</th>
                                                <th className="has-text-centered">Status</th>
                                                <th className="has-text-centered">Actions</th>
                                            </tr>
                                        </thead>
                                        <tfoot>
                                            <tr>  
                                                <td colSpan="7"><button className="button is-small is-info is-pulled-right" onClick={this.handleRequestButton}>{showRequestForm? 'Hide Request Form' :'Request Subject'}</button></td>
                                               
                                            </tr>
                                        </tfoot>
                                        <tbody>
                                            <tr>
                                                <td className="has-text-centered">31212</td>
                                                <td className="has-text-centered">Econ 1</td>
                                                <td className="has-text-centered"></td>
                                                <td className="has-text-centered">TTH</td>
                                                <td className="has-text-centered">1:30 - 3:00 PM</td>
                                                <th className="has-text-centered has-text-info">Open</th>
                                                <td className="has-text-centered"></td>
                                            </tr>
                                            <tr>
                                                <td className="has-text-centered">-----</td>
                                                <td className="has-text-centered">Hist 1</td>
                                                <td className="has-text-centered"></td>
                                                <td className="has-text-centered">MW</td>
                                                <td className="has-text-centered">4:30 - 5:30 PM</td>
                                                <th className="has-text-centered">14/15</th>
                                                <td className="has-text-centered"><button className="button is-danger is-small">Cancel</button></td>
                                            </tr>                                                                                                                               
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </article>
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
