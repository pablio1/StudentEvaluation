import React, { Component, Fragment} from "react";
import SpinnerGif from '../../assets/sysimg/spinner.gif'
import { getCurriculum} from '../../helpers/apiCalls';
import { getLoggedUserDetails, convertTabToYear, convertYearToTab,hasSubjectLab } from '../../helpers/helper';

import ProspectusTabs  from '../../components/elements/ProspectusTabs';
import ProspectusTable from '../../components/elements/ProspectusTable'
import ViewSchedule from '../../components/elements/ViewSchedule'

export class Prospectus extends Component {
    
    state = {
        selectedTab: null ,totalBehind: 0,subjects: null, schedules: null, selectedSubject: null,showModal: false,
        idnumber: null,yearlevel: null, requisites: null, grades: null, internal_code:null, subjectDescription: null,
            getYear: null, years:null, semesters: null
    }
    componentDidMount = () => {
        getCurriculum(getLoggedUserDetails("idnumber"))
        .then(response => {  
            if(response.data) {          
                this.setState({
                    subjects: response.data.subjects,
                    selectedTab: getLoggedUserDetails("yearlevel"),
                    requisites: response.data.requisites,
                    grades: response.data.grades,
                    schedules: response.data.schedules,
                    getYear: response.data.course_code
                });
                const {subjects} = this.state;
                const year = [...new Set(subjects.map(item => item.year_level))]
                this.setState({
                    years: year
                });
                const semester = [...new Set(subjects.map(item => item.semester))]
                this.setState({
                    semesters: semester
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
        const {selectedTab, totalBehind, subjects,requisites, grades, selectedSubject, schedules,
                internal_code,subjectDescription,showModal,years,semesters} = this.state;
        let loadCurriculumTable = '';
        
        if(subjects)
        {
            loadCurriculumTable = (
                <ProspectusTable
                    selectedTab = {selectedTab}
                    totalBehind = {totalBehind}
                    handleOnClickTab = {this.handleOnClickTab}
                    subjects = {subjects}
                    requisites = {requisites}
                    grades = {grades}
                    semesters={semesters}
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
                    <header className="modal-card-head">
                        <p className="modal-card-title">Schedule</p>
                        <button className="delete" aria-label="close" onClick={this.closeModal}></button>
                    </header>
                    <section className="modal-card-body">
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
                        <ProspectusTabs 
                            selectedTab = {selectedTab}
                            totalBehind = {totalBehind}
                            grades = {grades}
                            subjects = {subjects}
                            years = {years}
                            semesters = {semesters}
                            handleOnClickTab = {this.handleOnClickTab}
                            
                        />
                        {loadCurriculumTable}
                    </div>
                </div>
            </div>
        </Fragment>
        )
    };
}

export const ProspectusHeader = () => (
    <div className="title is-4 ml-1">
        <i className="fas fa-file"></i> Prospectus
    </div> 
);
