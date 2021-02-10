import React, { Component, Fragment } from 'react';

export default class PaymentChannels extends Component {

    render() {
        const currentCampus = process.env.REACT_APP_CAMPUS;
        const { courseCode } = this.props;
        const loadBaniladCL = (
            <table className="table is-bordered is-striped is-narrow is-hoverable m-2">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Account #</th>
                    </tr>
                </thead>     
                <tbody>
                    <tr>
                        <th>Metrobank</th>
                        <td>246-3-24655536-3</td>                                  
                    </tr>
                    <tr>
                        <th>BDO</th>
                        <td>001858022960</td>                                   
                    </tr>
                    <tr>
                        <th>Aspac Bank</th>
                        <td>13-0201-0004-6</td>                                   
                    </tr>
                    <tr>
                        <th>Cebuana Lhuillier</th>
                        <td>Specify University of Cebu Banilad as Receiver</td>                                    
                    </tr> 
                    <tr>
                        <td colSpan="2">Over-the-counter payment to the School, once community quarantine protocols are lifted</td>                                
                    </tr> 
                    <tr>
                        <td colSpan="2">
                            <strong>If Bills payment,  Pay Biller : University of Cebu Banilad, Subscriber name: Name of Student, Subscriber No: ID Number</strong>
                        </td>                                
                    </tr>                                                                                          
                </tbody>
            </table>
        );
        const loadBaniladSOM = (
            <table className="table is-bordered is-striped is-narrow is-hoverable m-2">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Account #</th>
                    </tr>
                </thead>     
                <tbody>
                    <tr>
                        <th>BDO</th>
                        <td>001851276716</td>                                  
                    </tr>
                    <tr>
                        <th>UNIONBANK</th>
                        <td>000-2600-37229</td>                                   
                    </tr> 
                    <tr>
                        <td colSpan="2">
                            <strong>Account name: University of Cebu College of Medicine Foundation, Inc.</strong>
                        </td>                                
                    </tr>                    
                    <tr>
                        <td colSpan="2">Over-the-counter payment to the School, once community quarantine protocols are lifted</td>                                
                    </tr>                                                                                                              
                </tbody>
            </table>
        );        
        const loadUCLM = (
            <table className="table is-bordered is-striped is-narrow is-hoverable m-2">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Account #</th>
                    </tr>
                </thead>     
                <tbody>
                    <tr>
                        <th>ASPAC Bank</th>
                        <td>01-0201-00011-4</td>                                  
                    </tr>
                    <tr>
                        <th>Bank of Commerce</th>
                        <td>34-000-016-103</td>                                   
                    </tr>
                    <tr>
                        <th>Landbank</th>
                        <td>0141-4806-18 (for Senior High School students)</td>                                   
                    </tr>
                    <tr>
                        <th>Landbank</th>
                        <td>0141-4662-67 (for Junior High School students)</td>                                    
                    </tr> 
                    <tr>
                        <th>Metrobank</th>
                        <td>094-3-01147805-0</td>                                    
                    </tr> 
                    <tr>
                        <th>Unionbank</th>
                        <td>0005-7001-2910</td>                                    
                    </tr> 
                    <tr>
                        <th>Cebuana Lhuillier, HLhuillier, and Western Union</th>
                        <td>Specify University of Cebu Lapu-Lapu Madaue as Receiver</td>                                    
                    </tr>
                    <tr>
                        <td colSpan="2">
                            Over-the-counter payment to the School, once community quarantine protocols are lifted. <br />
                        </td>                                
                    </tr>   
                    <tr>
                        <td colSpan="2">
                            <strong>If Bills payment,  Pay Biller : University of Cebu Lapulapu and Mandaue, Subscriber name: Name of Student, Subscriber No: ID Number</strong>
                        </td>                                
                    </tr>                                                                                         
                </tbody>
            </table>
        );
        let loadPayChannel = "";
        if(currentCampus === "Banilad") {
            if(courseCode === "PD") loadPayChannel = loadBaniladSOM;
            else loadPayChannel = loadBaniladCL;
        }
        else loadPayChannel = loadUCLM;
        return(
            <Fragment>
            {loadPayChannel}
        </Fragment>
        )
    }
}