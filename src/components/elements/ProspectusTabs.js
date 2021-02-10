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
                        totalBehind > 0 &&
                        <span className="tag is-danger ml-3">{totalBehind}</span>
                    }
                </button>
                <button name="approved" className={"button " + (selectedTab === '2' ? "is-info is-selected" : "")} onClick={() => this.handleOnClickTab('2', second)}>
                    <span className="icon is-small">
                        <i className="fas fa-book is-success"></i>
                    </span>
                    <span>Second Year</span>
                    {
                        totalBehind > 0 &&
                        <span className="tag is-danger ml-3">{totalBehind}</span>
                    }
                </button>
                <button name="approved" className={"button "+(selectedTab === '3'? "is-info is-selected":"")} onClick={() => this.handleOnClickTab('3', third)}>
                    <span className="icon is-small">
                        <i className="fas fa-book"></i>
                    </span>
                    <span>Third Year</span>
                    {
                        totalBehind > 0 &&
                        <span className="tag is-danger ml-3">{totalBehind}</span>
                    }
                </button>
                <button name="approved" className={"button "+(selectedTab === '4'? "is-info is-selected":"")} onClick={() => this.handleOnClickTab('4', fourth)}>
                    <span className="icon is-small">
                        <i className="fas fa-book"></i>
                    </span>
                    <span>Fourth Year</span>
                    {
                        totalBehind > 0 &&
                        <span className="tag is-danger ml-3">{totalBehind}</span>
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
