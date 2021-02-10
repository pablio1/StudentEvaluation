import React, { Component, Fragment } from 'react';

import ReportEnrollPromissory from './ReportEnrollPromissory';

export default class AssessmentReports extends Component {
    state = {
        showReport: ""
    }
    componentDidMount = () => {

    }
    handleBtnClick = e => {
        this.setState({
            showReport: e
        });
    }
    render() {
        const { showReport } = this.state;
        let loadReport = "";
        if(showReport === "enrollPromissory") loadReport = <ReportEnrollPromissory />;
        return(
            <Fragment>
                <div className="columns">                    
                    <div className="column is-2">
                        <button className="button is-fullwidth is-info" onClick={() => this.handleBtnClick("enrollPromissory")} >
                            Enrollment Promissory 
                        </button>
                    </div>
                    <div className="column">
                        {loadReport}
                    </div>
                </div>   
            </Fragment>
        )
    }

}