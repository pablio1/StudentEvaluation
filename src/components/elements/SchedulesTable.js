import React, { Component, Fragment } from 'react';
//import { withRouter } from 'react-router-dom';
//import axios from 'axios';

import { convertMilitaryToStandardTime } from '../../helpers/helper';
import { getClassList } from '../../helpers/apiCalls';
import ClassListTable from '../elements/ClassListTable';

export default class SchedulesTable extends Component {
    state = {
        showModal: false, selectedEdpCodeClassList: '', edpCode: '', subjectName: '', schedule: '', units: '', 
        officiallyEnrolled: null, pendingEnrolled: null, notAccepted: null
    }
    handleOnchangeInput = e => {
        this.props.handleOnchangeInput(e);
    }
    handleOnButtonClick = e => {
        this.props.handleOnButtonClick(e);
    }
    onClickAccordion = e => {
        this.props.onClickAccordion(e);
    }
    closeModal = () => {
        this.setState({
            showModal: false
        })
    }
    removeSchedule = e => {
        this.props.removeSchedule(e);
    }
    handleOpenClassList = e => {
        if(e) {
            this.setState({
                selectedEdpCodeClassList: e,
                showModal: true
            }, () => {
                getClassList(this.state.selectedEdpCodeClassList)
                .then(response => {
                    if(response.data) {
                        const data = response.data;                    
                        this.setState({
                            edpCode: data.edp_code, 
                            subjectName: data.subject_name, 
                            schedule: data.time_info, 
                            units: data.units, 
                            officiallyEnrolled: data.official_enrolled.length > 0 ? data.official_enrolled : null, 
                            pendingEnrolled: data.pending_enrolled.length > 0 ? data.pending_enrolled : null, 
                            notAccepted: data.not_accepted.length > 0 ? data.not_accepted : null
                        });
                    }
                    else {
                        alert("No records found. Please try again.");
                    }
                });
            })
        }
    }
    render() {    
        const { subjects, accSelectedSubjectsExpand, module } = this.props;
        const {
            showModal, edpCode, subjectName, schedule, units, 
            officiallyEnrolled, pendingEnrolled, notAccepted
        } = this.state;
        const schedStatusLabel = { 0: "Undeployed", 1: "Deployed", 2: "Dissolved", 3: "Requested", 4: "Deferred", 5: "Closed" };        
        const loadSubjects = subjects ? subjects.filter(sch => sch.split_type !== "C").map((schedule, index) => {
            const edpCodeProp = schedule.hasOwnProperty("edpcode") ? "edpcode" : "edp_code";
            const splitSchedules = schedule.split_type === "S" ? subjects.filter(sched => sched.split_code === schedule[edpCodeProp] && sched.split_type!=="S") : "";
            let isfull = schedule.size >= schedule.max_size ? <i className="fas fa-exclamation has-text-danger"></i> : "";
            return (
                <Fragment key={index}>
                <tr className={ schedule.size >= schedule.max_size ? "has-background-danger-light" : ""}>  
                    <td className="valign has-text-centered is-narrow">{isfull}</td>                 
                    <td className="valign is-narrow">{schedule[edpCodeProp]}</td>
                    <td className="valign">
                        <span className="has-tooltip-arrow has-tooltip-multiline has-tooltip-right" data-tooltip={schedule.descriptive_title.trim()}>
                        {schedule.subject_name}
                        </span>
                    </td>
                    <td className="valign has-text-centered">{schedule.subject_type}</td>
                    <td className="valign has-text-centered">{schedule.units}</td>
                    <td className="valign has-text-right">{schedule.days}</td>
                    <td className="valign has-text-right">{convertMilitaryToStandardTime(schedule.m_begin_time)} - {convertMilitaryToStandardTime(schedule.m_end_time)}</td>
                    <td className="valign has-text-centered">{schedule.room}</td>
                    <td className="valign has-text-centered">{schedule.max_size}</td>
                    <td className="valign has-text-centered">{schedule.size}</td>
                    <td className="valign has-text-centered">{schedule.official_enrolled}</td>
                    <td className="valign has-text-centered">{schedule.pending_enrolled}</td>
                    <td className="valign has-text-centered">{schedule.section}</td>
                    <td className="valign has-text-centered">{schedule.course_abbr}</td>
                    <td className="valign has-text-centered">{schedStatusLabel[schedule.status]}</td>
                    <td className="valign has-text-centered">
                        <div className="tags">
                            <div className="tag is-small is-info is-clickable" onClick={() => this.handleOpenClassList(schedule[edpCodeProp])}><i className="fas fa-clipboard-list"></i></div> 
                            {module === "TeachersLoading" ? <div className="tag is-small is-danger is-clickable" onClick={() => this.removeSchedule(schedule[edpCodeProp])}>Unload</div> : ""}            
                        </div>                        
                    </td>
                </tr>
                {
                    splitSchedules ? splitSchedules.map((split, index) => {
                        return(
                            <tr key={index} className="has-background-link-light">     
                                <td></td>                           
                                <td className="valign is-narrow pt-0 pb-0"><i className="fas fa-caret-right"></i> {split[edpCodeProp]}</td>
                                <td className="valign pt-0 pb-0">{split.subject_name}</td>
                                <td className="valign has-text-centered pt-0 pb-0">{split.subject_type}</td>
                                <td className="valign has-text-centered pt-0 pb-0">{split.units}</td>
                                <td className="valign has-text-right pt-0 pb-0">{split.days}</td>
                                <td className="valign has-text-right pt-0 pb-0">{convertMilitaryToStandardTime(split.m_begin_time)} - {convertMilitaryToStandardTime(split.m_end_time)}</td>
                                <td className="valign has-text-centered pt-0 pb-0">{split.room}</td>
                                <td className="valign has-text-centered pt-0 pb-0">{split.max_size}</td>
                                <td className="valign has-text-centered pt-0 pb-0">{split.size}</td>
                                <td className="valign has-text-centered pt-0 pb-0">{split.official_enrolled}</td>
                                <td className="valign has-text-centered pt-0 pb-0">{split.pending_enrolled}</td>
                                <td className="valign has-text-centered pt-0 pb-0">{split.section}</td>
                                <td className="valign has-text-centered pt-0 pb-0">{split.course_abbr}</td>
                                <td className="valign has-text-centered pt-0 pb-0">{schedStatusLabel[split.status]}</td>
                                <td className="valign has-text-centered pt-0 pb-0"></td>
                            </tr>
                        )
                    }) : <tr></tr>
                }
                </Fragment>   
            )
        }) : ""; 
        return(  
            <Fragment>    
                <div className={"modal " + (showModal ?  "is-active " : "")}>
                    <div className="modal-background" onClick={this.closeModal}></div>
                    <div className="modal-content">
                        <ClassListTable 
                            edpCode={edpCode}
                            subjectName={subjectName}
                            schedule={schedule}
                            units={units}
                            officiallyEnrolled={officiallyEnrolled}
                            pendingEnrolled={pendingEnrolled}
                            notAccepted={notAccepted}
                        /> 
                    </div>
                    <button className="modal-close is-large" aria-label="close" onClick={this.closeModal}></button>
                </div>
                <article className="message is-small m-0 pt-0">
                    <div className="message-header is-clickable" onClick={() => this.onClickAccordion("list")}>
                    <p>LIST VIEW</p>   
                    <button className="is-small p-0" aria-label="delete" onClick={() => this.onClickAccordion("list")}>
                        <span className="icon is-small">
                            <i className={accSelectedSubjectsExpand ? "fas fa-minus" : "fas fa-plus"}></i>
                        </span>
                    </button>            
                </div>
                    {
                        accSelectedSubjectsExpand ? (
                            <div className="message-body p-0">
                            <div className="table-container p-0">
                                <table className="table is-striped is-fullwidth is-size-7 is-hoverable">
                                    <thead>
                                        <tr> 
                                            <th className="is-narrow">Full</th>                                  
                                            <th className="is-narrow">EDP Code</th>
                                            <th>Subject</th>
                                            <th className="has-text-centered">Type</th>
                                            <th className="has-text-centered">Units</th>
                                            <th className="has-text-right">Days</th>
                                            <th className="has-text-right">Time</th>
                                            <th className="has-text-centered">Room</th>
                                            <th className="has-text-centered is-narrow">Max Size</th>
                                            <th className="has-text-centered is-narrow">Size</th>
                                            <th className="has-text-centered is-narrow">Official</th>
                                            <th className="has-text-centered is-narrow">Pending</th>
                                            <th className="has-text-centered is-narrow">Section</th>
                                            <th className="has-text-centered">Course</th>
                                            <th className="has-text-centered">Status</th>
                                            <th className="has-text-centered">Action</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th></th><td></td><td></td><td></td>
                                            <th></th><th></th><th></th><th></th>
                                            <th></th><th></th><th></th><th></th>
                                            <th></th><th></th><th></th><th></th>
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                    { loadSubjects ? loadSubjects : (    
                                                <tr>
                                                    <th></th><td></td><td></td><td></td>
                                                    <th></th><th></th><th></th><th></th>
                                                    <th></th><th></th><th></th><th></th>
                                                    <th></th><th></th><th></th><th></th>
                                                </tr>
                                            )
                                        }                                                                                             
                                    </tbody>
                                </table>    
                            </div>                                  
                            </div>
                        ) : ""
                    }
                </article>             
            </Fragment> 
        )
    }
}