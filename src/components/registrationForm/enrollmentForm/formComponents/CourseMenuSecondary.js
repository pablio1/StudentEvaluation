import React, { Component } from 'react';
import SelectStrand from '../../../elements/SelectStrand';


export default class CourseMenuSecondary extends Component {   
    handleOnChangeInput = e => {     
        this.props.handleOnChangeInput(e);
    }

    render() { 
        const { values, isOldStudent } = this.props;     
        const yearLevels = (values.educLevel === "shs") ? (
            <select name="selectedYearLevelSecondary" value={values.selectedYearLevelSecondary} 
                    onChange={this.handleOnChangeInput} required data-fieldname="Year Level">
                <option value="">Select Year</option>
                <option value="11">11</option>
                <option value="12">12</option>
            </select>
        ) : (
            <select name="selectedYearLevelSecondary" value={values.selectedYearLevelSecondary} 
                    onChange={this.handleOnChangeInput} required data-fieldname="Grade Level">
                <option value="">Select Grade</option>        
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
        );
        const strands = (values.educLevel === "shs") ? (
            <div className="column"> 
                <h3 className="has-text-weight-bold mb-2">Open Strands</h3>
                <div className="field">
                    <SelectStrand 
                        name="selectedStrand"
                        value={values.selectedStrand}
                        educLevel={values.educLevel}
                        required={true}
                        fieldname="Strand"
                        handleOnChangeInput={this.handleOnChangeInput}
                    />
                </div>                                                                                                                                                                                                                        
            </div>  
        ) : ""; 

        
        return(
            <div className="" style={{ /*width: "94%"*/ }}>
                <div className="columns is-vcentered">     
                    <div className="column"> 
                        <h3 className="has-text-weight-bold mb-3 pt-0">{(values.educLevel === "shs") ? "Year Level" : "Grade Level"}</h3>
                        <div className="field">
                            <p className="control is-expanded has-icons-left">
                                <span className="select is-fullwidth">
                                    {yearLevels}
                                </span>
                                <span className="icon is-small is-left">
                                    <i className="fas fa-bars"></i>
                                </span>
                            </p>
                        </div>                                                                                                                                                                                                                                                           
                    </div>                                       
                    {strands}
                    <div className="column"> 
                        <h3 className="has-text-weight-bold mb-2">Session</h3>
                        <div className="field">
                            <p className="control is-expanded has-icons-left">
                                <span className="select is-fullwidth">
                                    <select name="selectedSessionSecondary" value={values.selectedSessionSecondary} 
                                            onChange={this.handleOnChangeInput} required data-fieldname="Session">
                                        <option value="">Select Session</option>
                                        <option value="AM">AM</option>
                                        <option value="PM">PM</option>
                                    </select>
                                </span>
                                <span className="icon is-small is-left">
                                    <i className="fas fa-book"></i>
                                </span>
                            </p>
                        </div>                                                                                                                                                                                                                        
                    </div> 
                    <div className="column"> 
                        <h3 className="has-text-weight-bold mb-3 pt-0">Your Entry Status</h3>
                        <div className="field">
                            <p className="control is-expanded has-icons-left">
                                <span className="select is-fullwidth">
                                    <select name="selectedEntryStatusSecondary" value={values.selectedEntryStatusSecondary} 
                                            onChange={this.handleOnChangeInput} required data-fieldname="Entry Status">
                                        <option value="">Select Status</option>
                                        {isOldStudent ? "" : <option value="H">New Student</option>}
                                        {isOldStudent ? <option value="O">Old Student</option> : ""}
                                        {isOldStudent ? <option value="R">Returnee</option> : ""}
                                        {isOldStudent ? "" : <option value="T">Transferee</option>}
                                        {isOldStudent ? "" : <option value="C">Cross Enrolee</option>}
                                        {isOldStudent ? <option value="S">Shiftee</option> : ""}                                        
                                    </select>
                                </span>
                                <span className="icon is-small is-left">
                                    <i className="fas fa-chalkboard-teacher"></i>
                                </span>
                            </p>
                        </div>                                                                                                                                                                                                                                                           
                    </div>                             
                </div>
            </div>
        );
    }

}