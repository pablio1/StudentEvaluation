import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';

import { getLoggedUserDetails } from '../../helpers/helper';
import { getEnrollmentReport } from '../../helpers/apiCalls';
import ReportHeaderTiles from '../../components/enrollment/ReportHeaderTiles';
import ReportChartsMain from '../../components/enrollment/ReportChartsMain';
import ReportTableData from '../../components/enrollment/ReportTableData';
import LmsTools from './LmsTools';

import SpinnerGif from '../../assets/sysimg/spinner.gif';

class Reports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'col', college: "CL", date: '', isShowAllDate: true,
            headerTilesValues: null, tableValues: null, toggleLoading: false,
            selectStudTypeExportLMS: 0, studExportLMSBtnIsLoading: false
        }
    }
    componentDidMount = () => {
        this.setState({
            toggleLoading: true
        }, () => {        
            getEnrollmentReport("", this.state.college)
            .then(response => {            
                this.setState({
                    headerTilesValues: response.data.courseStat.filter(stat => stat.courseName === "All"),
                    tableValues: response.data.courseStat.filter(stat => stat.courseName !== "All"),
                    date: new Date(),
                    toggleLoading: false
                });
            }); 
        });
    }
    handleOnChangeDate = e => {
        this.setState({
            date: e.target.value
        }, () => {
            getEnrollmentReport(this.state.date, this.state.college)
            .then(response => {            
                this.setState({
                    tableValues: response.data.courseStat.filter(stat => stat.courseName !== "All"),
                });
            }); 
        });
    }
    handleOnChangeCheckBox = e => {
        this.setState({
            isShowAllDate: e.target.checked,
        }, () => {
            getEnrollmentReport("", this.state.college)
            .then(response => {            
                this.setState({
                    tableValues: response.data.courseStat.filter(stat => stat.courseName !== "All"),
                });
            }); 
        });
    }
    handleOnClickTab = e => {
        if(e === "lms") {
            this.setState({
                selectedTab: e,
            }, () => {
                 
            });
        }
        else {
            this.setState({
                selectedTab: e,
                college: e === "col" ? "CL" : "SH",
                toggleLoading: true
            }, () => {
                getEnrollmentReport("", this.state.college)
                .then(response => {            
                    this.setState({
                        headerTilesValues: response.data.courseStat.filter(stat => stat.courseName === "All"),
                        tableValues: response.data.courseStat.filter(stat => stat.courseName !== "All"),
                        isShowAllDate: true,
                        date: '',
                        toggleLoading: false
                    });
                }); 
            });
        }
    }
    
    render() {
        if (!["DEAN", "CHAIRPERSON", "COOR", "ACAD", "EDP", "REGISTRAR", "CASHIER", "ACCOUNTING", "LINKAGE", "MANAGEMENT"].includes(getLoggedUserDetails("usertype") )) {
            return <Redirect to="/login" />;
        }
        const { 
            selectedTab, headerTilesValues, date, tableValues, isShowAllDate, toggleLoading, selectStudTypeExportLMS, studExportLMSBtnIsLoading,
        } = this.state;
        const userType = getLoggedUserDetails("usertype");
        return(
            <div className="box ml-1">
                <div className="buttons has-addons is-centered">                
                    <button name="colTab" className={"button " + (selectedTab === "col" ? "is-info is-selected" : "")} 
                            onClick={() => this.handleOnClickTab("col")}>
                        <span className="icon is-small">
                        <i className="fas fa-university"></i>
                        </span>
                        <span>College</span>
                    </button>
                    <button name="shsTab" className={"button " + (selectedTab === "shs" ? "is-info is-selected" : "")}
                            onClick={() => this.handleOnClickTab("shs")}>
                        <span className="icon is-small">
                            <i className="fas fa-school"></i>
                        </span>
                        <span>Senior High</span>
                    </button>      
                    {   
                        ["DEAN", "CHAIRPERSON", "EDP"].includes(userType) ? (
                            <button name="lmsTab" className={"button " + (selectedTab === "lms" ? "is-info is-selected" : "")}
                                    onClick={() => this.handleOnClickTab("lms")}>
                                <span className="icon is-small">
                                    <i className="fas fa-laptop"></i>
                                </span>
                                <span>LMS</span>
                            </button>
                        ) : ""                            
                    }
                </div>  
                <div className="">
                    <div className="divider is-size-6 mt-0 pt-0"></div>
                </div>
                {selectedTab === "lms" ? <LmsTools /> : ""}
                { 
                    selectedTab !== "lms" && toggleLoading ? (
                        <div className="columns is-vcentered">
                            <div className="column is-center">
                                <figure className="image is-128x128">
                                    <img src={SpinnerGif} alt="" />
                                </figure>
                            </div>
                        </div> 
                    ) : ""
                }  

                {selectedTab !== "lms" && headerTilesValues && headerTilesValues.length > 0 ? <ReportHeaderTiles values={headerTilesValues[0]} /> : ""}
                {selectedTab !== "lms" &&headerTilesValues && headerTilesValues.length > 0 ? <ReportChartsMain values={headerTilesValues[0]} /> : ""}
                <div className="">
                    <div className="divider is-size-6 mt-0 pt-0"></div>
                </div>
                {
                    selectedTab !== "lms" && tableValues && tableValues.length > 0 ? (
                        <ReportTableData 
                            values={tableValues} 
                            date={date}
                            isChecked={isShowAllDate} 
                            educLevel={selectedTab}
                            handleOnChangeDate={this.handleOnChangeDate} 
                            handleOnChangeCheckBox={this.handleOnChangeCheckBox}
                        /> 
                    ) : ""
                }
            </div>
        )
    }


}

export default withRouter(Reports)


export class ReportsHeader extends Component {
    render() {
        return(
            <div className="title is-4 ml-1">
                <i className="far fa-chart-bar"></i> Reports
            </div> 
        );
    }   
}