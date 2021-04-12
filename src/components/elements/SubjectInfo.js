import React, { Component,Fragment } from 'react';
import {hasSubjectLab} from '../../helpers/helper';
import {getSubjectInfo,savePrerequisite,removePrerequisite} from '../../helpers/apiCalls';

export default class SubjectInfo extends Component {
    state = {subjects: null, prerequisites: null, year: null, semester:null, success: null}
    componentDidMount = () => {
       //console.log(this.props);
        this.handleLoadSubjectInfo();
    }
    handleLoadSubjectInfo = () =>{
        const {schoolYear, course_code} = this.props;
        //var loadSubjectInfo = subject.filter(filt => filt.internal_code == selectedSubject);
        console.log("test", this.props);
        var data = {
            curr_year: schoolYear,
            course_code, course_code
        }
        if(schoolYear != null)
        {
            getSubjectInfo(data)
            .then(response => {  
                if(response.data) {          
                    this.setState({
                        subjects: response.data.subjects,
                        prerequisites: response.data.prerequisites
                    });
                }
                const {subjects} = this.state;
                const year = [...new Set(subjects.map(item => item.year_level))]
                this.setState({
                    year: year
                });
                const semester = [...new Set(subjects.map(item => item.semester))]
                this.setState({
                    semester: semester
                });
            });
        }
    }
    handleAddPrerequisite = (internal_code) => {
        const{selectedSubject} = this.props;
        var data = {
            internal_code: selectedSubject,
            prerequisite: internal_code
        }
        savePrerequisite(data)
        .then(response => {
            if(response.data){
                this.setState({
                    success: response.data.success
                });
                this.handleLoadSubjectInfo();
            }
        });
    }
    handleDeSelectButton = () => {
        this.props.handleDeSelectButton();
    }
    handleSelectButton = (internal_code) => {
        this.props.handleSelectButton(internal_code);
    }
    handleRemovePrerequisite = (internal_code) => {
        const {selectedSubject} = this.props;
        var data = {
            internal_code: selectedSubject,
            prerequisite: internal_code
        }
        //console.log("Data",data);
        removePrerequisite(data)
        .then(response => {
            if(response.data){
                this.setState({
                    success: response.data.success
                })
                this.handleLoadSubjectInfo();
            }
        });
        
    }
  render() {
    const {subject,selectedSubject,handleBackButton, inputChange,schoolYear} = this.props;
    const {subjects, prerequisites,year,semester} = this.state;
    const yearLevel = ['', 'First', 'Second', 'Third', 'Fourth', 'Fifth'];
    const sem  = ['', 'First', 'Second'];
    var loadSubjectInfo = subject?subject.filter(filt => filt.internal_code == selectedSubject).map((sub, index)=>{
        return (
            <Fragment key={index}>
                <tr>
                    <th className="is-narrow">Department</th>
                    <td>College of Computer Studies</td>
                    <th>School Year</th>
                    <td colSpan="3" className="has-text-left">{schoolYear} - {parseInt(schoolYear) + 1}</td>
                </tr>
                <tr>
                    <th className="is-narrow">Course</th>
                    <td colSpan="">Bachelor of Science in Information Technology (BSIT)</td>
                    <th>Year</th>
                    <td>3</td>
                    <th className="is-narrow">Semester</th>
                    <td>1</td>
                </tr>
                <tr>
                    <th className="is-narrow">Subject</th>
                    <td>{sub.subject_name}</td>
                    <th colSpan="4" className="has-text-centered">Units</th>
                </tr>
                <tr>
                    <th>Description</th>
                    <td>{sub.descr_1}</td>
                    <th>Lecture</th>
                    <td>{sub.units}</td>
                    <th>Lab</th>
                    <td>{hasSubjectLab(subject, sub.interal_code)}</td>
                </tr>
            </Fragment>
        )
    }):"";
    var loadSelectSubject = subject?subject.filter(filt => filt.subject_type != 'C').map((subject,index)=>{
        return(
            <Fragment key={index}>
                <option value={subject.internal_code}>{subject.subject_name}</option>
            </Fragment>
        )
    }):"";
    var loadPrerequisites = prerequisites ? prerequisites.filter(filt => filt.internal_code == selectedSubject).map((pre, index)=>{
        var loadSubject = subject.filter(fil => fil.internal_code == pre.prerequisites).map((sub, i)=>{
            return(
                <Fragment>
                    <tr key={i}>
                        <td>{sub.subject_name}</td>
                        <td>{sub.units}</td>
                        <td>{hasSubjectLab(subject, sub.internal_code)}</td>
                        <td></td>
                        <td><button className="is-small is-danger button" onClick={() => this.handleRemovePrerequisite(sub.internal_code)}>Remove</button></td>
                    </tr>
                </Fragment>
            )
        })
        return loadSubject
    }):""; 

    var loadHeader = year? year.map((year, index)=>{
        var loadSemester = semester ? semester.map((semester, index)=>{
            var totalUnits = 0;
            var loadSubjects = subjects? subjects.filter(fil => fil.year_level == year && fil.semester == semester && fil.subject_type != 'L').map((sub, i)=>{
                let labUnit = hasSubjectLab(subjects, sub.internal_code);
                totalUnits = labUnit + parseInt(sub.units)+ totalUnits;
                var count = 0;
                var coloredPrerequisites = prerequisites.filter(f => f.internal_code == selectedSubject && f.prerequisites == sub.internal_code).map((color, a)=>{
                    count++;
                });
                var getPrerequisites = prerequisites ? prerequisites.filter(remark => remark.internal_code === sub.internal_code).map((rem, i) => {
                    return ( 
                        <span key={i} className="ml-1 tag">{rem.subject_code}</span>
                    )
               }) :"";
                return (
                    <Fragment>
                        <tr key={i} className={sub.internal_code == selectedSubject? "is-selected":(count > 0?"has-background-link-light":"")}>
                            <td>{sub.subject_name}</td>
                            <td>{sub.descr_1}</td>
                            <td className="has-text-centered">{sub.units}</td>
                            <td className="has-text-centered">{labUnit}</td>
                            <td className="has-text-centered">{labUnit + parseInt(sub.units)}</td>
                            <td className="has-text-centered">{getPrerequisites}</td>
                            <td className="has-text-centered">
                                {sub.internal_code == selectedSubject?(
                                    <button className="button is-small is-danger" onClick={this.handleDeSelectButton}>Deselect</button>
                                )
                                :( 
                                    selectedSubject?(
                                        count>0?(
                                            <button className="button is-small is-danger" onClick={() => this.handleRemovePrerequisite(sub.internal_code)}>Cancel</button>
                                        ):(
                                            
                                            <Fragment>
                                                <button className="button is-info is-small" onClick={() => this.handleAddPrerequisite(sub.internal_code)}>Pre</button>
                                                <button className="button is-primary is-small" >Co</button>
                                            </Fragment>
                                        )
                                    ):(
                                        <button className="button is-small is-info" onClick={() => this.handleSelectButton(sub.internal_code)}>Select</button>
                                    )
                                )}
                            </td>
                        </tr>
                    </Fragment>
                )
            }):"";
            return (
                <Fragment>
                    <div className="message-header">
                        <p className="has-text-weight-bold">{sem[semester]} Semester</p>    
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
                                        <th className="has-text-centered">Pre-requisites</th>
                                        <th className="has-text-centered">{selectedSubject ? "Add To": "Action"}</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td colSpan="2" className="has-text-right has-text-weight-bold"> Total</td>
                                        <td className="has-text-centered has-text-weight-bold ">{totalUnits}</td>                                  
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tfoot>
                                <tbody>   
                                    {loadSubjects}                                                                                            
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Fragment>
            )
        }):"";
        return(
            <Fragment>
                <h1 className="is-size-4">{yearLevel[year]} Year</h1>
                <article className="message mb-0 pb-0 is-small">
                    {loadSemester}
                </article>
            </Fragment>
        )
    }):""; 
    var loadSubjectList = subjects? subjects.filter(fil => fil.subject_type != "C" ).map((sub,index)=>{
        return (
            <Fragment>
                <tr key={index}>
                    <td>{sub.subject_name}</td>
                    <td>{sub.descr_1}</td>
                    <td>{sub.units}</td>
                    <td>{hasSubjectLab(subjects, sub.internal_code)}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </Fragment>
        )
    }):"";
    var loadSubjectInfoPanel = selectedSubject?(
        <Fragment>
            <div className="columns">
                <div className="column is-one-fifth">
                    <h5 className="has-text-weight-bold mb-2 is-size-7">Filter by Year</h5>                        
                    <div className="field">
                        <div className="control has-icons-left">
                            <span className="select is-fullwidth is-small">
                                <select name="searchFilterCollege">
                                    <option>Select School Year</option>
                                </select>
                            </span>
                            <span className="icon is-small is-left">
                            
                            </span>
                        </div>
                    </div> 
                </div>
                <div className="column is-one-fifth">
                    <h5 className="has-text-weight-bold mb-2 is-size-7">Filter by Department</h5>                        
                    <div className="field">
                        <div className="control has-icons-left">
                            <span className="select is-fullwidth is-small">
                                <select name="searchFilterCollege">
                                    <option>Select Department</option>
                                </select>
                            </span>
                            <span className="icon is-small is-left">
                            
                            </span>
                        </div>
                    </div> 
                </div>
                <div className="column is-one-fifth">
                    <h5 className="has-text-weight-bold mb-2 is-size-7">Filter by Course</h5>                        
                    <div className="field">
                        <div className="control has-icons-left">
                            <span className="select is-fullwidth is-small">
                                <select name="searchFilterCollege">
                                    <option>Select Course</option>
                                </select>
                            </span>
                            <span className="icon is-small is-left">
                            
                            </span>
                        </div>
                    </div> 
                </div>
                <div className="column is-one-fifth">
                    <h5 className="has-text-weight-bold mb-2 is-size-7">Search by Subject</h5>                        
                    <div className="field">
                        <div className="control">
                            <span className="is-fullwidth is-small">
                                <input type="text" className="input is-small"/>
                            </span>
                            <span className="icon is-small is-left">
                            
                            </span>
                        </div>
                    </div> 
                </div>
            </div>
        </Fragment>
    ):"";
    var loadSubjectInformation = selectedSubject?(
        <Fragment>
            <article className="message is-link m-0 pt-0">
                <div className="message-header pt-2 pb-2">
                    <p>Subject Information</p>                                                  
                </div>
                <div className="message-body p-0">
                    <div className="table-container mb-0">
                        <table className="table is-striped is-bordered is-hoverable is-fullwidth"> 
                            <tbody>
                                {loadSubjectInfo}
                            </tbody>
                        </table>
                    </div>
                </div>
            </article>
        </Fragment>
    ) :"";

    var loadRequisite = selectedSubject ? (
        <Fragment>
            <div className="columns">
                <div className="column is-small">
                    <div className="table-container is-size-7">
                        <div className="message-header">
                            <p className="has-text-weight-bold">Pre-requisite</p>    
                        </div>
                        <div className="message-body p-0">
                            <div className="table-container">
                                <table className="table is-striped is-fullwidth is-hoverable">
                                    <thead>
                                        <tr>
                                            <th className="is-narrow">Subject</th>
                                            <th className="has-text-centered">Lec</th>
                                            <th className="has-text-centered">Lab</th>
                                            <th className="has-text-centered">Total Units</th>
                                            <th className="has-text-centered">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>    
                                        {loadPrerequisites}                                                                                       
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
               <div className="column">
               <div className="table-container is-size-7">
                        <div className="message-header">
                            <p className="has-text-weight-bold">Co-requisite</p>    
                        </div>
                        <div className="message-body p-0">
                            <div className="table-container">
                                <table className="table is-striped is-fullwidth is-hoverable">
                                    <thead>
                                        <tr>
                                            <th className="is-narrow">Subject</th>
                                            <th className="has-text-centered">Lec</th>
                                            <th className="has-text-centered">Lab</th>
                                            <th className="has-text-centered">Total Units</th>
                                            <th className="has-text-centered">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody> 
                                                                                                                                  
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
               </div>
               <div className="column">
                    <div className="table-container is-size-7">
                        <div className="message-header">
                            <p className="has-text-weight-bold">Equivalence</p>    
                        </div>
                        <div className="message-body p-0">
                            <div className="table-container">
                                <table className="table is-striped is-fullwidth is-hoverable">
                                    <thead>
                                        <tr>
                                            <th className="is-narrow">Subject</th>
                                            <th className="has-text-centered">Description</th>
                                            <th className="has-text-centered">Course</th>
                                            <th className="has-text-centered">School Year</th>
                                            <th className="has-text-centered">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody> 
                                        <tr>
                                            <td>Math 1</td>
                                            <td>PAGBASA AT PAGSULAT TUNGO SA PANANALISIK</td>
                                            <td>BSIT</td>
                                            <td>2012</td>
                                            <td><button className="button is-small is-danger">Cancel</button></td>
                                        </tr>                                                                                   
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
               </div>
            </div>
            <hr></hr>
        </Fragment>
    ):""
    return (
      <Fragment>
          <div className="columns">
                <div className="column is-one-fifth">
                    <h5 className="has-text-weight-bold mb-2 is-size-7">Select Subject</h5>                        
                    <div className="field">
                        <div className="control has-icons-left">
                            <span className="select is-fullwidth is-small">
                                <select name="searchFilterCollege" onChange={inputChange('selectedSubject')}>
                                    <option value="">Select Subject</option>
                                    {loadSelectSubject}
                                </select>
                            </span>
                            <span className="icon is-small is-left">
                                
                            </span>
                        </div>
                    </div> 
                </div>
                
                <div className="column is-one-fifth">                    
                    <div className="field">
                        <div className="control has-icons-left mt-5">
                            <button className="button is-danger is-small" onClick={handleBackButton}>Back</button>
                        </div>
                    </div> 
                </div>
            </div>
            <hr></hr>
            <div className="columns">
                <div className="column is-fullwidth">
                    {loadSubjectInformation}
                </div>
            </div>
            {loadRequisite}
            {loadSubjectInfoPanel}
            <div className="columns">
                <div className="column is-fullwidth">
                    <div className="table-container is-size-7">
                        <div className="message">
                            <div className="message-header">
                                <p className="has-text-weight-bold">Bachelor of Science in Information Technology (BSIT)</p> 
                                <p className="has-text-weight-bold has-text-right">{schoolYear} - {parseInt(schoolYear) + 1}</p>   
                            </div>
                            <div className="message-body p-0 mt-3">
                                <div className="table-container">
                                    {loadHeader}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      </Fragment>
    );
  }
}
