import React, { Component } from "react";
import SpinnerGif from '../../assets/sysimg/spinner.gif'

import { getStudentInfo, loginUser, changePassword, getOldStudentInfo } from '../../helpers/apiCalls';
import { getLoggedUserDetails, ValidatePassword } from '../../helpers/helper';

import StudentProfilePanel  from '../../components/elements/StudentProfilePanel';
import StaffProfilePanel  from '../../components/elements/StaffProfilePanel';

export class Profile extends Component {
    state = {
        studentInfo: null, personelInfo: null, showCurrentPassWordInput: false, currentPassWordInput: '', isLoadingBtnCurrentPassword: false,
        disableChangePasswordBtn: false, showNewPassWordInput: false, newPassWordInput: '', newPassWordInputConfirm: '', isLoadingBtnNewPassword: false,
        errorMsg: '', showError: false, userType: ''
    }
    componentDidMount = () => {
        if(getLoggedUserDetails("usertype") === "STUDENT") {
            if(["O","R","S"].includes(getLoggedUserDetails("classification"))) {
                getOldStudentInfo(getLoggedUserDetails("idnumber"), 0) 
                .then(response => {
                    if(response.data) {
                        this.setState({
                            studentInfo: response.data,
                            userType: getLoggedUserDetails("usertype"),
                        })
                    }
                });
            }
            else {
                getStudentInfo(getLoggedUserDetails("idnumber"), 0) 
                .then(response => {
                    if(response.data) {
                        this.setState({
                            studentInfo: response.data,
                            userType: getLoggedUserDetails("usertype"),
                        })
                    }
                });
            }
        }
        else {
            const userData = {
                courseabbr: getLoggedUserDetails("courseabbr"),
                coursecode: getLoggedUserDetails("coursecode"),
                courseyear: getLoggedUserDetails("courseyear"),
                email: getLoggedUserDetails("email"),
                fullname: getLoggedUserDetails("fullname"),
                gened: getLoggedUserDetails("gened"),
                idnumber: getLoggedUserDetails("idnumber"),
                studenttype: getLoggedUserDetails("studenttype"),
                usertype: getLoggedUserDetails("usertype"),
                yearlevel: getLoggedUserDetails("yearlevel"),
                avatar: getLoggedUserDetails("avatar")
            }
            this.setState({
                personelInfo: userData,
                userType: getLoggedUserDetails("usertype")
            })
        }        
    }
    handleOnChangeInput = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    handleSubmitCurrentPassword = e => {
        if(e === "submit") {
            this.setState({
                isLoadingBtnCurrentPassword: true
            }, () => {
                loginUser(getLoggedUserDetails("idnumber"), this.state.currentPassWordInput)
                .then(result => {
                    if(result.data.success) { 
                        this.setState({
                            showNewPassWordInput: true,
                            isLoadingBtnCurrentPassword: false,
                            showCurrentPassWordInput: false,
                            currentPassWordInput: '',
                            errorMsg: '',
                            showError: false
                        })    
                    }
                    else {
                        this.setState({
                            errorMsg: "Incorrect Password. Please try again.",
                            showError: true,
                            isLoadingBtnCurrentPassword: false
                        })
                    }
                });
            });
        }
        else if(e === "cancel") {
            this.setState({
                showCurrentPassWordInput: false,
                disableChangePasswordBtn: false,
                currentPassWordInput: ''
            })
        }
    }
    handleSubmitNewPassword = e => {
        if(e === "submit") {
            const { newPassWordInputConfirm, newPassWordInput } = this.state;
            if(newPassWordInputConfirm !== newPassWordInput) {        
                this.setState({
                    errorMsg: "Passwords did not match.",
                    showError: true
                })
            }
            else if(newPassWordInputConfirm === "" || newPassWordInput === "") {        
                this.setState({
                    errorMsg: "Password fields can't be empty.",
                    showError: true
                })
            }
            else if(!ValidatePassword(newPassWordInput)) {
                this.setState({
                    errorMsg: "Password must contain a number, lower case and upper case letters. \nPassword must be at least 6 characters long.",
                    showError: true
                })
            }
            else {
                this.setState({
                    isLoadingBtnNewPassword: true
                }, () => {
                    changePassword(getLoggedUserDetails("idnumber"), newPassWordInput)
                    .then(result => {
                        if(result.data.success) { 
                            this.setState({
                                showNewPassWordInput: false,
                                isLoadingBtnNewPassword: false,
                                showNewPassWordInput: false,
                                disableChangePasswordBtn: false,
                                currentPassWordInput: '',
                                newPassWordInput: '', 
                                newPassWordInputConfirm: '',
                                errorMsg: '',
                                showError: false
                            })    
                        }
                    });
                });
            }
        }
        else if(e === "cancel") {
            this.setState({
                showNewPassWordInput: false,
                disableChangePasswordBtn: false,
                currentPassWordInput: '',
                newPassWordInput: '', 
                newPassWordInputConfirm: '',
                errorMsg: '',
                showError: false
            })
        }
    }
    handleOnClickBtn = e => {
        if(e === "changePassword") {
            this.setState({
                showCurrentPassWordInput: true,
                disableChangePasswordBtn: true
            })
        }
    }
    render() {
        const { 
            studentInfo, personelInfo, showCurrentPassWordInput, currentPassWordInput, disableChangePasswordBtn,
            showNewPassWordInput, isLoadingBtnCurrentPassword, errorMsg, showError, isLoadingBtnNewPassword, userType
        } = this.state;
        const avatarPath = studentInfo && studentInfo.attachments.length > 0 ? process.env.REACT_APP_PATH_STORAGE_IDPICTURES + studentInfo.attachments.filter(file => file.type === "2x2 ID Picture")[0].filename : "";
        const currentPasswordInput = (
            <div className="column is-4">
                <div className="field is-grouped">
                    <p className="control is-expanded">
                        <input className="input" name="currentPassWordInput" type="password" placeholder="Enter Current Password" 
                                value={currentPassWordInput} onChange={this.handleOnChangeInput}/>
                    </p>
                    <p className="control">
                        {
                            currentPassWordInput.length >= 2 ?  
                            <button className={"button is-info " + (isLoadingBtnCurrentPassword ? "is-loading" : "")}
                                onClick={() => this.handleSubmitCurrentPassword("submit")} >Submit
                            </button> :    
                            <button className="button is-danger" onClick={() => this.handleSubmitCurrentPassword("cancel")} >Cancel</button>    
                        }
                    </p>
                </div>   
            </div>
        );
        const newPasswordInput = (
            <div className="columns">
                <div className="column is-one-quarter-widescreen">
                    <div className="field">
                        <div className="control has-icons-left has-icons-right">
                            <input className="input" type="password" placeholder="New Password" name="newPassWordInput"
                                   onChange={this.handleOnChangeInput} />
                            <span className="icon is-small is-left">
                                <i className="fas fa-lock"></i>
                            </span>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control has-icons-left">
                            <input className="input" type="password" placeholder="Confirm Password" name="newPassWordInputConfirm"
                                   onChange={this.handleOnChangeInput} />
                            <span className="icon is-small is-left">
                                <i className="fas fa-lock"></i>
                            </span>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <div className="buttons">
                                <button className={"button is-success " + (isLoadingBtnNewPassword ? "is-loading" : "")} 
                                        onClick={() => this.handleSubmitNewPassword("submit")} >
                                        Change Password
                                </button>
                                <button className="button is-danger" onClick={() => this.handleSubmitNewPassword("cancel")} >Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
        const passwordValidationError = (
            <div className="columns">
                <div className="column is-one-quarter-widescreen">
                    <div className="notification is-danger">
                        <span className="icon">
                            <i className="fas fa-exclamation-triangle"></i>
                        </span>
                        {errorMsg}
                    </div>        
                </div>
            </div>
        )
        return studentInfo || personelInfo ? (
            <div className="box ml-1">
                 <div className="columns">
                    <div className="column is-three-quarters-widescreen">
                        {
                            userType && userType === "STUDENT" ? (
                                <StudentProfilePanel
                                    studentInfo={studentInfo}
                                    avatarPath={avatarPath}
                                />
                            ) : (
                                <StaffProfilePanel
                                    staffInfo={personelInfo}
                                    avatarPath={avatarPath}
                                />
                            )
                        }   
                    </div>
                </div>
                <div className="columns">
                    <div className="column is-2">
                        <button className="button is-fullwidth is-info" onClick={() => this.handleOnClickBtn("changePassword")} disabled={disableChangePasswordBtn}>Change Password</button>   
                    </div>
                    {showCurrentPassWordInput ? currentPasswordInput : ""}
                </div> 
                {showError ? passwordValidationError : ""}
                {showNewPassWordInput ? newPasswordInput : ""}            
            </div>
        ):(
            <div className="box ml-1">
                <div className="columns is-vcentered">
                    <div className="column is-center">
                        <figure className="image is-128x128">
                            <img src={SpinnerGif} alt="" />
                        </figure>
                    </div>
                </div> 
            </div>  
        );
    };
}

export const ProfileHeader = () => (
    <div className="title is-4 ml-1">
        <i className="fas fa-user"></i> Profile
    </div> 
);
