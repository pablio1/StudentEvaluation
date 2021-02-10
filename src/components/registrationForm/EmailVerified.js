import React, { Component } from 'react';
import PromptSuccess from '../elements/PromptSuccess';

export default class EmailVerified extends Component {

    handleButtonClick = (e) => {
        this.props.handleEducLevel(e); 
        this.props.nextStep();    
    }
    render() {
        return(      
            <div className="section mt-0 pt-0">
                <div className="columns">
                    <div className="column pt-0"> 
                        <PromptSuccess />
                        <h3 className="subtitle has-text-centered">
                            Email Account Verified!
                        </h3>
                        <div className="">
                            <div className="divider is-size-6"></div>
                        </div>
                        <div className="" style={{ /*width: "94%"*/ }}>
                            <div className="columns">
                                <div className="column is-1"></div>
                                <div className="column"> 
                                    <h3 className="mb-4 has-text-centered">
                                        You can now proceed to process your online enrollment. Please make sure that you have your personal particulars, previous school info and scanned copies of your credentials ready. 
                                        You will fill up series of Forms shown below. Please be patient and remain online until all form are filled and submitted.                                                 
                                    </h3> 
                                    <div className="columns">
                                        <div className="column">
                                            <ul className="steps is-centered has-content-centered is-horizontal">
                                                <li className="steps-segment">
                                                    <span className="steps-marker"></span>
                                                    <div className="steps-content">
                                                    <p>Course Selection</p>
                                                    </div>
                                                </li>
                                                <li className="steps-segment">
                                                    <span className="steps-marker"></span>
                                                    <div className="steps-content">
                                                    <p>Personal Details</p>
                                                    </div>
                                                </li>
                                                <li className="steps-segment">
                                                    <span className="steps-marker"></span>
                                                    <div className="steps-content">
                                                    <p>Address & Contact Details</p>
                                                    </div>
                                                </li>
                                                <li className="steps-segment">
                                                    <span className="steps-marker"></span>
                                                    <div className="steps-content">
                                                    <p>Previous School Details</p>
                                                    </div>
                                                </li>
                                                <li className="steps-segment is-active">
                                                    <span className="steps-marker"></span>
                                                    <div className="steps-content">
                                                    <p>Required Documents Upload</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>                                                                                                
                                    <h1 className="mb-0 has-text-centered is-size-5 has-text-weight-bold">Please Choose Level to Enroll</h1>
                                    <h1 className="mb-5 has-text-centered">
                                        Once you have chosen the Level to Enroll you cannot go back to this menu unless you refresh the page or press the browsers back button losing 
                                        the data you entered in the subsequent forms. 
                                    </h1>
                                    <div className="columns">
                                        <div className="column">
                                            <button 
                                                className="button is-info is-medium is-fullwidth"
                                                onClick={() => this.handleButtonClick("col")} 
                                            >College</button>
                                        </div>                                                     
                                        <div className="column">
                                            <button 
                                                className="button is-info is-medium is-fullwidth"
                                                onClick={() => this.handleButtonClick("shs")}    
                                            >Senior High School</button>
                                        </div> 
                                        {/*
                                        <div className="column">
                                            <button 
                                                className="button is-info is-medium is-fullwidth"
                                                onClick={() => this.handleButtonClick("jhs")}    
                                            >Junior High School</button>
                                        </div> 
                                        <div className="column">
                                            <button 
                                                className="button is-info is-medium is-fullwidth"
                                                onClick={() => this.handleButtonClick("bed")}
                                            >Basic Education</button>
                                        </div>
                                        */} 
                                    </div>                                                                                                                                                                          
                                </div>  
                                <div className="column is-1"></div>                                           
                            </div>
                        </div>
                        <div>
                            <div className="divider is-size-6"></div>
                        </div>
                        <nav className="level">
                            <div className="level-left mb-0 pb-0">
                                
                            </div>
                            <div className="level-right mt-1 pt-0">
                                
                            </div>  
                        </nav>                                                                
                    </div>
                </div> 
            </div>                                  
        )
    }
}
