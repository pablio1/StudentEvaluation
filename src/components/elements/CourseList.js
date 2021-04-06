import React, { Component,Fragment } from 'react';

export default class CourseList extends Component {
  render() {
    const {subjects, departments, courses,schoolYear} = this.props;

    var loadCourseList = courses ? courses.map((course, index)=>{
		var loadSubjects = subjects.filter().map((subject, i)=>{
			
		});
    }) : "";
    return (
      <Fragment>
          <div className="columns is-flex-wrap-wrap">
            <div className="column is-one-fifth">
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">
                            Bachelor of Science in Information Technology (BSIT)
                        </p>
                    </header>
                    <footer class="card-footer">
                        <a href="#" class="card-footer-item is-small">View</a>
                        <a href="#" class="card-footer-item is-small">Delete</a>
                    </footer>
                </div>
            </div>
        </div>
      </Fragment>
    );
  }
}
