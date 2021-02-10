import React, { Component } from 'react';


export default class CourseMenuPrimary extends Component {   
    handleOnChangeInput = e => {     
        this.props.handleOnChangeInput(e);
    }

    render() { 
        const { values } = this.props;     
        
        return(
            <div className="" style={{ /*width: "94%"*/ }}>
                <div className="columns is-vcentered">  
                    <div className="column is-hidden-mobile"> </div>   
                    <div className="column"> 
                        <h3 className="has-text-weight-bold mb-3 pt-0">Grade Level</h3>
                        <div className="field">
                            <p className="control is-expanded has-icons-left">
                                <span className="select is-fullwidth">
                                <select name="selectedGradeLevel" value={values.selectedGradeLevel} 
                                        onChange={this.handleOnChangeInput} required data-fieldname="Grade Level">
                                    <option value="">Select Grade</option>        
                                    <option value="6">6</option>
                                    <option value="5">5</option>
                                    <option value="4">4</option>
                                    <option value="3">3</option>
                                    <option value="2">2</option>
                                    <option value="1">1</option>
                                    <option value="K1">K1</option>
                                    <option value="N1">N1</option>                                
                                </select>
                                </span>
                                <span className="icon is-small is-left">
                                    <i className="fas fa-bars"></i>
                                </span>
                            </p>
                        </div>                                                                                                                                                                                                                                                           
                    </div>                                     
                    <div className="column"> 
                        <h3 className="has-text-weight-bold mb-3 pt-0">Your Entry Status</h3>
                        <div className="field">
                            <p className="control is-expanded has-icons-left">
                                <span className="select is-fullwidth">
                                    <select name="selectedEntryStatusPrimary" value={values.selectedEntryStatusPrimary} 
                                            onChange={this.handleOnChangeInput} required data-fieldname="Entry Status">
                                        <option value="">Select Status</option>
                                        <option value="H">New Student</option>
                                        <option value="R">Returnee</option>
                                        <option value="T">Transferee</option>
                                        <option value="C">Cross Enrolee</option>
                                        <option value="S">Shiftee</option>
                                    </select>
                                </span>
                                <span className="icon is-small is-left">
                                    <i className="fas fa-chalkboard-teacher"></i>
                                </span>
                            </p>
                        </div>                                                                                                                                                                                                                                                           
                    </div>   
                    <div className="column is-hidden-mobile"> </div>                         
                </div>
            </div>
        );
    }

}