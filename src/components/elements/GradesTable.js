import React, { Component, Fragment } from 'react';
//import { withRouter } from 'react-router-dom';
//import axios from 'axios';

import { convertTermToReadable } from '../../helpers/helper';

export default class GradesTable extends Component {
    state = {
        collapseGrade: null
    }
    componentDidMount = () => {
        const { studentGrades } = this.props;
        if(studentGrades && studentGrades.length > 0) { 
            let terms = studentGrades.map(grade => {
                return parseInt(grade.term, 10)
            });
            terms = [...new Set(terms)];
            let accordionLabel = {};
            for(let i = 0; i < terms.length; i++) {
                accordionLabel[i] = false;
            }
            this.setState({
                collapseGrade: accordionLabel
            })
        }
    }
    handleHeaderClick = e => {
        let prevCollapseGrade = this.state.collapseGrade;
        prevCollapseGrade[e] = !prevCollapseGrade[e]
        this.setState({
            collapseGrade: prevCollapseGrade
        });
    }
    render() {   
        const { studentGrades, college } = this.props;
        const { collapseGrade } = this.state;
        let terms = [];
        let loadGradeTable = "";
        if(studentGrades && studentGrades.length > 0) { 
            terms = studentGrades.map(grade => {
                return parseInt(grade.term, 10)
            });

            terms = [...new Set(terms)]
            terms = terms.sort((a, b) => b - a);

            //Check grade if SHS format 50 above
            let counter = 0;
            for(let j = 0; j < terms.length; j++) {
                const toCheckGrades = studentGrades.filter(grade => parseInt(grade.term, 10) === terms[j]);
                for(let i = 0; i < toCheckGrades.length; i++) {
                    if(/^[a-zA-Z]+$/.test(toCheckGrades[i].midterm_grade)) {}
                    else {
                        if(parseInt(toCheckGrades[i].midterm_grade, 10) > 50) counter++;
                    }
                    if(/^[a-zA-Z]+$/.test(toCheckGrades[i].final_grade)) {}
                    else {
                        if(parseInt(toCheckGrades[i].final_grade, 10) > 50) counter++;
                    }
                }
            }
            const isSHS = counter > 0 ? true : false;

            loadGradeTable = terms.map((term, index) => {
                const termGrades = studentGrades.filter(grade => parseInt(grade.term, 10) === term);
                const loadGrades = termGrades.map((grade, i) => {
                    let rowStyle = "";
                    let finalStyle = "";
                    let midterm = "";
                    let final = "";
                    let finalGrade = ""; // For SHS only
                    let loadFinalGrade = ""; // For SHS only
                    if(isSHS) {
                        if(/^[a-zA-Z]+$/.test(grade.midterm_grade) || /^[a-zA-Z]+$/.test(grade.final_grade)) {
                            midterm = grade.midterm_grade;
                            final = grade.final_grade;
                            if(midterm && final) finalGrade = grade.final_grade;
                            rowStyle = finalGrade ? "has-background-danger-light" : "";
                            finalStyle = "has-text-danger has-text-weight-bold";
                            loadFinalGrade = <td><span className="has-text-danger has-text-weight-bold">{finalGrade}</span></td>
                        }
                        else {
                            midterm = grade.midterm_grade ? parseFloat(grade.midterm_grade) : "";  // Q1
                            final = grade.final_grade ? parseFloat(grade.final_grade) : ""; // Q2
                            if(midterm && final) finalGrade = (midterm + final) / 2; // Final
                            rowStyle = finalGrade && finalGrade < 75 ? "has-background-danger-light" : "";
                            finalStyle = finalGrade && finalGrade < 75 ? "has-text-danger has-text-weight-bold" : "";
                            loadFinalGrade = <td><span className={finalStyle}>{finalGrade}</span></td>
                        }
                    }
                    else {
                        if(/^[a-zA-Z]+$/.test(grade.midterm_grade) || /^[a-zA-Z]+$/.test(grade.final_grade)) {
                            midterm = /^[a-zA-Z]+$/.test(grade.midterm_grade) ? grade.midterm_grade : grade.midterm_grade.trim().charAt(0) + "." + grade.midterm_grade.trim().charAt(1);                           
                            if(/^[a-zA-Z]+$/.test(grade.final_grade)) {
                                final = grade.final_grade;
                                rowStyle = final ? "has-background-danger-light" : "";
                                finalStyle = "has-text-danger has-text-weight-bold";
                            }
                            else {
                                final = grade.final_grade.trim().charAt(0) + "." + grade.final_grade.trim().charAt(1);
                                rowStyle = parseInt(grade.final_grade, 10) > 30  ? "has-background-danger-light" : "";
                                finalStyle = parseInt(grade.final_grade, 10) > 30  ? "has-text-danger has-text-weight-bold" : "";
                            }
                        }
                        else {
                            midterm = parseInt(grade.midterm_grade, 10) > 50 ? grade.midterm_grade : grade.midterm_grade.trim().charAt(0) + "." + grade.midterm_grade.trim().charAt(1);
                            final = parseInt(grade.final_grade, 10) > 50 ? grade.midterm_grade : grade.final_grade.trim().charAt(0) + "." + grade.final_grade.trim().charAt(1);
                            rowStyle = parseInt(grade.final_grade, 10) > 30  ? "has-background-danger-light" : "";
                            finalStyle = parseInt(grade.final_grade, 10) > 30  ? "has-text-danger has-text-weight-bold" : "";
                        }
                    }
                    return (
                        <tr key={i} className={rowStyle}>
                            <td>{grade.subject_name}</td>
                            <td>{grade.descriptive}</td>
                            <td>{grade.subject_type === "L" ? "LAB" : "LEC"}</td>
                            <td>{grade.units}</td>
                            <td><span>{midterm}</span></td>
                            <td><span className={finalStyle}>{final}</span></td>
                            {loadFinalGrade}
                        </tr>
                    )
                });
                return (
                    <article className="message is-light m-0 pt-0" key={index} style={{ border: "solid 1px white" }}>
                        <div className="message-header pt-2 pb-2 is-clickable" onClick={() => this.handleHeaderClick(index)}>
                            <p>{convertTermToReadable(term.toString())}</p>     
                            <i className={"far " + (collapseGrade && collapseGrade[index] ? "fa-minus-square" : "fa-plus-square")}></i>              
                        </div>
                        <div className="message-body p-0">
                            {
                                collapseGrade && collapseGrade[index] ? (
                                    <div className="table-container">
                                        <table className="table is-striped is-fullwidth is-size-7">
                                            <thead>
                                                <tr>
                                                    <th>Subject</th>
                                                    <th>Description</th>
                                                    <th>Type</th>
                                                    <th>Units</th>
                                                    <th>{isSHS ? "1st Qtr" : "Midterm"}</th>
                                                    <th>{isSHS ? "2nd Qtr" : "Finals"}</th>
                                                    {isSHS ? <th>Final</th> : ""}
                                                </tr>
                                            </thead>
                                            <tfoot>
                                                <tr>                                 
                                                    <th></th>
                                                    <th></th>
                                                    <th></th>
                                                    <th></th>
                                                    <th></th>
                                                    <th></th>
                                                    {isSHS ? <th></th> : "" }
                                                </tr>
                                            </tfoot>
                                            <tbody>
                                                {loadGrades}                                                                                         
                                            </tbody>
                                        </table>    
                                    </div>  
                                ) : ""
                            }                                  
                        </div>
                    </article> 
                );
            });
        }
        return(  
            <Fragment>    
                {loadGradeTable}              
            </Fragment> 
        )
    }
}