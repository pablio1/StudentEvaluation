import React, { Component, Fragment } from 'react';
import SelectSearch from 'react-select-search';
export default class RequestSubjectForm extends Component {
    
   
  render() {
      const{handleCloseButton,inputChange,values, sanitizedSubjectList, handleButtonSubmitRequest, handleCheckBox, success,handleOnChangeSelect} = this.props;

    return (
      <Fragment>
        <div className="column is-one-third">
            <div className="box">
                <h4 className="is-size-4 has-text-weight-bold mb-2">Request Form</h4>
                {
                    success === null ? "" : (success?(
                        <div className="notification is-success">
                            <button className="delete" onClick={handleCloseButton}></button>
                            Success!
                        </div>
                    ):(
                        <div className="notification is-danger">
                            <button className="delete" onClick={handleCloseButton}></button>
                            Failed! Please fill out the form needed!
                        </div>
                    ))
                }
                <div className="columns mt-5">
                    <div className="column pt-0 pull-right">
                        <h5 className="has-text-weight-bold mb-2 is-size-7">Days</h5>
                        <div className="field">
                            <div className="control">                                                    
                                <div className="field">
                                    <div className="control">
                                        <div className="">
                                        <SelectSearch
                                            className="select-search"
                                            options={sanitizedSubjectList}
                                            search
                                            //value={searcheables.id_number}
                                            name="name"
                                            placeholder="Subject"
                                            onChange={handleOnChangeSelect}
                                        /> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="columns">
                    <div className="column pt-0 pull-right">
                        <h5 className="has-text-weight-bold mb-2 is-size-7">Days</h5>
                        <div className="field">
                            <div className="control has-icons-left has-icons-right">                                                    
                                <div className="field">
                                    <div className="control">
                                        <div className="select is-small">
                                            <select onChange={inputChange('days')}>
                                                <option>Select Day</option>
                                                <option value="MW">MW</option>
                                                <option value="TTH">TTH</option>
                                                <option value="SAT">SAT</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="columns">
                    <div className="column pt-0 pull-right">
                        <h5 className="has-text-weight-bold mb-2 is-size-7">Start Time</h5>
                        <div className="field">
                            <div className="control has-icons-left has-icons-right">                                                    
                                <input name="time_start" className="input is-small" onChange={inputChange('time_start')} name="status" value={values.time_start} type="time" placeholder="Search Subject" data-fieldname="Subject"/>
                                <span className="icon is-small is-left">
                                    <i className="fas fa-barcode"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="column pt-0 pull-right">
                        <h5 className="has-text-weight-bold mb-2 is-size-7">End Time</h5>
                        <div className="field">
                            <div className="control has-icons-left has-icons-right">                                                    
                                <input name="searchBySubject" className="input is-small" onChange={inputChange('time_end')} name="status" value={values.time_end} type="time" placeholder="Search Subject" data-fieldname="Subject"/>
                                <span className="icon is-small is-left">
                                    <i className="fas fa-barcode"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="column">
                    <div className="columns">
                        <label className="checkbox">
                            <input type="checkbox" name="rtype" onChange={handleCheckBox} value={values.rtype}/>
                                Willing to pay
                        </label>
                    </div>
                </div>
                <div className="column mt-5">
                    <div className="columns">
                        <button className="button is-small is-info is-pulled-right" onClick={handleButtonSubmitRequest}>Submit Request</button>
                    </div>
                </div>
            </div>
        </div>
      </Fragment>
    );
  }
}
