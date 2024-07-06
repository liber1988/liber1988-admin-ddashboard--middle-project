import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./industryPerformace.css";
import { data } from "../data/industryDataTable";

const CustomTableCell = styled(TableCell)(({ theme }) => ({
  border: "1px solid black",
}));

const cellStyles = {
  "Much Better Than Market": { backgroundColor: "#c6efce" },
  "Better Than Market": { backgroundColor: "#ebf1de" },
  "Worse Than Market": { backgroundColor: "#ffc7ce" },
  "Much Worse Than Market": { backgroundColor: "#ffeb9c" },
};

const firstColumnStyle = {
  backgroundColor: "#aab7cf",
  fontWeight: "bold",
  color: "white",
};

const IndustryPerformance = () => {
  return (
    <div className="industry-performance">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <CustomTableCell className="table-header">
                Category
              </CustomTableCell>
              <CustomTableCell className="table-header">Q1</CustomTableCell>
              <CustomTableCell className="table-header">Q2</CustomTableCell>
              <CustomTableCell className="table-header">Q3</CustomTableCell>
              <CustomTableCell className="table-header">Q4</CustomTableCell>
              <CustomTableCell className="table-header">Q5</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <CustomTableCell style={firstColumnStyle}>
                  {row.category}
                </CustomTableCell>
                <CustomTableCell style={cellStyles[row.q1]}>
                  {row.q1}
                </CustomTableCell>
                <CustomTableCell style={cellStyles[row.q2]}>
                  {row.q2}
                </CustomTableCell>
                <CustomTableCell style={cellStyles[row.q3]}>
                  {row.q3}
                </CustomTableCell>
                <CustomTableCell style={cellStyles[row.q4]}>
                  {row.q4}
                </CustomTableCell>
                <CustomTableCell style={cellStyles[row.q5]}>
                  {row.q5}
                </CustomTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default IndustryPerformance;
