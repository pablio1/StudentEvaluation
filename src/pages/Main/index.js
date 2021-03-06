import React, { Component } from "react";
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import axios from 'axios';
import store from 'store2';
import isLoggedIn from '../../helpers/isLoggedIn';

import UCLogo160x83 from '../../assets/sysimg/uc-logo-bg-160x83.png';
import DefaultAvatar from '../../assets/sysimg/user.png';
import NotificationBell from '../../components/elements/NotificationBell';

import { ERR404, ERR404Header } from '../ERR404';
import { Notifications, NotificationsHeader, Notification } from '../Notifications';
import { Dashboard, DashboardHeader } from '../Dashboard';
import { Enrollment, EnrollmentHeader, EnrollmentSubHeader } from '../Enrollment';
import DeanRegistration from '../../components/enrollment/DeanRegistration';
import DeanSubjects from '../../components/enrollment/DeanSubjects';
import DeanPromissory from '../../components/enrollment/DeanPromissory';
import DeanAdjustments from '../../components/enrollment/DeanAdjustments';
import StudentEnrollmentTracker from '../../components/enrollment/StudentEnrollmentTracker';
import RegistrarRegistration from '../../components/enrollment/RegistrarRegistration';
import PaymentCheckCashier from '../../components/enrollment/PaymentCheckCashier';
import PaymentSetAccounts from '../../components/enrollment/PaymentSetAccounts';
import Schedules, { SchedulesHeader } from '../Schedules';
import SchedulesView, {SchedulesViewHeader } from '../Schedules/SchedulesView';
import StudyLoadStudent, { StudyLoadHeader } from '../StudyLoad/Student';
import StudyLoadStaff from '../StudyLoad/Staff';
import TeachersLoad, { TeachersLoadHeader } from '../TeachersLoad';
import ClassList, { ClassListHeader } from '../ClassList';
import Reports, { ReportsHeader } from '../Reports';
import AdminTools, { AdminToolsHeader } from '../AdminTools';
import Assessment, { AssessmentHeader } from '../Assessment';
import Egrade, { EgradeHeader } from '../Egrade';
import { Profile, ProfileHeader } from '../Profile';

import { Prospectus, ProspectusHeader } from '../Prospectus';
import {BehindSubject, BehindSubjectHeader} from '../Prospectus/BehindSubject';
//import { Prospectus2, ProspectusHeader2 } from '../Prospectus/Test.js';

import { userModulesPermission } from '../../helpers/configObjects';
import { getLoggedUserDetails } from '../../helpers/helper';
import {RequestSubjects, RequestSubjectHeader} from '../../components/enrollment/RequestSubjects';


