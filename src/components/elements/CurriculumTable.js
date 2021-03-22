import React, { Component,Fragment } from 'react';
import { Table, Button, Popconfirm, Row, Col, Icon, Upload } from 'antd';
import { EditableFormRow, EditableCell } from '../../helpers/editableTable';
export default class CurriculumTable extends Component {
  render() {
    const{rows,cols, components, columns,handleAdd,handleSubmit} = this.props;
    return (
      <Fragment>
          <Table
              components={components}
              rowClassName={() => "editable-row"}
              dataSource={rows}
              columns={columns}
            />
            <div className="columns">
              <div className="column is-one-quarter mt-3">
                  <buton className="button is-small is-info" onClick={handleAdd}>Add Subject</buton>
                  <buton className="button is-small is-primary ml-2" onClick={handleSubmit}>Submit</buton>
              </div>
            </div>
            
      </Fragment>
    
    );
  }
}