import React, { Component } from "react";
import SpinnerGif from '../../assets/sysimg/spinner.gif'

import { getStudentInfo, loginUser, changePassword } from '../../helpers/apiCalls';
import { getLoggedUserDetails, ValidatePassword } from '../../helpers/helper';

import StudentProfilePanel  from '../../components/elements/StudentProfilePanel';
import StaffProfilePanel  from '../../components/elements/StaffProfilePanel';
import RequestSchedule  from '../../components/elements/RequestSubject';
import ViewProspectus  from '../../components/elements/BehindSubject';

export class BehindSubject extends Component {
    state = {
        isViewSchedule: false
    }
    componentDidMount = () => {
         
    }
    
    render() {
        const {isViewSchedule} = this.state;
        
        return (
        <>
            <div className="box ml-1 mb-1">
                <div className="columns">
                    <div className="column is-two-thirds">
                        <ViewProspectus />
                    </div>
                    <div className="column is-one-thirds">

                    </div>
                </div>
            </div>

        </>
        )
    };
}

export const BehindSubjectHeader = () => (
    <div className="title is-4 ml-1">
        <i className="fas fa-file"></i> Prospectus / Behind Subjects
    </div> 
);
