import React, { Component } from 'react';
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default class ExportToExcel extends Component {


  render() {
    return (
        <div>
          <ExcelFile element={<button>Export to Excel</button>}>
                <ExcelSheet data={this.props.data} name="Inactive Business Reports">
                    <ExcelColumn label="Name" value="fullName"/>
                    <ExcelColumn label="Business name" value="businessname"/>
                    <ExcelColumn label="Email address" value="email"/>
                    <ExcelColumn label="Url" value="url"/>
                </ExcelSheet>
            </ExcelFile>  
        </div>
    );
  }
}
