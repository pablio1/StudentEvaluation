import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import StudentsList from '../../components/enrollment/StudentsList';
import EnrollmentTabs from '../../components/elements/EnrollmentTabs';
import SearchStudentPanel from '../../components/elements/SearchStudentPanel';
import StudentInfoView from '../../components/enrollment/StudentInfoView';
import StudentInfoViewGrades from '../enrollment/StudentInfoViewGrades';
import { getLoggedUserDetails, formatMoney } from '../../helpers/helper';
import { getStudentList, updateStudentStatus, getCourses, getStatusCount, getStudentInfo, getStudentStatus, getOldStudentInfo, getGradesEvaluation } from '../../helpers/apiCalls';
import SpinnerGif from '../../assets/sysimg/spinner.gif'

export default class PaymentSetAccounts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            enrollStatus: 6, totalPending: 0, page: 1, limit: 20, totalApproved: 0, 
            studentInfo: null, studentList: null, attachments: [],
            name: '', course: '', date: '', id_number: '', course_department: '',  
            needed_payment: 500, totalRecords: 0, stud_id: '',
            approvalStatus: null, courses: null, studentGrades: null,
            selectedStudentID: '', selectedTab: "pending", enteredAmount: '',
            showPreloader: false
        };
    }
    componentDidMount = () => {
        getCourses({ department_abbr: ""})
        .then(response => {
            this.setState({ 
                courses: response.data.colleges.length > 0 ? response.data.colleges : null
            }, () => this.getFilteredStudentList());
        });
    }
    handleOnClickTab = (tab, value) => {
        this.setState({
            enrollStatus: value,
            selectedStudentID: '',
            selectedTab: tab,
            enteredAmount: ''
        }, () =>  this.getFilteredStudentList() );        
    }
    handleOnchangeInput = (key, value) => {
        this.setState({
            [key] : value    
        }, () => {
            if(key === "course") this.getFilteredStudentList();  
        });
        
    }
    handleOnchangeAmount = e => {
        if(/^[0-9 _ -]*$/.test(e.target.value)) {
            this.setState({
                [e.target.name] : e.target.value    
            });
        }
    }
    handleOnSearchEvent = () => {
        this.getFilteredStudentList();  
    }
    handleClickUser = (idNum, classification, courseCode) => {
        this.setState({
            selectedStudentID: idNum,
            selectedStudentClassification: classification 
        }, () => {
            if(["OLD STUDENT", "RETURNEE", "SHIFTEE"].includes(this.state.selectedStudentClassification)) {   
                getOldStudentInfo(this.state.selectedStudentID, 0)
                .then(response => {            
                    this.setState({
                        studentInfo: response.data ? response.data : null,
                    }, () => {
                        getGradesEvaluation(this.state.selectedStudentID)
                        .then(response => {
                            this.setState({
                                studentGrades: response.data && response.data.studentGrades.length > 0 ? response.data.studentGrades : null
                            });                             
                        });

                        if(this.state.selectedTab === "approved") {
                            getStudentStatus(this.state.selectedStudentID)
                            .then(response => {    
                                if(response.data && response.data.needed_payment) {
                                    this.setState({
                                        needed_payment: response.data.needed_payment,
                                    });
                                }
                                else {
                                    this.setState({
                                        needed_payment: 500,
                                    });
                                }
                            });
                        }
                    });
                });
            }
            else {
                getStudentInfo(this.state.selectedStudentID, 0)
                .then(response => {            
                    this.setState({
                        studentInfo: response.data ? response.data : null,
                    }, () => {
                        if(this.state.selectedTab === "approved") {
                            getStudentStatus(this.state.selectedStudentID)
                            .then(response => {    
                                if(response.data && response.data.needed_payment) {
                                    this.setState({
                                        needed_payment: response.data.needed_payment,
                                    });
                                }
                                else {
                                    this.setState({
                                        needed_payment: 500,
                                    });
                                }
                            });
                        }
                    });
                }); 
            }
        });
    }
    handleApprovalButton = e => {
        const confirmMsg = this.state.enteredAmount ? "Are you sure you want to set " + parseInt(this.state.enteredAmount, 10) + " as Old Accounts? Click Ok to proceed, Cancel to set Old Accounts." :
                            "You did not set Old Accounts for this student, proceed? Click Ok to proceed, Cancel to set Old Accounts.";
        if(window.confirm(confirmMsg)) {  
            this.setState({
                approvalStatus: e,
                showPreloader: true
            }, () => {
                //const approveStatuses = { pending: 6, approved: 8 };   
                const neededPayment = this.state.enteredAmount ? parseInt(this.state.enteredAmount, 10) + 500 : 500;   
                const data = {
                    status: 8,
                    name_of_approver: getLoggedUserDetails("fullname"),
                    needed_payment: neededPayment           
                };
                updateStudentStatus(this.state.selectedStudentID, data)
                .then(response => {            
                    if(response.data.success) {
                        alert("Student Old Account sucessfully set and approved!")
                        this.setState({
                            selectedStudentID: "",
                            showPreloader: false,
                            enteredAmount: ''
                        }, () => this.getFilteredStudentList() ); 
                    }
                }); 
            });
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
            //year_level: this.state.year_level,
            //classification: this.state.searchFilterClassification
        };
        getStudentList(data)
        .then(response => {
            if(response.data && response.data.count > 0) {
                const retStudent = response.data.students;
                this.setState({
                    studentList: retStudent,
                    totalRecords: response.data.count,
                }, () => {
                    getStatusCount(this.state.course_department)
                    .then(response => {            
                        this.setState({
                            totalPending: response.data.approved_by_dean,
                            totalApproved: response.data.accounting_count,
                        });
                    });
                });
            }
            else {
                this.setState({
                    studentList: null,
                    totalRecords: 0,
                }, () => {
                    getStatusCount(this.state.course_department)
                    .then(response => {            
                        this.setState({
                            totalPending: response.data.approved_by_dean,
                            totalApproved: response.data.accounting_count,
                        });
                    });
                });
            }
        
        });
    }
    handleOnChangePage = e => {
        this.setState({
            page: e,
            selectedStudentID: "",
            enteredAmount: ''
        }, () => this.getFilteredStudentList());
    }
    handleChangeRowsPerPage = e => {
        this.setState({
            limit: e,
            selectedStudentID: "",
            enteredAmount: ''
        }, () => this.getFilteredStudentList());
    }
    render() {
        if (getLoggedUserDetails("usertype") !== "ACCOUNTING") {
            return <Redirect to="/login" />;
        }
        const { 
            studentList, page, limit, name, course, date, id_number, selectedTab, selectedStudentClassification,
            totalPending, totalApproved, totalDisapproved, totalRecords, courses, enteredAmount,
            studentInfo, selectedStudentID, showPreloader, needed_payment, studentGrades
        } = this.state;
        const searcheables = { name, course, date, id_number };
        const approver = getLoggedUserDetails("usertype");
        let loadStudentInfo = "";
        if(["OLD STUDENT", "RETURNEE", "SHIFTEE"].includes(selectedStudentClassification)) {
            loadStudentInfo = ( 
                <StudentInfoViewGrades 
                    studentInfo={studentInfo} 
                    studentGrades={studentGrades}
                />
            );
        } else {
            loadStudentInfo = (
                <StudentInfoView
                    studentInfo={studentInfo}
                />
            );
        }
        const loadSetAmount = selectedTab === "pending" ? (
            <div className="field has-addons has-addons-right">
                <div className="field-label">
                    <label className="label is-small">Enter Old Accounts</label>
                </div>
                <div className="control">
                    <input className="input is-small" type="text" name="enteredAmount" placeholder="Enter Amount" 
                            value={enteredAmount} onChange={this.handleOnchangeAmount} />
                </div>
                <div className="control">
                    <button className="button is-primary is-small" onClick={this.handleApprovalButton}>
                        { enteredAmount ? "Set Amount & Approve" : "Approve" }
                    </button>
                </div>
            </div>
        ) : (
            <div className="table-container">
                <table className="table is-striped is-fullwidth is-narrow is-bordered is-hoverable">                                        
                    <tbody>                                   
                        <tr>                                                        
                            <th className="is-narrow">Old Accounts</th>
                            <td className="is-narrow">{needed_payment  ? formatMoney(parseInt(needed_payment, 10) - 500) : "0.00"}</td>
                            <th className="is-narrow">Registration Fee</th>
                            <td className="is-narrow">500.00</td>
                            <th className="is-narrow">Total Enrollment Fee</th>
                            <td><strong>{needed_payment ? formatMoney(needed_payment) : "500.00"}</strong></td>
                        </tr>                                                         
                    </tbody>
                </table>    
            </div>  
        );
        return (
                <div className="box ml-1">
                    <EnrollmentTabs 
                        pending={6}
                        approved={8}
                        disapproved={77}
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
                            />   
                        </div>
                        <div className="column mt-0 mb-0 pt-0 pb-0">
                            {
                                selectedStudentID ? loadSetAmount : ""
                            }
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
                        {
                            showPreloader ? (
                                <div className="column is-center">
                                    <figure className="image is-128x128">
                                        <img src={SpinnerGif} alt="" />
                                    </figure>
                                </div>
                            ) : (
                                <div className="column mt-0 mb-0 pt-0 pb-0">
                                    {studentInfo && selectedStudentID ? loadStudentInfo : ""}                            
                                </div>
                            )
                        }
                    </div> 
                </div>       
        );
    }
}

//export default withRouter(Registrar)