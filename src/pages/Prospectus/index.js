import React, { Component} from "react";
import SpinnerGif from '../../assets/sysimg/spinner.gif'
import { getCurriculum} from '../../helpers/apiCalls';
import { getLoggedUserDetails, convertTabToYear, convertYearToTab } from '../../helpers/helper';

import ProspectusTabs  from '../../components/elements/ProspectusTabs';
import ProspectusTable from '../../components/elements/ProspectusTable'
import ViewSchedule from '../../components/elements/ViewSchedule'
import { Fragment } from "react";
import Sample from './Sample';
import TestingTable from '../../components/elements/TestingTable'

export class Prospectus extends Component {
    
    state = {
        test: false,
        sample: "Display sample passed data",
        selectedTab: null ,totalBehind: 0,subjects: null, schedules: null, selectedSubject: null,showModal: false,
        idnumber: null,yearlevel: null, prerequisites: null, grades: null, internal_code:null, subjectDescription: null
    }
    componentDidMount = () => {
        getCurriculum(getLoggedUserDetails("idnumber"))
        .then(response => {  
            if(response.data) {          
                this.setState({
                    subjects: response.data.subjects,
                    selectedTab: getLoggedUserDetails("yearlevel"),
                    prerequisites: response.data.prerequisites,
                    grades: response.data.grades,
                    schedules: response.data.schedules
                });
            }
        });  
    }
    closeModal = () => {
        this.setState({
            showModal: false
        })
    }
    viewScheduleButtonHandle = (selected, internal, description) =>{
        
        const{selectedSubject,internal_code,subjectDescription} = this.state;
        this.setState({
            selectedSubject: selected,
            internal_code: internal,
            subjectDescription: description,
            showModal: true
        });
        
        console.log("testLog2", selectedSubject);
    }
    handleOnClickTab = (tab, value) => {
        const{selectedTab} = this.state;
        this.setState({
            selectedTab: tab
        });
        
        //console.log("testLog", selectedTab);
    }
    handlerButtonTest = () => {
        const {test} = this.state;
        this.setState({
            test: !test
        }); 
        console.log("testing",test);
    }
    render() {
        const {selectedTab, totalBehind, subjects,prerequisites, grades, selectedSubject, schedules,
                internal_code,subjectDescription,showModal, test, sample} = this.state;
        let loadCurriculumTable = '';
        
        if(subjects)
        {
            loadCurriculumTable = (
                <ProspectusTable
                    selectedTab = {selectedTab}
                    totalBehind = {totalBehind}
                    handleOnClickTab = {this.handleOnClickTab}
                    subjects = {subjects}
                    prerequisites = {prerequisites}
                    grades = {grades}
                    viewScheduleButtonHandle = {this.viewScheduleButtonHandle}
                />
            );
        }

        var viewSchedule = selectedSubject ?
            <ViewSchedule 
                schedules = {schedules}
                selectedSubject = {selectedSubject}
                internal_code = {internal_code}
                subjectDescription = {subjectDescription}
            />: "";
        
        return (
        <Fragment>
            <div className={"modal " + (showModal == true?  "is-active " : "")}>
                <div className="modal-background" onClick={this.closeModal}></div>
                <div className="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Schedule</p>
                        <button class="delete" aria-label="close" onClick={this.closeModal}></button>
                    </header>
                    <section class="modal-card-body">
                        <ViewSchedule 
                            schedules = {schedules}
                            selectedSubject = {selectedSubject}
                            internal_code = {internal_code}
                            subjectDescription = {subjectDescription}
                        />
                    </section>
                </div>
                <button className="modal-close is-large" aria-label="close" onClick={this.closeModal}></button>
            </div>
            <div className="box ml-1 mb-1">
                <div className="columns">
                    <div className="column is-four-fifths">

                        <button onClick={this.handlerButtonTest}>{test ? "test2": "test"}</button>
                        <Sample 
                            sample = {sample} //props
                        />

                        <ProspectusTabs 
                            selectedTab = {selectedTab}
                            totalBehind = {totalBehind}
                            handleOnClickTab = {this.handleOnClickTab}
                            
                        />
                        {loadCurriculumTable}
                    </div>
                </div>
            </div>
            <TestingTable 
                subjects = {subjects}
            />
        </Fragment>
        )
    };
}

export const ProspectusHeader = () => (
    <div className="title is-4 ml-1">
        <i className="fas fa-file"></i> Prospectus
    </div> 
);