class Layout extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            notifications: null, activateBurger: false, avatarPath: null
        }
    }
    componentDidMount() {
        if (isLoggedIn()) {
            const data = {
                id_number: getLoggedUserDetails("idnumber")
            };
            const headers = { 
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + store.get("token")
            };
            axios.post(process.env.REACT_APP_API_UC_NOTIFICATIONS, data, {headers})
            .then((result) => {
                const notifications = result.data.notifications;
                this.setState({ notifications: notifications });
            }); 
            if(getLoggedUserDetails("usertype") === "STUDENT") {
                this.setState({ 
                    avatarPath: getLoggedUserDetails("avatar") ? process.env.REACT_APP_PATH_STORAGE_IDPICTURES + getLoggedUserDetails("avatar") : ""
                });
            }     
        }
    }
    handleLogout = history => () => {
        //const { cookies } = this.props;
        //Local Storage
        store.remove('token');
        //store.remove('loggedIn');
        store.remove('loggeduser');
        //Cookies not implemented, Local Storage is used instead
        /*cookies.remove('idnumber', { path: '/' });
        cookies.remove('email', { path: '/' });
        cookies.remove('usertype', { path: '/' });
        cookies.remove('fullname', { path: '/' });
        cookies.remove('courseyear', { path: '/' });
        cookies.remove('coursecode', { path: '/' });
        cookies.remove('courseabbr', { path: '/' });
        cookies.remove('yearlevel', { path: '/' });
        cookies.remove('studenttype', { path: '/' }); */
        //cookies.remove('loggedIn', { path: '/' });
        
        history.push('/login');
    }
    readAllNotifications = history => () => {
        const data = {
            id_number: getLoggedUserDetails("idnumber"),
            notif_id: 0
        };
        const headers = { 
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + store.get("token")
        };
        axios.post(process.env.REACT_APP_API_UC_READ_NOTIFICATION, data, {headers})
        .then(response => {
            if(response.data.success) {
                alert("All Notifications are marked as read!");
            } 
        }, history.go(0));  
    }
    toggleBurger = () => {
        const { activateBurger } = this.state;
        this.setState({ activateBurger : !activateBurger });
    }
    render(){
        if (!isLoggedIn()) {
            return <Redirect to="/login" />;
        }
        const { history } = this.props;
        const { notifications, activateBurger, avatarPath } = this.state;
        const unreadNotifications = notifications ? notifications.filter(item => item.read === 0) : [];
        const currentUserType = getLoggedUserDetails("usertype");
        const notificationBell = (notifications) ? (
            <NotificationBell 
                items={notifications}
                route="/notifications"
                allRead={this.readAllNotifications(history)}
            />  
        ) : "";   
        const notifBadge = unreadNotifications.length > 0 ? (
            <span className="has-background-danger has-text-weight-bold has-text-white"
                  style={{ fontSize: "10px", borderRadius: "25%", padding: "3px", width: "30px", height: "25px", marginTop: "-5px" }}>
                {unreadNotifications.length}
            </span>
        ) : "";    
        const modulesNav = userModulesPermission(currentUserType).modules.map((link, i) => {
            return (
                <div key={i}>
                    <Link to={link.route} className="navbar-item is-hidden-tablet">  
                        <i className={link.icon}></i> {link.name}
                    </Link>
                    {
                        link.submodules ? link.submodules.map((sublink, index) => {
                            return (
                                <Link to={sublink.route} key={index} className="navbar-item is-hidden-tablet">                       
                                    &nbsp;&nbsp;&nbsp;<i className={sublink.icon}></i> {sublink.name}
                                </Link>                                                                
                            )
                        }) : "" 
                    }
                </div>
            );
        }); 
        const moduleSideNav = userModulesPermission(currentUserType).modules.map((link, i) => {
            return (
                <ul className="menu-list" key={i}>
                    <li>
                        <Link to={link.route ? link.route : "#"}>                        
                            <div className="is-sidebar-item">                            
                                <span className="icon is-small"><i className={link.icon}></i> </span>
                                <span className="is-sidebar-item-label" style={{ lineHeight: "20px" }}>{link.name} {link.name === "Notifications" ? notifBadge : ""}</span>  
                            </div>
                        </Link>                                                               
                    </li>
                    {
                        link.submodules ? link.submodules.map((sublink, index) => {
                            return (
                                <li key={index}>
                                    <Link to={sublink.route} >                        
                                        <div className="is-sidebar-subitem">                            
                                            <span className="icon is-small"><i className={sublink.icon}></i> </span>
                                            <span className="is-sidebar-subitem-label">{sublink.name}</span>  
                                        </div>
                                    </Link>                                                                
                                </li>
                            )
                        }) : ""                       
                    }
                </ul>
            );
        });
        
        return (
            <div className="is-fullheight default-page-body">
                <nav className="navbar has-shadow" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <Link to="/dashboard" className="navbar-item">
                            <img src={UCLogo160x83} alt="" />                        
                        </Link>
                        <Link to="/dashboard" className="navbar-item pl-0 pb-3 mt-0">
                            <h5 className="is-size-6 has-text-weight-semibold pt-0 mt-0">UNIVERSITY OF CEBU WEB PORTAL</h5>
                        </Link>                                     
                        <div role="button" className={"navbar-burger burger " + (activateBurger ? "is-active" : "")} aria-label="menu" 
                             aria-expanded="false"  data-target="navbarMenu" onClick={this.toggleBurger}>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </div>
                    </div>
                    
                    <div id="navbarMenu" className={"navbar-menu "  + (activateBurger ? "is-active" : "")}>
                        <div className="navbar-start">
                                            
                        </div>                    
                        <div className="navbar-end">                              
                            <div className="is-hidden-tablet buttons">
                                <Link to="/profile" className="m-2">   
                                    <figure className="image is-32x32">
                                        <img className="is-rounded" src={DefaultAvatar} alt="" style={{ width:"32px", height: "32px"}} />   
                                    </figure>
                                </Link>
                                <Link to="/profile" > 
                                    <div className="title is-6" >{getLoggedUserDetails("fullname")}</div>
                                    <p className="subtitle is-6 is-italic">{getLoggedUserDetails("idnumber").length >= 8 ? getLoggedUserDetails("idnumber") : ""} | {getLoggedUserDetails("courseyear")}</p>  
                                </Link>
                            </div>   

                            {modulesNav}

                            <div className="navbar-item is-hidden-tablet" onClick={this.handleLogout(history)}>
                                <i className="fas fa-door-open"></i> Logout
                            </div>                       
                            <div className="navbar-item is-hidden-mobile">
                                <div className="field is-grouped">
                                    <p className="control">
                                        <Link to="/profile" className="button is-info is-small">                                        
                                            <span className="icon">
                                                <i className="fas fa-user"></i>
                                            </span>
                                            <span>
                                                My Profile
                                            </span>
                                        </Link>
                                    </p>
                                    <p className="control">                                        
                                        <button className="button is-info is-small" onClick={this.handleLogout(history)}>
                                            <span className="icon">
                                                <i className="fas fa-door-open"></i>
                                            </span>
                                            Logout
                                        </button>
                                    </p>
                                </div>
                            </div>                                                    
                        </div>
                    </div>
                </nav> 
                <div className="is-inline-flex">
                    <section className="section is-paddingless is-sidebar is-hidden-mobile">
                        <div className="container is-marginless">                             
                            <div className="columns is-vcentered is-marginless is-sidebar-user">                                
                                <div className="column is-3 is-sidebar-user-avatar">
                                    <Link to="/profile" >   
                                        <figure className="image is-48x48">
                                            <img className="is-rounded" src={avatarPath ? avatarPath : DefaultAvatar} alt="" style={{ width:"48px", height: "48px"}} />   
                                        </figure>
                                    </Link>
                                </div>
                                <div className="column is-sidebar-user-info is-clipped">
                                    <Link to="/profile" > 
                                        <div className="title is-7" >{getLoggedUserDetails("fullname")}</div>
                                        <p className="subtitle is-6 is-italic">{getLoggedUserDetails("idnumber").length >= 8 ? getLoggedUserDetails("idnumber") : ""} | {getLoggedUserDetails("courseyear")}</p>  
                                    </Link>                                                                   
                                </div>                               
                            </div>                                        
                
                            <nav className="menu sidebar is-hidden-mobile pt-3">    
                                {moduleSideNav}                        
                            </nav>                        
                        </div>
                    </section>
                    <section className="section is-content is-paddingless">
                        <div className="container is-fluid is-paddingless is-marginless">
                            <div className="columns is-marginless">    
                                <div className="column"> 
                                    <div className="content-nav">
                                        <div className="is-pulled-left">
                                            <Switch>
                                                <Route path="/dashboard" component={DashboardHeader} />
                                                <Route path="/student/requestsubject" component={RequestSubjectHeader} />
                                                <Route path="/notifications" component={NotificationsHeader} />
                                                <Route path="/profile" component={ProfileHeader} />
                                                <Route path="/enrollment/:usertype/:subhead" component={EnrollmentSubHeader} />  
                                                <Route path="/enrollment" component={EnrollmentHeader} />
                                                <Route path="/schedules/viewall" component={SchedulesViewHeader} /> 
                                                <Route path="/schedules/department" component={SchedulesHeader} />
                                                <Route path="/staffstudyload" component={StudyLoadHeader} /> 
                                                <Route path="/studentstudyload" component={StudyLoadHeader} /> 
                                                <Route path="/reports" component={ReportsHeader} />        
                                                <Route path="/admintools" component={AdminToolsHeader} /> 
                                                <Route path="/classlist" component={ClassListHeader} />  
                                                <Route path="/assessment" component={AssessmentHeader} />          
                                                <Route path="/teachersload" component={TeachersLoadHeader} /> 
                                                <Route path="/prospectus" component={ProspectusHeader} /> 
                                                <Route path="/student/behind" component={BehindSubjectHeader} /> 
                                                <Route path="/egrade" component={EgradeHeader} />                              
                                                <Route component={ERR404Header} />
                                            </Switch>                                   
                                        </div>
                                        <div className="is-pulled-right">
                                             {notificationBell}                                                                             
                                        </div>  
                                    </div> 
                                    <div className="" >
                                        <Switch>
                                            <Route path="/dashboard" component={Dashboard} />
                                            <Route path="/notifications/:notifID" component={Notification} />
                                            <Route path="/notifications" component={Notifications} />
                                            <Route path="/profile" component={Profile} />
                                            <Route path="/enrollment/registrar/registration" component={RegistrarRegistration} />
                                            <Route path="/enrollment/registrar/tracker" component={StudentEnrollmentTracker} />
                                            <Route path="/enrollment/dean/registration" component={DeanRegistration} />
                                            <Route path="/enrollment/dean/subjects" component={DeanSubjects} /> 
                                            <Route path="/enrollment/dean/promissory" component={DeanPromissory} /> 
                                            <Route path="/enrollment/dean/adjustments" component={DeanAdjustments} /> 
                                            <Route path="/enrollment/dean/tracker" component={StudentEnrollmentTracker} />
                                            <Route path="/enrollment/accounting/setbalance" component={PaymentSetAccounts} />
                                            <Route path="/enrollment/accounting/tracker" component={StudentEnrollmentTracker} />
                                            <Route path="/enrollment/cashier/payment" component={PaymentCheckCashier} />
                                            <Route path="/enrollment/cashier/tracker" component={StudentEnrollmentTracker} />
                                            <Route path="/enrollment/edp/tracker" component={StudentEnrollmentTracker} />
                                            <Route path="/student/requestsubject" component={RequestSubjects} />
                                            <Route path="/enrollment" component={Enrollment} />
                                            <Route path="/schedules/department" component={Schedules} />
                                            <Route path="/schedules/viewall" component={SchedulesView} />   
                                            <Route path="/staffstudyload" component={StudyLoadStaff} /> 
                                            <Route path="/studentstudyload" component={StudyLoadStudent} />  
                                            <Route path="/admintools" component={AdminTools} />  
                                            <Route path="/reports" component={Reports} />       
                                            <Route path="/classlist" component={ClassList} />  
                                            <Route path="/assessment" component={Assessment} /> 
                                            <Route path="/teachersload" component={TeachersLoad} />
                                            <Route path="/prospectus" component={Prospectus} />
                                            <Route path="/student/behind" component={BehindSubject} /> 
                                            <Route path="/egrade" component={Egrade} />                                   
                                            <Route component={ERR404} />
                                        </Switch>                
                                    </div>   
                                </div>            
                            </div>
                        </div>
                    </section>   
                </div>
            </div>             
        );
    };
}

export default withCookies(Layout);