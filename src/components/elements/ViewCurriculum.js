import React, { Component, Fragment } from 'react';
import {getSubjectInfo} from '../../helpers/apiCalls';
import {hasSubjectLab} from '../../helpers/helper';
import SubjectInfo from '../elements/SubjectInfo'

export default class componentName extends Component {

    state = {
        subjects: null, year: null, semester: null, requisites: null, settings: false,selectedSubject: null,course_code: null
    }
    handleSettingsButton = () => {
        const {settings} = this.state;

        this.setState({
            settings: !settings,
            selectedSubject: null
        });
    }
    inputChange = input => e => {
		
        this.setState({
            [input]: e.target.value
        });
    }
    handleBackButton = () =>{
        const {settings} = this.state;
        this.setState({
            settings: !settings
        });
    }

    handleGetSubjectInfo = (course_code) =>{
		this.props.handleViewSubjectButton();
        this.setState({
            course_code: course_code
        });
        const data ={
            curr_year: this.props.schoolYear,
            course_code, course_code
        }
        if(this.props.schoolYear != null)
        {
            getSubjectInfo(data)
            .then(response => {  
                if(response.data) {          
                    this.setState({
                        subjects: response.data.subjects,
                        requisites: response.data.requisites
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
    handleDeSelectButton = () => {
        this.setState({
            selectedSubject: null
        });
    }
    handleSelectButton = (internal_code) => {
        this.setState({
            selectedSubject: internal_code
        });
    }
  render() {
      const {schoolYear, curriculumYear,courses,departments,inputChange,
        viewSubject,handleBackButton} = this.props;
    const{year,subjects,semester,requisites,settings, selectedSubject, course_code} = this.state;
    
    const yearLevel = ['', 'First', 'Second', 'Third', 'Fourth', 'Fifth'];
    const sem  = ['', 'First', 'Second'];

    var loadSemester = semester ? semester.map((semester, index)=>{
        return (
            <Fragment>
                <div className="message-header">
                    <p className="has-text-weight-bold">{sem[semester]} Semester</p>    
                </div>
                
            </Fragment>
        )
    }):"";
    var loadHeader = year? year.map((year, index)=>{
        var loadSemester = semester ? semester.map((semester, index)=>{
            var totalUnits = 0;
            var loadSubjects = subjects? subjects.filter(fil => fil.year_level == year && fil.semester == semester && fil.subject_type != 'L').map((sub, i)=>{
                let labUnit = hasSubjectLab(subjects, sub.internal_code);
                totalUnits = labUnit + parseInt(sub.units)+ totalUnits;
                var getPrerequisites = requisites ? requisites.filter(remark => remark.internal_code === sub.internal_code).map((rem, i) => {
                    return ( 
                        <span key={i} className="ml-1 tag">{rem.subject_code}</span>
                    )
               }) :"";
                return (
                    <Fragment>
                        <tr key={i}>
                            <td>{sub.subject_name}</td>
                            <td>{sub.descr_1}</td>
                            <td className="has-text-centered">{sub.units}</td>
                            <td className="has-text-centered">{labUnit}</td>
                            <td className="has-text-centered">{labUnit + parseInt(sub.units)}</td>
                            <td className="has-text-centered">{getPrerequisites}</td>
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
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td colSpan="2" className="has-text-right has-text-weight-bold"> Total</td>
                                        <td className="has-text-centered has-text-weight-bold ">{totalUnits}</td>                                  
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
    
    var loadCurriculumYear = curriculumYear ? curriculumYear.map((year, index)=>{
        return (
            <Fragment key={index}>
                <option value={year.year}>{year.year} - {parseInt(year.year) + 1}</option>
            </Fragment>
        )
    }) :"";

    var loadDepartments = departments ? departments.map((course, index)=>{
        return (
            <Fragment key={index}>
                <option value={course.course_department_abbr}>{course.course_department_abbr}</option>
            </Fragment>
        )
    }):"";
    var countCourse = 0;
    var loadCourseTable = courses ? courses.map((course, index)=>{
        countCourse++;
        return(
            <Fragment>
                <tr key={index}>
                    <td>{course.course_abbr}</td>
                    <td>{course.course_description}</td>
                    <td>{course.course_department}</td>
                    <td>{course.course_department_abbr}</td>
                    <td><button className="is-small button is-info" onClick={() => this.handleGetSubjectInfo(course.course_code)}>View Subjects</button></td>
                </tr>
            </Fragment>
        )
    }):"";

    var loadViewCurriculum = !viewSubject? (
        <Fragment>
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>Course</th>
                        <th>Course Name</th>
                        <th>Department Name</th>
                        <th>Department</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {countCourse > 0 ? loadCourseTable: (
                        <tr>
                            <td colSpan="5" className="has-text-centered">No data found!</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </Fragment>
    ):settings?"":loadHeader;
    return (
        <Fragment>
            {!settings &&
                <div>
                    
                    <div className="columns">
                        <div className="column is-one-fifth">
                            <h5 className="has-text-weight-bold mb-2 is-size-7">Filter by Year</h5>                        
                            <div className="field">
                                <div className="control has-icons-left">
                                    <span className="select is-fullwidth is-small">
                                        <select name="searchFilterCollege" onChange={inputChange('schoolYear')}>
                                            <option value={schoolYear}>Select School Year</option>
                                            {loadCurriculumYear}
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
                                        <select name="searchFilterCollege"  onChange={inputChange('selectedDepartment')}>
                                            <option value="">Select Department</option>
                                            {loadDepartments}
                                        </select>
                                    </span>
                                    <span className="icon is-small is-left">
                                        
                                    </span>
                                </div>
                            </div> 
                        </div>
                        {viewSubject &&
                            <div className="column is-one-fifth">                    
                                <div className="field">
                                    <div className="control has-icons-left mt-5">
                                        <button className="button is-danger is-small" onClick={handleBackButton}>Back</button>
                                        <button className="button is-info is-small ml-1" onClick={this.handleSettingsButton}>Settings</button>
                                    </div>
                                </div> 
                            </div>
                        }
                    </div>
                    <hr></hr>
                </div>
            }
            {settings &&
                <SubjectInfo
                    subject = {subjects}
                    selectedSubject = {selectedSubject}
                    requisites = {requisites}
                    handleBackButton = {this.handleBackButton}
                    inputChange = {this.inputChange}
                    schoolYear = {this.props.schoolYear}
                    course_code = {course_code}
                    handleDeSelectButton = {this.handleDeSelectButton}
                    handleSelectButton = {this.handleSelectButton}
                />
            }
            <div className="columns">
                <div className="column is-fullwidth is-small">
                    <div className="table-container is-size-7">
                        {loadViewCurriculum}
                    </div>
                </div>
            </div>
        </Fragment>
    );
  }
}
