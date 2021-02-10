import React, { Component } from 'react';
import SelectCollege from '../../../elements/SelectCollege';
import SelectCourse from '../../../elements/SelectCourse';
import axios from 'axios';

export default class CourseMenuTertiary extends Component {   
    state = {
        courses: null, isCollegeSelected: false, yearLimit: 0
    }
    componentDidMount = () => {
        const college = (this.props.values.selectedCollege) ? this.props.values.selectedCollege : "";
        this.getCourses(college);
    }
    handleOnChangeInput = e => {   
        if(e.target.name === "selectedCollege") {
            //const optionText =  e.target.options[e.target.selectedIndex].text;   
            //this.props.handleOnChangeInput(e.target.name, optionText);
            //this.props.handleOnChangeInput(e.target.name + "Code", e.target.value);
            //this.props.handleOnChangeInput("selectedCourse", "");            
            this.getCourses(e.target.value);
        }  
        if(e.target.name === "selectedCourseCode") {
            this.getYearLimit(e.target.value);
        }
    
        this.props.handleOnChangeInput(e);
    }
    toggleIsCollegeSelected = () => {
        const {isCollegeSelected} = this.state;
        this.setState({ isCollegeSelected : !isCollegeSelected });
    }
    getCourses = college => {
        if(college) {
            this.toggleIsCollegeSelected();
            const data = { department_abbr: college, course_department: "", department: "" };
            const headers = { 
                'Access-Control-Allow-Origin': '*',
            };
            axios.post(process.env.REACT_APP_API_UC_GET_OPEN_ENROLL_COURSES, data, {headers})
            .then(response => {
                this.setState({  
                    courses: response.data.colleges,
                }, () => this.getYearLimit(null));
                this.toggleIsCollegeSelected();
            }).catch(error => {
                console.log(error);
            });
        }
        else {
            this.setState({  
                courses: '',
                yearLimit: 0
            });
        }
    }
    getYearLimit = (e) => {
        const {courses} = this.state;
        const {values} = this.props;
        const selectedCourse = e ? e : values.selectedCourseCode;
        if(selectedCourse && courses) {
            const filteredCourse = courses.filter(course => course.college_code === selectedCourse);
            this.setState({
                yearLimit: filteredCourse.length > 0 ? filteredCourse[0].year_limit : 0
            });
        }
    }
    render() { 
        const { values, isOldStudent } = this.props; 
        const { courses,  isCollegeSelected, yearLimit } = this.state;
        const yearLevelOptions = yearLimit > 0 ? [...Array(yearLimit).keys()].map((year, i) => (
            <option key={i+1} value={year+1}>{year+1}</option>
        )) : ""; 
        return(
            <div className="" style={{ /*width: "94%"*/ }}>
                <div className="columns is-vcentered">                                            
                    <div className="column"> 
                        <h3 className="has-text-weight-bold mb-2">Open Colleges</h3>
                        <div className="field">
                            <SelectCollege 
                                name="selectedCollege"
                                value={values.selectedCollege}
                                educLevel={values.educLevel}
                                required={true}
                                fieldname="College"
                                handleOnChangeInput={this.handleOnChangeInput}
                            />
                        </div>                                                                                                                                                                                                                        
                    </div>  
                    <div className="column"> 
                        <h3 className="has-text-weight-bold mb-2">Courses Offered</h3>
                        <div className="field">
                            <SelectCourse
                                name="selectedCourseCode"
                                courses={courses}
                                value={values.selectedCourseCode}
                                required={true}
                                fieldname="Course"
                                handleOnChangeInput={this.handleOnChangeInput}   
                                isCollegeSelected={isCollegeSelected}                  
                            />       
                        </div>                                                                                                                                                                                                                        
                    </div> 
                    <div className="column"> 
                        <h3 className="has-text-weight-bold mb-3 pt-0">Your Entry Status</h3>
                        <div className="field">
                            <div className="control is-expanded has-icons-left">
                                <span className="select is-fullwidth">
                                    <select name="selectedEntryStatusCollege" value={values.selectedEntryStatusCollege} 
                                            onChange={this.handleOnChangeInput} required data-fieldname="Entry Status">
                                        <option value="">Select Status</option>
                                        {isOldStudent ? "" : <option value="H">New Student</option>}
                                        {isOldStudent ? <option value="O">Old Student</option> : ""}
                                        {isOldStudent ? <option value="R">Returnee</option> : ""}
                                        {isOldStudent ? "" : <option value="T">Transferee</option>}
                                        {isOldStudent ? "" : <option value="C">Cross Enrolee</option>}
                                        {isOldStudent ? <option value="S">Shiftee</option> : ""}  
                                    </select>
                                </span>
                                <span className="icon is-small is-left">
                                    <i className="fas fa-chalkboard-teacher"></i>
                                </span>
                            </div>
                        </div>                                                                                                                                                                                                                                                           
                    </div>
                    <div className="column"> 
                        <h3 className="has-text-weight-bold mb-3 pt-0">Year Level</h3>
                        <div className="field">
                            <p className="control is-expanded has-icons-left">
                                <span className="select is-fullwidth">                            
                                    <select name="selectedYearLevelCollege" value={values.selectedYearLevelCollege} 
                                            onChange={this.handleOnChangeInput} required data-fieldname="Year Level">
                                        <option key={0} value="">Select Year</option>
                                        {yearLevelOptions}
                                    </select>
                                </span>
                                <span className="icon is-small is-left">
                                    <i className="fas fa-bars"></i>
                                </span>
                            </p>
                        </div>                                                                                                                                                                                                                                                           
                    </div>                                   
                </div>
            </div>
        );
    }

}