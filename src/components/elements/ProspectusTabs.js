import React, { Component } from 'react';
import { convertTabToYear, getLoggedUserDetails } from '../../helpers/helper';
export default class ProspectusTabs extends Component {
    state = {
        selectedTab: null
    }
    componentDidMount = () => {
        this.setState({selectedTab: getLoggedUserDetails("yearlevel")});
    }
    handleOnClickTab = (tab, value) => {
        const{selectedTab} = this.state;
        this.setState({
            selectedTab : tab
        })
        this.props.handleOnClickTab(tab, value);
        console.log("checkTab",selectedTab);
    }
    getTotalBehind = (yearlevel) =>{
        const {subjects, grades} = this.props;
        var countSubject = 0;
        var countGrade = 0;
        //var loadTest = subjects ? subjects.filter(filt => filt.year_level == yearlevel && filt.subject_type != 'L'):"";
        var loadSubject = subjects ? subjects.filter(filt => filt.year_level == yearlevel && filt.subject_type != 'L').map((sub, index) =>{
            countSubject++;
             var loadGrade = grades? grades.filter(fil => fil.internal_code == sub.internal_code).map((grade, key)=>{
                if(grade.final_grade < 3)
                countGrade++;
            }) :""; 
        }) : "";
        //var getValue = countSubject - countGrade;
        //console.log("Load Test", loadTest);
        return Math.abs(countSubject-countGrade);
    }
  render() {
    const {first, second, third, fourth, all, totalBehind } = this.props;
    const {selectedTab} = this.state;
    return (
      <>
        
            <div className="buttons has-addons is-centered">                
                <button name="pending" className={"button " + (selectedTab === '1' ? "is-info is-selected" : "")} onClick={() => this.handleOnClickTab('1', first)}>
                    <span className="icon is-small">
                        <i className="fas fa-book is-success"></i>
                    </span>
                    <span>First Year</span>
                    {
                        (this.getTotalBehind(1) > 0 && getLoggedUserDetails("yearlevel") > 1) ? 
                        (<span className="tag is-danger ml-3">{this.getTotalBehind(1)}</span>) : ""
                    }
                </button>
                <button name="approved" className={"button " + (selectedTab === '2' ? "is-info is-selected" : "")} onClick={() => this.handleOnClickTab('2', second)}>
                    <span className="icon is-small">
                        <i className="fas fa-book is-success"></i>
                    </span>
                    <span>Second Year</span>
                    {
                        (this.getTotalBehind(2) > 0 && getLoggedUserDetails("yearlevel") > 2) ? 
                        (<span className="tag is-danger ml-3">{this.getTotalBehind(2)}</span>) : ""
                    }
                </button>
                <button name="approved" className={"button "+(selectedTab === '3'? "is-info is-selected":"")} onClick={() => this.handleOnClickTab('3', third)}>
                    <span className="icon is-small">
                        <i className="fas fa-book"></i>
                    </span>
                    <span>Third Year</span>
                    {
                        (this.getTotalBehind(3) > 0 && getLoggedUserDetails("yearlevel") > 3) ? 
                        (<span className="tag is-danger ml-3">{this.getTotalBehind(3)}</span>) : ""
                    }
                </button>
                <button name="approved" className={"button "+(selectedTab === '4'? "is-info is-selected":"")} onClick={() => this.handleOnClickTab('4', fourth)}>
                    <span className="icon is-small">
                        <i className="fas fa-book"></i>
                    </span>
                    <span>Fourth Year</span>
                    {
                        (this.getTotalBehind(4) > 0 && getLoggedUserDetails("yearlevel") > 4) ? 
                        (<span className="tag is-danger ml-3">{this.getTotalBehind(4)}</span>) : ""
                    }
                </button>
                <button name="approved" className={"button "+(selectedTab === "all"? "is-info is-selected":"")} onClick={() => this.handleOnClickTab("all", all)}>
                    <span className="icon is-small">
                        <i className="fas fa-book"></i>
                    </span>
                    <span>View All</span>
                </button>
                <button name="approved" className="button ml-5">
                    <span className="icon is-small">
                        <i className="fas fa-print"></i>
                    </span>
                    <span>Print</span>
                </button>
            </div>  
      </>
    );
  }
}
