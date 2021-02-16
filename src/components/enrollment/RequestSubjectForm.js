import React, { Component, Fragment } from 'react';
import SelectSearch from 'react-select-search';
export default class RequestSubjectForm extends Component {
    
  render() {
      const{inputChange,values, handleButtonSubmitRequest, sanitizedSubjectList} = this.props;
    return (
      <Fragment>
        <div className="column is-one-third">
            <div className="box">
                <h4 className="is-size-4 has-text-weight-bold mb-2">Request Form</h4>
                <div className="columns mt-5">
                    <div className="column pt-0 pull-right">
                        <SelectSearch
                            className="select-search"
                            options={sanitizedSubjectList}
                            search
                            //value={searcheables.id_number}
                            name="name"
                            placeholder="Subject"
                            onChange={this.handleOnchangeSelect}
                        />   
                    </div>
                </div>
                <div className="columns">
                    <div className="column pt-0 pull-right">
                        <h5 className="has-text-weight-bold mb-2 is-size-7">Days</h5>
                        <div className="field">
                            <div className="control has-icons-left has-icons-right">                                                    
                                <div class="field">
                                    <div class="control">
                                        <div class="select is-small">
                                            <select>
                                                <option>Select Day</option>
                                                <option>With options</option>
                                            </select>
                                            <span className="icon is-small is-left">
                                                <i className="fas fa-barcode"></i>
                                            </span>
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
                                <input name="searchBySubject" className="input is-small" type="time" placeholder="Search Subject" data-fieldname="Subject"/>
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
                                <input name="searchBySubject" className="input is-small" type="time" placeholder="Search Subject" data-fieldname="Subject"/>
                                <span className="icon is-small is-left">
                                    <i className="fas fa-barcode"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="column">
                    <div className="columns">
                        <label class="checkbox">
                            <input type="checkbox"/>
                                Willing to pay
                        </label>
                    </div>
                </div>
                <div className="column mt-5">
                    <div className="columns">
                        <button className="button is-small is-info is-pulled-right" onClick={handleButtonSubmitRequest()}>Submit Request</button>
                    </div>
                </div>
            </div>
        </div>
      </Fragment>
    );
  }
}
