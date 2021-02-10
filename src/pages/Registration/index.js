import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


import isLoggedIn from '../../helpers/isLoggedIn';
import UCLogo128x128 from '../../assets/sysimg/uc-logo-128x128.png';
import baniladInfoGraphics from "../../assets/sysimg/banilad_info.jpg";
import lmInfoGraphics from "../../assets/sysimg/lm_info.jpg";

export default class WelcomeRegistration extends Component {
    
    render() {
        if (isLoggedIn()) {
            return <Redirect to="/dashboard" />;
        }
        const loadInfoGraphics = process.env.REACT_APP_CAMPUS === "Banilad" ? baniladInfoGraphics : lmInfoGraphics;
        return(    
            <section id="registration" className="hero is-fullheight landing-page-body">        
            <div className="hero-body">
                <div className="container"> 
                    <div className="box is-full-height pt-0">
                        <div className="navbar" role="navigation" aria-label="main navigation">
                            <div className="navbar-brand">
                                <div className="image is-96x96">
                                    <img src={UCLogo128x128} alt="" />
                                </div>                    
                            </div>
                        </div>                           
        
                        <div className="is-center mt-0 pt-0" style={{ height: '80%' }} >
                            <div className="columns pt-0">
                                <div className="column is-2"></div>
                                <div className="column"> 
                                    <h2 className="title">Registration</h2>
                                    <h3 className="subtitle">
                                        Welcome to University of Cebu {process.env.REACT_APP_CAMPUS} online registration. Your first step to 
                                        s<span className="has-text-info has-text-weight-bold">UC</span>cess.
                                    </h3>
                                    <div>
                                        <div className="divider is-size-6"></div>
                                    </div>
                                    <div className="columns">
                                        <div className="column is-three-fifths">                                
                                            <h5 className="mt-2">
                                                For new admission (Freshmen and Transferees). Please click <span className="has-text-info "> Admission</span> Button.
                                            </h5>
                                            <h5 className="mt-3">
                                                Before you proceed with Admission, please check first the steps and requirements <a className="has-text-info has-text-weight-bold" href={loadInfoGraphics} target="_blank" rel="noreferrer" >here</a> so you can prepare the necessary infomation and documents.
                                            </h5>
                                            {/*
                                            <h5 className="mt-3">
                                                If you want to register for just a portal account and decide to enroll later. Please click <span className="has-text-info ">Portal Account</span> Button.
                                            </h5>
                                            */}
                                        </div>
                                        <div className="column"> 
                                            <div className="block mb-2">
                                                <a 
                                                    className="button is-info is-fullwidth is-medium"
                                                    href="/registration/form/admission"                          
                                                >
                                                    <span className="icon is-medium is-left">
                                                        <i className="fas fa-university"></i>
                                                    </span>
                                                    <span>Admission</span>
                                                </a>
                                            </div>
                                            {/*
                                            <div className="block mb-2">
                                                <a 
                                                    className="button is-info is-fullwidth is-medium"
                                                    href="/registration/form/portal"                                              
                                                >
                                                    <span className="icon is-medium is-left">
                                                        <i className="fas fa-user-plus"></i>
                                                    </span>
                                                    <span>Portal Account</span>
                                                </a>
                                            </div>
                                            */}             
                                        </div>                    
                                    </div>  
                                </div>
                                <div className="column is-2"></div>
                            </div> 
                        </div>                                   
                    </div>
                </div>
            </div>
            </section>
        )
    }
}
