import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { getLoggedUserDetails } from '../../helpers/helper';
import { getGradesEvaluation, getCourses, getColleges, getStudentList, getStudentStatus, getOldStudentInfo, getStudentInfo } from '../../helpers/apiCalls';

import StudentInfoView from '../../components/enrollment/StudentInfoView';
import StudentInfoViewGrades from '../../components/enrollment/StudentInfoViewGrades';
import StudentsList from '../../components/enrollment/StudentsList';
import SearchStudentPanelFull from '../../components/elements/SearchStudentPanelFull';

class StaffView extends Component {
    state = {
        studentList: null, studentGrades: null, userType: '', selectedStudentID: '', selectedStudentClassification: '',
        page: 1, limit: 20, totalRecords: 0, colleges: null, courses: null, 
        searchFilterCollege: '', searchFilterCourse: '', searchFilterClassification: '', searchFilterYear: 0, searchIDNumber: '', searchName: '', searchDate: ''
    }
    componentDidMount = () => {
        this.setState({
            searchFilterCollege: ["ACCOUNTING", "CASHIER", "LINKAGE", "EDP"].includes(getLoggedUserDetails("courseabbr")) ? "" : getLoggedUserDetails("courseabbr"),    
            userType: getLoggedUserDetails("usertype")
        }, () => { 
            if(["DEAN", "CHAIRPERSON", "COOR", "ACAD"].includes(this.state.userType)) {
                let data = { department_abbr: this.state.searchFilterCollege }
                if(["ACAD"].includes(this.state.userType) && this.state.searchFilterCollege !== "SHS") data = { department: "CL" }
                getCourses(data)
                .then(response => {
                    this.setState({ 
                        courses: response.data.colleges.length > 0 ? response.data.colleges : null
                    });
                });
            }
            else {
                getColleges()
                .then(response => {
                    this.setState({ 
                        colleges: response.data.departments 
                    });      
                });
            }
            
        });
        
    }
    handleOnSearchEvent = () => {
        this.filterStudentsList();
    }
    handleOnchangeInput = (key, value) => {
        if(key === "searchFilterCollege") {
            const { searchFilterCourse } = this.state;           
            this.setState({
                searchFilterCollege: value,
                searchFilterCourse: value ? searchFilterCourse : ""
            }, () => {
                this.filterStudentsList();
                if(value) {
                    let data = { department_abbr: this.state.searchFilterCollege }
                    if(["ACAD"].includes(this.state.userType) && this.state.searchFilterCollege !== "SHS") data = { department: "CL" }
                    getCourses(data)
                    .then(response => {
                        this.setState({ 
                            courses: response.data.colleges.length > 0 ? response.data.colleges : null
                        });
                    });
                }
                else {
                    this.setState({ 
                        courses: null
                    });
                }
            });
        }
        else if(key === "filterEnrollStep") {
            this.setState({
                filterEnrollStep: value,
                pageNum: 1,
            }, () => this.filterStudentsList());
        }
        else if(key === "searchFilterCourse") {
            this.setState({
                searchFilterCourse: value,
                pageNum: 1,
            }, () => this.filterStudentsList());
        }
        else if(key === "searchFilterClassification") {
            this.setState({
                searchFilterClassification: value,
                pageNum: 1,
            }, () => this.filterStudentsList());
        }
        else if(key === "searchFilterYear") {
            this.setState({
                searchFilterYear: value,
                pageNum: 1,
            }, () => this.filterStudentsList());
        }
        else {
            this.setState({
                [key]: value
            });
        }
    } 
    handleClickUser = (idNum, classification, courseCode) => {
        console.log(classification)
        this.setState({
            selectedStudentID: idNum,
            selectedStudentClassification: classification, 
            selectedStudentCourseCode: courseCode
        }, () => {           
            getStudentStatus(this.state.selectedStudentID)
            .then(response => {
                this.setState({
                    studentEnrollmentStatus: response.data.status, 
                });
            });
            if(["OLD STUDENT", "RETURNEE", "SHIFTEE"].includes(this.state.selectedStudentClassification)) {        
                getOldStudentInfo(this.state.selectedStudentID, 0) 
                .then(response => {
                    this.setState({
                        studentInfo: response.data,
                        selectedStudentClassification: response.data.classification,
                    }, () => {
                        getGradesEvaluation(this.state.selectedStudentID)
                        .then(response => {
                            this.setState({
                                studentGrades: response.data && response.data.studentGrades.length > 0 ? response.data.studentGrades : null
                            });                             
                        });
                    });  
                });
                 
            }
            else {            
                getStudentInfo(this.state.selectedStudentID, 0) 
                .then(response => {            
                    this.setState({
                        studentInfo: response.data,
                        selectedStudentClassification: response.data.classification,
                    }, () => {
                        getGradesEvaluation(this.state.selectedStudentID)
                        .then(response => {
                            this.setState({
                                studentGrades: response.data && response.data.studentGrades.length > 0 ? response.data.studentGrades : null
                            });                             
                        });
                    }); 
                }); 
            }
        });
    }
    filterStudentsList = () => { 
        const data = {
            status: 99,  
            page: this.state.page,
            limit: this.state.limit,
            name: this.state.searchName,
            course: this.state.searchFilterCourse,
            course_department: this.state.searchFilterCollege,
            date: this.state.searchDate,
            id_number: this.state.searchIDNumber,
            year_level: this.state.searchFilterYear,
            classification: this.state.searchFilterClassification
        };
        getStudentList(data)
        .then(response => {
            this.setState({
                studentList: response.data.students,
                totalRecords: response.data.count,
                selectedStudentID: ''
            });
        });
    }
    handleOnChangePage = e => {
        this.setState({
            page: e
        }, () => this.filterStudentsList());
    }
    handleChangeRowsPerPage = e => {
        this.setState({
            limit: e
        }, () => this.filterStudentsList());
    }
    render() {
        const { 
            studentList, page, limit, searchName, searchFilterCourse, searchDate, searchIDNumber, searchFilterCollege,
            courses, colleges, studentGrades, userType, selectedStudentClassification,
            studentInfo, searchFilterYear, searchFilterClassification, totalRecords, selectedStudentID, selectedTab
        } = this.state;
        const searcheables = { searchFilterCollege, searchFilterCourse, searchFilterClassification, searchFilterYear, searchIDNumber, searchName, searchDate };    
        let loadStudentInfo = ( 
                <StudentInfoViewGrades 
                    studentInfo={studentInfo} 
                    studentGrades={studentGrades}
                />
        );
        return (
                <div className="box ml-1">
                    <div className="columns">
                        <div className="column mt-1 mb-1">
                            <SearchStudentPanelFull
                                searcheables={searcheables}
                                searcher={userType}
                                colleges={colleges}
                                courses={courses}
                                educLevel={searchFilterCollege === "SHS" ? "shs" : "col"}
                                module="eGrade"
                                handleOnSearchEvent={this.handleOnSearchEvent}
                                handleOnchangeInput={this.handleOnchangeInput}
                            /> 
                        </div>                        
                    </div>
                    <div className="columns">
                        <div className="column is-5 mt-0 mb-0 pt-0 pb-0">
                            {studentList ? (
                                <StudentsList
                                    studentList={studentList}
                                    selectedStudentID={selectedStudentID}
                                    currentTab={selectedTab}
                                    totalRowsCount={totalRecords}
                                    rowsPerPage={limit}
                                    pageNum={page}
                                    step=""
                                    handleOnchangeInput={this.handleOnchangeInput}
                                    handleClickUser={this.handleClickUser}
                                    handleOnChangePage={this.handleOnChangePage}
                                    handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                                />  
                                ) : ""
                            }
                        </div>
                        <div className="column mt-0 mb-0 pt-0 pb-0">

                            {studentInfo && selectedStudentID ? loadStudentInfo : ""}
                            
                        </div>
                    </div> 
                </div>       
        );
    }
}

export default withRouter(StaffView)