import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import "./macrotable.css";
import data from "../data/macroTableDate";

const MacroAnalysisTable = () => {
  const [isLocked, setIsLocked] = useState(true);
  const [selectedCells, setSelectedCells] = useState({});

  const commonCellStyles = {
    border: "1px solid #ccc",
    padding: "8px",
  };

  const headerCellStyles = {
    backgroundColor: "#aab7cf",
    color: "white",
    fontSize: "1.2rem",
    ...commonCellStyles,
  };

  const handleCellClick = (rowIndex, columnKey) => {
    if (isLocked) return;

    setSelectedCells((prev) => {
      const newSelectedCells = { ...prev };
      if (!newSelectedCells[rowIndex]) newSelectedCells[rowIndex] = {};

      if (newSelectedCells[rowIndex][columnKey] === "yellow") {
        newSelectedCells[rowIndex][columnKey] = "white";
      } else {
        Object.keys(newSelectedCells[rowIndex]).forEach(
          (key) => (newSelectedCells[rowIndex][key] = "white")
        );
        newSelectedCells[rowIndex][columnKey] = "yellow";
      }

      return newSelectedCells;
    });
  };

  return (
    <div className="container-macrotable">
      <div className="table-container">
        <Button
          sx={{
            backgroundColor: "#4154f1",
            color: "white",
            fontSize: "1.2rem",
            marginBottom: "15px",
          }}
          onClick={() => setIsLocked(!isLocked)}
        >
          {isLocked ? "Unlock" : "Lock"}
        </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {[
                  "Phase",
                  "Wave 1 (Rise Phase)",
                  "Wave 3 (Development Phase)",
                  "Wave 5 (Decline Phase)",
                  "Recession Phase",
                ].map((header, index) => (
                  <TableCell key={index} sx={headerCellStyles}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell sx={headerCellStyles}>{row.phase}</TableCell>
                  {["wave1", "wave3", "wave5", "recession"].map((columnKey) => (
                    <TableCell
                      key={columnKey}
                      sx={{
                        backgroundColor:
                          selectedCells[rowIndex]?.[columnKey] || "white",
                        ...commonCellStyles,
                      }}
                      onClick={() => handleCellClick(rowIndex, columnKey)}
                    >
                      {row[columnKey]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default MacroAnalysisTable;
