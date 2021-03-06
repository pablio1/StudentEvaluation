import React, { Component, Fragment} from "react";
import SpinnerGif from '../../assets/sysimg/spinner.gif'
import { getCurriculum} from '../../helpers/apiCalls';
import { getGrade} from '../../helpers/helper';
import { getLoggedUserDetails, convertTabToYear, convertYearToTab } from '../../helpers/helper';

export class BehindSubject extends Component {
    state = {
        subjects: null, grades: null, schedules: null
    }
    componentDidMount = () =>{
        getCurriculum(getLoggedUserDetails("idnumber"))
        .then(response => {  
            if(response.data) {          
                this.setState({
                    subjects: response.data.subjects,
                    prerequisites: response.data.prerequisites,
                    grades: response.data.grades,
                    schedules: response.data.schedules
                });
            }
        });  
    }
    render() {
        
        const{subjects, grades, schedules} = this.state;
        var loadSubjects = subjects ? subjects.filter(filt => filt.subject_type != 'L' && filt.year_level < getLoggedUserDetails("yearleve")).map((data, index)=>{
             /* var loadGrade = grades ? grades.filter(fgrade => fgrade.internal_code == ).map((dataGrade , key)=> {
                if(get)
            }) :""; */
            var validateGrade = (getGrade(grades, data.internal_code) > 3 || getGrade(grades, data.internal_code) == 0 ) ? true: false;
            if(validateGrade) {
                return(
                    <Fragment>
                        <tr key={index}  className = {getGrade(grades, data.internal_code) > 3? "has-background-danger-light": ""}>
                            <th className="is-narrow">{data.subject_name}</th>
                            <th>{data.descr_1}</th>
                            <th className="has-text-centered">0</th>
                            <th className="has-text-centered">0</th>
                            <th className="has-text-centered">0</th>
                            <th className="has-text-left"></th>
                            <th className="has-text-centered">{(getGrade(grades, data.internal_code) == 0)? "": getGrade(grades, data.internal_code)}</th>
                            <th className="has-text-centered"></th>
                        </tr>
                    </Fragment>
                )
            }
            
        }) : "";
        return (
        <Fragment>
            <div className="box ml-1 mb-1">
                <div className="columns">
                    <div className="column is-four-fifths">
                        <article className="message mb-0 pb-0 is-small">
                            <div className="message-header">
                                <p className="has-text-weight-bold">List of Behind Subjects</p>    
                                        
                            </div>
                            <div className="message-body p-0">
                                <div className="table-container">
                                    <table className="table is-striped is-fullwidth is-hoverable">
                                        <thead>
                                            <tr>
                                                <th className="is-narrow">Subject Code</th>
                                                <th>Descriptive Title</th>
                                                <th className="has-text-centered">Lec</th>
                                                <th className="has-text-centered">Lab</th>
                                                <th className="has-text-centered">Total Units</th>
                                                <th className="has-text-left">Pre-requisites</th>
                                                <th className="has-text-centered">Grade</th>
                                                <th className="has-text-centered">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                          {loadSubjects ? loadSubjects : (
                                              <tr>
                                                  <td colSpan="8" className="has-text-centered is-small">No behind subject found!</td>
                                              </tr>
                                          )}                                                                                             
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </Fragment>
        )
    };
}

export const BehindSubjectHeader = () => (
    <div className="title is-4 ml-1">
        <i className="fas fa-file"></i> Behind Subjects
    </div> 
);
