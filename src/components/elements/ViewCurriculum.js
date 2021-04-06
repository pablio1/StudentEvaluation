import React, { Component, Fragment } from 'react';

export default class componentName extends Component {
  render() {
      const {schoolYear, curriculumYear,courses,departments,inputChange,handleViewSubjectButton, viewSubject} = this.props;

      var loadCurriculumYear = curriculumYear ? curriculumYear.map((year, index)=>{
        return (
            <Fragment key={index}>
                <option value={year.year}>{year.year} - {parseInt(year.year) + 1}</option>
            </Fragment>
        )
    }) :"";

    var loadCourses = courses ? courses.map((course, index)=>{
        return (
            <Fragment key={index}>
                <option value={course.course_code}>{course.course_abbr}</option>
            </Fragment>
        )
    }):"";

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
                    <td><button className="is-small button is-info" onClick={() => handleViewSubjectButton(course.course_code)}>View Subjects</button></td>
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
    ):(
        <Fragment>
            <h1 className="is-size-4">First Year</h1>
            <article className="message mb-0 pb-0 is-small">
                <div className="message-header">
                    <p className="has-text-weight-bold">First SEMESTER</p>   
                            
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
                                    <th className="has-text-centered">Actions</th>
                                </tr>
                            </thead>
                            <tfoot>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td colSpan="2" className="has-text-right has-text-weight-bold"> Total</td>
                                    <td className="has-text-centered has-text-weight-bold ">0</td>
                                    <td colSpan="2" className="is-narrow">                                        
                                    </td>
                                </tr>
                            </tfoot>
                            <tbody>                                                                                               
                            </tbody>
                        </table>
                    </div>
                </div>
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
                                    <th className="has-text-centered">Actions</th>
                                </tr>
                            </thead>
                            <tfoot>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td colSpan="2" className="has-text-right has-text-weight-bold"> Total</td>
                                    <td className="has-text-centered has-text-weight-bold ">0</td>
                                    <td colSpan="2" className="is-narrow">                                        
                                    </td>
                                </tr>
                            </tfoot>
                            <tbody>                                                                                               
                            </tbody>
                        </table>
                    </div>
                </div>
            </article>
            
        </Fragment>
    );
    return (
        <Fragment>
            <div className="columns">
                <div className="column">
                    <h2 className="has-text-weight-bold mb-2 is-size-4">School Year: {schoolYear} - {parseInt(schoolYear) + 1}</h2>
                </div>
            </div>
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
                {/* <div className="column is-one-fifth">
                    <h5 className="has-text-weight-bold mb-2 is-size-7">Filter by Course</h5>                        
                    <div className="field">
                        <div className="control has-icons-left">
                            <span className="select is-fullwidth is-small">
                                <select name="searchFilterCollege" onChange={inputChange('selectedCourse')}>
                                    <option value="">Select Course</option>
                                    {loadCourses}
                                </select>
                            </span>
                            <span className="icon is-small is-left">
                            
                            </span>
                        </div>
                    </div> 
                </div> */}
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
            </div> 
            <hr></hr>
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
