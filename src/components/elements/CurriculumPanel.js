import React, { Component,Fragment } from 'react';
import { Table, Button, Popconfirm, Row, Col, Icon, Upload } from 'antd';
import { ExcelRenderer } from "react-excel-renderer";


export default class CurriculumPanel extends Component {

  render() {
    const{addStatus,addCourseStatus, inputChange, handAddCurriculumButton,departments,
         handleAddCourse,fileHandler,rows,handleAdd,schoolYear, curriculumYear,courses, subjects} = this.props;
    
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
                <option value={course.department}>{course.course_department_abbr}</option>
            </Fragment>
        )
    }):"";

    var handleAddButton = !addStatus ? (
        <button className="button is-info is-small" onClick={handAddCurriculumButton}>Add Curriculum</button>
    ) : (
        <Fragment>
            <div className="columns">
                <div className="column is-two-fifths">
                    <input name="searchBySubject" className="input is-small" onChange={inputChange('schoolYear')} type="text" placeholder="School Year" data-fieldname="Subject"/>
                </div>
                <div className="column">
                    <button className="ml-1 button is-danger is-small" onClick={handAddCurriculumButton}>Cancel</button>
                </div>
            </div>
        </Fragment>
        
    ); 

    var handleAddCourseCurriculum = !addCourseStatus ? (
        <Fragment>
            <div className="column is-one-fifth">
                <h5 className="has-text-weight-bold mb-2 is-size-7">Filter by Department</h5>                        
                <div className="field">
                    <div className="control has-icons-left">
                        <span className="select is-fullwidth is-small">
                            <select name="searchFilterCollege">
                                <option value="">Select Department</option>
                                {loadDepartments}
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
                                <option value="">Select Course</option>
                                {loadCourses}
                            </select>
                        </span>
                        <span className="icon is-small is-left">
                        
                        </span>
                    </div>
                </div>   
            </div> 
            <div className="column is-one-fifth">                       
                <div className="field mt-5">
                    <div className="control has-icons-left">
                        <span className="is-fullwidth is-small">
                            <button className="button is-small is-info" onClick={handleAddCourse}>Add</button>
                        </span>
                    </div>
                </div>   
            </div> 
        </Fragment>
    ):(
        <Fragment>
            <div className="column is-one-fifth">
                <h5 className="has-text-weight-bold mb-2 is-size-7">Select Course</h5>                        
                <div className="field">
                    <div className="control has-icons-left">
                        <span className="select is-fullwidth is-small">
                            <select name="searchFilterCollege">
                                <option value="">Select Course</option>
                                <option value="SHS">Senior High</option>
                                <option value="JHS">Junior High</option>
                                <option value="BED">Elementary</option>
                            </select>
                        </span>
                        <span className="icon is-small is-left">
                        
                        </span>
                    </div>
                </div> 
            </div> 
            <div className="column is-one-fifth">                  
                <div className="field mt-5">
                    <div className="control has-icons-left">
                        <span className="is-fullwidth is-small">
                            <button className="button is-small is-danger" onClick={handleAddCourse}>Cancel</button>
                        </span>
                        <span className="icon is-small is-left">
                        
                        </span>
                    </div>
                </div> 
            </div> 
        </Fragment>
    ); 
    return (
      <Fragment>
          <div className="columns">
                <div className="column is-one-fifth">
                    <h5 className="has-text-weight-bold mb-2 is-size-7">Filter by School Year</h5>                        
                    <div className="field">
                        <div className="control has-icons-left">
                            <span className="select is-fullwidth is-small">
                                <select name="searchFilterCollege" onChange={inputChange('schoolYear')}>
                                    <option value="">Select Year</option>
                                    {loadCurriculumYear}
                                </select>
                            </span>
                            <span className="icon is-small is-left">
                            
                            </span>
                        </div>
                        
                    </div>   
                </div> 
                <div className="column is-two-fifths">                    
                    <div className="field mt-5">
                        <div className="control">
                            <span className="is-fullwidth is-small">
                                {handleAddButton}
                            </span>
                        </div>
                    </div>  
                </div>
            </div>
            
            <hr></hr>
            
            <div className="columns">
                <div className="column">
                    <h2 className="has-text-weight-bold mb-2 is-size-4">School Year: {schoolYear} - {parseInt(schoolYear) + 1}</h2>
                </div>
            </div>
                
            

            <div className="columns mt-2">
                {handleAddCourseCurriculum}
            </div>
            {
                addCourseStatus &&
                <div className="columns">
                    <div className="column is-one-fifth">
                        <Upload
                            class="is-fullwidth"
                            name="file"
                            beforeUpload={fileHandler}
                            onRemove={() => this.setState({ rows: [] })}
                            multiple={false}>

                            <Button className="button is-small is-fullwidth">
                                <Icon type="upload" /> Click to Upload Excel File
                            </Button>
                        </Upload>
                    </div>
                </div>
            }
      </Fragment>
    );
  }
}
