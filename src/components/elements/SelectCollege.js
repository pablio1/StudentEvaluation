import React, { Component } from "react";
import SpinnerGif from '../../assets/sysimg/spinner.gif'
import axios from 'axios';
import store from 'store2';


export default class SelectCollege extends Component {
    state = {
        colleges: null
    }
    componentDidMount = () => {
        const data = {
            department: "cl"
        };
        const headers = { 
            'Access-Control-Allow-Origin': '*',
        };
        axios.post(process.env.REACT_APP_API_UC_COLLEGES, data, {headers})
        .then(response => {
            this.setState({ colleges: response.data.departments });      
        }).catch(error => {
            console.log(error);
        });
    }
    handleOnChangeInput = e => {
        this.props.handleOnChangeInput(e);
    }
    
    render(){
        const { colleges } = this.state; 
        const { value, required, fieldname, name } = this.props; 
        const SpinnerIcon = <img src={SpinnerGif} alt="" width="30px" height="30px" />;  
        const collegesOptions = colleges ? colleges.map((college, i) => {
            return <option key={i} value={college.dept_abbr}>{college.dept_name}</option>
        }) : "";

        return(
            <div className="control is-expanded has-icons-left">
                <span className="select is-fullwidth">
                    <select name={name} value={value} 
                            onChange={this.handleOnChangeInput} required={required} data-fieldname={fieldname}>
                        <option value="">Select College</option>
                        {collegesOptions}
                    </select>
                </span>
                <span className="icon is-small is-left">
                {collegesOptions ? <i className="fas fa-university"></i> : SpinnerIcon}
                </span>
            </div>
        );
    }
}