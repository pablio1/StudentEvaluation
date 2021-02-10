import React, { Component } from 'react';
import { Fragment } from 'react';

export default class componentName extends Component {
  render() {
      const{subjects} = this.props;

      var loadSubjects = subjects? subjects.map((subj, index) => { //ap((sub, index) => {
          return(
              <tr key={index}>
                  <td>{subj.subject_name}</td>
                  <td>{subj.description}</td>
              </tr>
          )
      }) : "";

    return (
      <Fragment>
          <table className="table is-fullwidth">
              <thead>
                  <tr>
                      <td>Subject</td>
                      <th>Description</th>
                  </tr>
              </thead>
              <tbody>
                    {loadSubjects ? loadSubjects:
                        <tr>
                            <td></td><td></td>
                        </tr>
                    }
              </tbody>
          </table>
      </Fragment>
    );
  }
}
