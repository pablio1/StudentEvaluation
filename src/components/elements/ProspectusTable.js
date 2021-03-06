import React, { Component, Fragment } from 'react';
import {hasSubjectLab, getGrade,getLoggedUserDetails } from '../../helpers/helper';
export default class ProspectusTable extends Component {

    
    state = {
        selectedSubject: null, internal_code: null, subjectDescription: null,
        grade: 2.9
    }
    viewScheduleButtonHandle = (selected, internal, description) =>{
        const{selectedSubject,internal_code,subjectescription} = this.state;
        this.setState({
            selectedSubject: selected,
            internal_code: internal,
            subjectDescription: description
        })
        this.props.viewScheduleButtonHandle(selected, internal, description);
        console.log("checkTab",selectedSubject, internal, description);
    }
    viewButtonVisibity = (grade) => {
        var visible = false;
        if((grade > 3.0 || grade === 0 ) && grade != null && this.props.selectedTab <= getLoggedUserDetails("yearlevel")){
            visible = true;
        }
        return visible;
    }
    checkPrerequisiteStatus = (internal_code) =>{
        const {prerequisites, grades} = this.props;
        var status= false;
        var countGrade = 0;
        var countRemark = 0;
        var loadRemark = prerequisites? prerequisites.filter(filt => filt.internal_code == internal_code).map((remark, index)=>{
            countRemark++;
            var loadGrade = grades ? grades.filter(fil => fil.internal_code == remark.prerequisites).map((grade, key)=>{
                if( grade.final_grade < 3)
                    countGrade++;
            }) : "";
        }) : "";
        
        if(countRemark != 0){
            if(countRemark != countGrade){
                status = false;
            }else{
                status = true;
            }
        }else{
            status = true;
        }
           
        return status;
    }
  render() {
      const{grade} = this.state
      const {subjects,selectedTab, prerequisites, grades} = this.props;
      var totalUnitsForFirstSem = 0;
      var countRemark = 0;
      //var getPrerequisites = prerequisites ? prerequisites.filter(remark.student)
      var loadFirstSem = subjects? subjects.filter(filt => filt.year_level == selectedTab 
            && filt.semester == 1 && filt.subject_type !== 'L').map((sub, index) => {
                let labUnit = hasSubjectLab(subjects, sub.subject_name);
               totalUnitsForFirstSem = labUnit + parseInt(sub.units)+ totalUnitsForFirstSem;
               var getGrades = getGrade(grades, sub.internal_code)
               var getPrerequisites = prerequisites ? prerequisites.filter(remark => remark.internal_code === sub.internal_code).map((rem, i) => {
                    return ( 
                        <span key={i} className={"ml-1 tag"+ (getGrade(grades,rem.prerequisites) < 3 && getGrade(grades,rem.prerequisites) != 0? " is-success":" is-danger")}>{rem.subject_code}</span>
                    )
               }) :"";
            return(
                <Fragment key={index}>
                    <tr className = {getGrades > 3? "has-background-danger-light": ""}>
                        <td>{sub.subject_name}</td>
                        <td>{sub.descr_1}</td>
                        <td className="has-text-centered">{sub.units}</td>
                        <td className="has-text-centered">{labUnit}</td>
                        <td className="has-text-centered">{parseInt(sub.units)+ labUnit}</td>
                        <td>{getPrerequisites}</td>
                        <td className={"has-text-centered has-text-weight-bold "+ (getGrades > 3 ? "has-text-danger":"has-text-info")} >{getGrades !== 0 && getGrades}</td>
                        <td>{  this.viewButtonVisibity(getGrades) && this.checkPrerequisiteStatus(sub.internal_code)? <button className="button is-info is-small" onClick={() => this.viewScheduleButtonHandle(sub.subject_name, sub.internal_code, sub.descr_1)}>View Schedules</button>  : "" }</td>
                    </tr> 
                </Fragment>

            )
        }):"";
        var totalUnitsForSecondSem = 0;
        var loadSecondSem = subjects? subjects.filter(filt => filt.year_level == selectedTab 
            && filt.semester == 2 && filt.subject_type !== 'L').map((sub, index) => {
                let labUnit = hasSubjectLab(subjects, sub.subject_name);
               totalUnitsForSecondSem = labUnit + parseInt(sub.units)+ totalUnitsForSecondSem;
               var getGrades = getGrade(grades, sub.internal_code);
               
               var getPrerequisites = prerequisites ? prerequisites.filter(remark => remark.internal_code === sub.internal_code).map((rem, i) => {
                   countRemark++;
                    return (
                        <span key={i} className={"ml-1 tag"+ (getGrade(grades,rem.prerequisites) < 3 && getGrade(grades,rem.prerequisites) != 0 ? " is-success":" is-danger")}>{rem.subject_code}</span>
                    )
               }) :"";
            return(
                <Fragment key={index}>
                    <tr className = {getGrades > 3? "has-background-danger-light": ""}>
                        <td>{sub.subject_name}</td>
                        <td>{sub.descr_1}</td>
                        <td className="has-text-centered">{sub.units}</td>
                        <td className="has-text-centered">{labUnit}</td>
                        <td className="has-text-centered">{parseInt(sub.units)+ labUnit}</td>
                        <td>{getPrerequisites}</td>
                        <td className="has-text-centered has-text-weight-bold">{getGrades !== 0 && getGrades}</td>
                        <td>{ this.viewButtonVisibity(getGrades) && this.checkPrerequisiteStatus(sub.internal_code)? <button className="button is-info is-small" onClick={() => this.viewScheduleButtonHandle(sub.subject_name, sub.internal_code, sub.descr_1)}>View Schedules</button>  : "" }</td>
                    </tr> 
                </Fragment>

            )
        }):"";

    return (
        <Fragment>
            <article className="message mb-0 pb-0 is-small">
                <div className="message-header">
                    <p className="has-text-weight-bold">FIRST SEMESTER</p>   
                </div>
                <div className="message-body p-0">
                    <div className="table-container is-size-7">
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
                            <tfoot>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td colSpan="2" className="has-text-right has-text-weight-bold"> Total</td>
                                    <td className="has-text-centered has-text-weight-bold">{totalUnitsForFirstSem}</td>
                                    <td></td>
                                    <td colSpan="2" className="is-narrow">                                        
                                    </td>
                                </tr>
                            </tfoot>
                            <tbody>
                                { loadFirstSem ? loadFirstSem : (    
                                        <tr>
                                            <td></td><td></td><td></td>
                                            <td></td><td></td><td></td>
                                            <td></td>
                                        </tr>
                                    )
                                } 
                            </tbody>
                        </table>
                    </div>
                </div>
            </article>
            <article className="message mb-0 pb-0 is-small">
                <div className="message-header">
                    <p className="has-text-weight-bold">SECOND SEMESTER</p>   
                            
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
                            <tfoot>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td colSpan="2" className="has-text-right has-text-weight-bold"> Total</td>
                                    <td className="has-text-centered has-text-weight-bold ">{totalUnitsForSecondSem}</td>
                                    <td></td>
                                    <td colSpan="2" className="is-narrow">                                        
                                    </td>
                                </tr>
                            </tfoot>
                            <tbody>
                                { loadSecondSem ? loadSecondSem : (    
                                        <tr>
                                            <td></td><td></td><td></td>
                                            <td></td><td></td><td></td>
                                            <td></td>
                                        </tr>
                                    )
                                }                                                                                                 
                            </tbody>
                        </table>
                    </div>
                </div>
            </article>
        </Fragment>
    );
  }
}
