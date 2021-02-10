import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import StudentsList from '../enrollment/StudentsList';
import EnrollmentTabs from '../elements/EnrollmentTabs';
import SearchStudentPanel from '../elements/SearchStudentPanel';
import ApprovalPanel from '../elements/ApprovalPanel';
import StudentInformation from '../enrollment/StudentInformation';
import StudentInfoWithGrades from '../enrollment/StudentInfoWithGrades';
import SpinnerGif from '../../assets/sysimg/spinner.gif'
import { getLoggedUserDetails } from '../../helpers/helper';
import { updateStudentStatus, getStudentList, getOpenSections, getOldStudentInfo, getStudentInfo, getStatusCount, getGradesEvaluation, getCourses } from '../../helpers/apiCalls';

class DeanRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            enrollStatus: 1, totalPending: 0, page: 1, limit: 20, totalApproved: 0, totalDisapproved: 0,
            studentInfo: null, studentList: null, studentGrades: null, sections: null,
            name: '', course: '', course_department: '', date: '', id_number: '', session: '', 
            allowed_units: 0, year_level: '', classification: '', totalRecords: 0, section: '', stud_id: '',
            disapproveMsg: '', courses: null,  filterYearLevel: 0,
            selectedStudentID: '', selectedStudentCourseCode: '', selectedStudentClassification: '', selectedTab: 'pending',
            showPreloader: false
        };
    }
    componentDidMount = () => {
        this.setState({
            course_department: getLoggedUserDetails("courseabbr")    
        }, () => {
            getCourses({ department_abbr: this.state.course_department})
            .then(response => {
                this.setState({ 
                    courses: response.data.colleges.length > 0 ? response.data.colleges : null
                }, () => this.getFilteredStudentList());
            }); 
        });
    }
    handleOnClickTab = (tab, value) => {
        this.setState({
            enrollStatus: value,
            selectedStudentID: '',
            selectedTab: tab
        }, () =>  this.getFilteredStudentList() );              
    }
    handleOnchangeInput = (key, value) => {
        this.setState({
            [key] : value    
        }, () => {
            if(key === "year_level" || key === "session") this.getFilteredSections();
            if(key === "course" || key === "filterYearLevel") this.getFilteredStudentList();  
        });
    }
    handleOnSearchEvent = () => {
        this.getFilteredStudentList();  
    }
    handleClickUser = (idNum, classification, courseCode) => {
        this.setState({
            selectedStudentID: idNum,
            selectedStudentClassification: classification, 
            selectedStudentCourseCode: courseCode,
            section: ''
        }, () => this.getStudentInfoData() );
    }
    handleApprovalButton = e => {   
        this.togglePreloader(true); 
        if(e === "approved") {
            if(this.state.allowed_units === 0) {
                alert("Please enter the max allowed number of units.");
                this.togglePreloader(false);
            }
            else { 
                let yearLevel = this.state.year_level;   
                yearLevel = yearLevel.length > 2  ? yearLevel.substring(0, 2) : yearLevel;  
                const data = {
                    status: 3,
                    name_of_approver: getLoggedUserDetails("fullname"), 
                    section: this.state.section ? this.state.section : "",
                    allowed_units: this.state.allowed_units,
                    course_code: this.state.selectedStudentCourseCode,
                    message: this.state.course_department === "SHS" ? this.state.disapproveMsg : "",
                    mdn: this.state.session,
                    classification: this.state.classification,
                    year_level: yearLevel   
                };
                if(this.state.section === "") {
                    const confirmMsg = "Are you sure you dont want to assign section? Click Ok to proceed, Cancel to assign section";
                    if(window.confirm(confirmMsg)) {                
                        updateStudentStatus(this.state.selectedStudentID, data)
                        .then(response => {            
                            if(response.data.success) {
                                alert("Student Successfully Approved!");
                                this.setState({
                                    selectedStudentID: "",
                                    disapproveMsg: "",
                                    showPreloader: false
                                }, () => this.getFilteredStudentList() ); 
                            }
                            else {
                                alert("Approval Failed. Please try again, if issues persist please contact EDP Office."); 
                                this.togglePreloader(false);
                            }
                        })                    
                    }
                    else this.togglePreloader(false);
                }
                else {
                    updateStudentStatus(this.state.selectedStudentID, data)
                    .then(response => {            
                        if(response.data.success) {
                            alert("Student Successfully Approved!");
                            this.setState({
                                selectedStudentID: "",
                                disapproveMsg: "",
                                showPreloader: false
                            }, () => this.getFilteredStudentList() ); 
                        }
                        else { 
                            if(response.data.edp_code) {                            
                                alert("These EDP Codes under section " + this.state.section + " has just been filled up. Please select another open section. Full EDP Codes: " + response.data.edp_code.join())
                                this.getStudentInfoData();
                            }
                            else  alert("Approval Failed. Please try again, if issues persist please contact EDP Office."); 
                            this.togglePreloader(false);
                        }
                    })
                }
            }
        }
        else if(e === "disapproved") {
            const data = {
                status: 4,
                name_of_approver: getLoggedUserDetails("fullname"),
                message: this.state.disapproveMsg      
            };
            updateStudentStatus(this.state.selectedStudentID, data)
            .then(response => {            
                if(response.data.success) {
                    alert("Student's Application has been Disapproved!");
                    this.setState({
                        selectedStudentID: "",
                        disapproveMsg: "",
                        showPreloader: false
                    }, () => this.getFilteredStudentList() ); 
                }
                else {
                    alert("We encountered a loss of connectivity during Student Approval. Please try again."); 
                    this.togglePreloader(false);
                }
            })
        }
    }
    getFilteredStudentList = () => { 
        const data = {
            status: this.state.enrollStatus,  
            page: this.state.page,
            limit: this.state.limit,
            name: this.state.name,
            course: this.state.course,
            course_department: this.state.course_department,
            date: this.state.date,
            id_number: this.state.id_number,
            year_level: this.state.filterYearLevel,
            //classification: this.state.searchFilterClassification
        };
        getStudentList(data)
        .then(response => {
            this.setState({
                studentList: response.data.count > 0 ? response.data.students : null,
                totalRecords: response.data.count,
                selectedStudentID: ''
            }, () => {
                getStatusCount(this.state.course_department)
                .then(response => {            
                    this.setState({
                        totalPending: response.data.approved_registration_registrar,
                        totalApproved: response.data.approved_registration_dean,
                        totalDisapproved: response.data.disapproved_registration_dean
                    });
                }); 
            });
        });
    }
    getStudentInfoData = () => { 
        if(["OLD STUDENT", "RETURNEE", "SHIFTEE"].includes(this.state.selectedStudentClassification)) {        
            getOldStudentInfo(this.state.selectedStudentID, 0) 
            .then(response => {
                this.setState({
                    studentInfo: response.data,
                    allowed_units: response.data.allowed_units, 
                    year_level: response.data.year_level, 
                    classification: response.data.classification,
                    stud_id: response.data.stud_id,
                    session: response.data.mdn ? response.data.mdn : ""
                }, () => {
                    this.getFilteredSections();
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
                    allowed_units: response.data.allowed_units, 
                    year_level: response.data.year_level, 
                    classification: response.data.classification,
                    stud_id: response.data.stud_id,
                    session: response.data.mdn ? response.data.mdn : ""
                }, () => this.getFilteredSections());
            }); 
        }
    }
    getFilteredSections = () => {
        const { studentInfo, year_level, selectedStudentCourseCode, session } = this.state;
        const campusSHS = process.env.REACT_APP_CAMPUS === "Banilad" ? "2" : "1";
        const mdnSHS = session && session === "AM" ? 8 : 9;
        const yearLevel = studentInfo.college.toUpperCase() === "SENIOR HIGH" ? year_level + campusSHS + mdnSHS : year_level 
        const data = {
            year_level: yearLevel,
            course_code: selectedStudentCourseCode,    
        };       
        getOpenSections(data)
        .then(response => { 
            if(response.data && response.data.sections) {
                let retSections = response.data.sections;
                this.setState({
                    sections: retSections,
                });
            }            
        });
    }
    handleOnChangePage = e => {
        this.setState({
            page: e,
        }, () => this.getFilteredStudentList());
    }
    handleChangeRowsPerPage = e => {
        this.setState({
            limit: e,
        }, () => this.getFilteredStudentList());
    }
    togglePreloader = e => {
        this.setState({
            showPreloader: e
        })
    }
    render() {
        const { 
            studentList, page, limit, name, course, date, id_number, studentGrades, stud_id, disapproveMsg, sections, section,
            totalPending, totalApproved, totalDisapproved, course_department, session, courses, filterYearLevel, showPreloader,
            studentInfo, allowed_units, year_level, classification, totalRecords, selectedStudentID, selectedStudentClassification, selectedTab
        } = this.state;
        const editables = { allowed_units, year_level, classification, stud_id, section, session };
        const searcheables = { name, course, date, id_number, filterYearLevel };
        const approver = getLoggedUserDetails("usertype");
        let loadStudentInfo = "";
        if(["OLD STUDENT", "RETURNEE", "SHIFTEE"].includes(selectedStudentClassification)) {
            loadStudentInfo = ( 
                <StudentInfoWithGrades 
                    studentInfo={studentInfo} 
                    studentGrades={studentGrades}
                    editables={editables} 
                    viewer={approver}
                    selectedTab={selectedTab}
                    handleOnchangeInput={this.handleOnchangeInput}  
                />
            );
        } else {
            loadStudentInfo = (
                <StudentInformation 
                    studentInfo={studentInfo} 
                    editables={editables} 
                    viewer={approver}
                    selectedTab={selectedTab}
                    handleOnchangeInput={this.handleOnchangeInput} 
                />
            );
        }
        const loadApprovalPanel = (
            <ApprovalPanel
                studentID={selectedStudentID}
                approver={approver}
                sections={sections}
                sectionValue={section}
                currentTab={selectedTab}
                courseDepartment = {course_department}
                title=""
                step="DeanRegistration"
                handleApprovalButton={this.handleApprovalButton}
                handleOnchangeInput={this.handleOnchangeInput}
                disapproveMsg={disapproveMsg}
                disableApproveBtn={false} 
            />
        );
        return (
                <div className="box ml-1">
                    <EnrollmentTabs 
                        pending={1}
                        approved={3}
                        disapproved={4}
                        requests={"none"}
                        totalPending={totalPending}
                        totalApproved={totalApproved} 
                        totalDisapproved={totalDisapproved}
                        handleOnClickTab={this.handleOnClickTab}
                        viewer={approver}
                    />
                    <div className="">
                        <div className="divider is-size-6 mt-0 pt-0"></div>
                    </div>
                    <div className="columns">
                        <div className="column is-5 mt-0 mb-0 pt-0 pb-0">
                            <SearchStudentPanel
                                searcheables={searcheables}
                                handleOnchangeInput={this.handleOnchangeInput}
                                handleOnSearchEvent={this.handleOnSearchEvent}
                                searcher={approver}
                                courses={courses ? courses : null}
                                deptabbr={course_department ? course_department : ""}
                            />   
                        </div>
                        {
                            showPreloader ? (
                                <div className="column is-center">
                                    <figure className="image is-64x64">
                                        <img src={SpinnerGif} alt="" />
                                    </figure>
                                </div>
                            ) : (
                                <div className="column mt-0 mb-0 pt-0 pb-0">
                                    {studentInfo && selectedStudentID ? loadApprovalPanel : ""}                            
                                </div>
                            )
                        }
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

export default withRouter(DeanRegistration)