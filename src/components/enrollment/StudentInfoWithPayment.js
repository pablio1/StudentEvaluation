import React, { Component, Fragment } from 'react';
import DefaultAvatar from '../../assets/sysimg/user.png';
import SpinnerGif from '../../assets/sysimg/spinner.gif'
import { formatMoney } from '../../helpers/helper';

export default class StudentInfoWithPayment extends Component {

    render() {
        const { studentInfo, attachments, neededPayment } = this.props;
        const classificationLabels = { O : "OLD STUDENT", H : "NEW STUDENT", T: "TRANSFEREE", R: "RETURNEE", S: "SHIFTEE" };
        let idPicture = studentInfo && studentInfo.attachments.length > 0 ? studentInfo.attachments.filter(document => document.type === "2x2 ID Picture") : "";
        idPicture = idPicture  ? process.env.REACT_APP_PATH_STORAGE_IDPICTURES + idPicture[0].filename : "";
        let paymentProofPath = process.env.REACT_APP_PATH_STORAGE_PAYMENTS;
        if(attachments.length > 0) {
            const studentPaymentObj = attachments.filter(file => file.type === "Payment");            
            if(studentPaymentObj[0].filename) paymentProofPath += studentPaymentObj[0].filename;
            else paymentProofPath = "https://bulma.io/images/placeholders/256x256.png";
        }
        else paymentProofPath = "https://bulma.io/images/placeholders/256x256.png";

        return studentInfo ? (
            <Fragment>
                <article className="message is-link m-0 pt-0">
                    <div className="message-header pt-2 pb-2">
                        <p>Student Profile</p>                                                  
                    </div>
                    <div className="message-body p-0">
                        <div className="table-container mb-0">
                            <table className="table is-striped is-bordered is-hoverable">                                        
                                <tbody>
                                    <tr>
                                        <td rowSpan="4" className="is-narrow pt-3">
                                            <figure className="image is-128x128">
                                                <img src={idPicture ? idPicture : DefaultAvatar} alt=""  style={{ width:"128px", height: "128px"}} />
                                            </figure>
                                        </td>
                                        <th className="is-narrow">First Name:</th>
                                        <td>{studentInfo.first_name}</td>
                                        <th className="is-narrow">Year Level:</th>
                                        <td>{studentInfo.year_level + (studentInfo.assigned_section ? " (" + studentInfo.assigned_section + ") " : "")} - {studentInfo.mdn}</td>
                                    </tr>
                                    <tr>   
                                        <th className="is-narrow">Middle Name:</th>
                                        <td>{studentInfo.middle_name}</td>  
                                        <th className="is-narrow">Classification:</th>
                                        <td className="">{classificationLabels[studentInfo.classification]}</td>                                              
                                    </tr>
                                    <tr>
                                        <th className="is-narrow">Last Name:</th>
                                        <td>{studentInfo.last_name}</td>    
                                        <th className="is-narrow">College</th> 
                                        <td>{studentInfo.college}</td>                                          
                                    </tr>
                                    <tr>
                                        <th className="is-narrow">Name Suffix:</th>
                                        <td>{studentInfo.suffix}</td>    
                                        <th className="is-narrow">Course:</th>
                                        <td>{studentInfo.course}</td>                                            
                                    </tr>
                                    <tr>
                                        <td className="has-text-centered has-text-weight-bold">{studentInfo.stud_id}</td>
                                        <th className="is-narrow has-text-className=">Verified Email:</th>
                                        <td colSpan="2">{studentInfo.email}</td>
                                        <td></td>                                       
                                    </tr>                                                           
                                </tbody>
                            </table>    
                        </div>
                        <div className="table-container">
                            <table className="table is-striped is-fullwidth is-narrow is-bordered is-hoverable">                                        
                                <tbody>                                   
                                    <tr>                                                        
                                        <th className="is-narrow">Mobile #:</th>
                                        <td>{studentInfo.mobile}</td>
                                        <th className="is-narrow">Landline #:</th>
                                        <td>{studentInfo.landline}</td>
                                        <th className="is-narrow">Facebook:</th>
                                        <td>{studentInfo.facebook}</td>
                                    </tr> 
                                    <tr>                                                        
                                        <th className="is-narrow">Old Accounts</th>
                                        <td className="is-narrow">{neededPayment ? formatMoney(parseInt(neededPayment, 10) - 500) : "0.00"}</td>
                                        <th className="is-narrow">Enrollment Fee</th>
                                        <td className="is-narrow">500.00</td>
                                        <th className="is-narrow">Total Enrollment Fee</th>
                                        <td><strong>{neededPayment ? formatMoney(neededPayment) : "500.00"}</strong></td>
                                    </tr>                                                         
                                </tbody>
                            </table>    
                        </div>                                
                    </div>
                </article>  
                <div className="columns">
                    <div className="column">
                        <figure className="image">
                            <img src={paymentProofPath} alt="" />
                        </figure> 
                    </div>
                </div>            
            </Fragment>
        ):(
            <div className="columns is-vcentered">
                <div className="column is-center">
                    <figure className="image is-128x128">
                        <img src={SpinnerGif} alt="" />
                    </figure>
                </div>
            </div>   
        );
    };


}