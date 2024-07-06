import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  TablePagination,
  IconButton,
} from "@mui/material";
import {
  getTrades,
  addTrade,
  deleteTrade,
} from "../firebase/firebaseOperations";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

const convertTimestampToDate = (timestamp) => {
  if (timestamp && timestamp.seconds) {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString("en-US");
  }
  return "";
};

function TradingTable() {
  const [rows, setRows] = useState([]);
  const [editRowId, setEditRowId] = useState(null);
  const [filters, setFilters] = useState({});
  const [newRow, setNewRow] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trades = await getTrades();
        console.log("Fetched trades from Firestore:", trades);
        setRows(trades);
      } catch (error) {
        console.error("Error fetching trades:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("Rows state updated:", rows);
  }, [rows]);

  const handleAddRow = async () => {
    try {
      await addTrade(newRow);
      setRows([...rows, { ...newRow, id: rows.length + 1 }]);
      setNewRow({});
    } catch (error) {
      console.error("Error adding trade:", error);
    }
  };

  const handleInputChange = (event, key) => {
    setNewRow({ ...newRow, [key]: event.target.value });
  };

  const handleFilterChange = (event, key) => {
    setFilters({ ...filters, [key]: event.target.value });
  };

  const startEdit = (row) => {
    setEditRowId(row.id);
    setNewRow(row);
  };

  const saveEdit = () => {
    const updatedRows = rows.map((row) =>
      row.id === editRowId ? { ...row, ...newRow } : row
    );
    setRows(updatedRows);
    setEditRowId(null);
    setNewRow({});
  };

  const cancelEdit = () => {
    setEditRowId(null);
    setNewRow({});
  };

  const handleDelete = async (id) => {
    try {
      await deleteTrade(id);
      setRows(rows.filter((row) => row.id !== id));
    } catch (error) {
      console.error("Error deleting trade:", error);
    }
  };

  const columns = [
    "company",
    "ticker",
    "result",
    "volume",
    "strategy",
    "entryDate",
    "exitDate",
    "goalPrice",
    "exitPrice",
    "entryPrice",
    "TradeStatus",
  ];

  return (
    <Grid container style={{ padding: "20px", marginTop: "200px" }}>
      <Grid
        item
        xs={12}
        lg={10}
        style={{ margin: "auto", maxWidth: 1300, marginLeft: "350px" }}
      >
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="space-between"
          marginBottom={2}
        >
          {columns.map((key) => (
            <TextField
              key={key}
              label={key.replace(/([A-Z])/g, " $1").trim()}
              value={newRow[key] || ""}
              onChange={(e) => handleInputChange(e, key)}
              variant="outlined"
              margin="dense"
              style={{ margin: "5px", width: "calc(20% - 10px)" }}
            />
          ))}
          <Button
            variant="contained"
            color="primary"
            onClick={editRowId ? saveEdit : handleAddRow}
            style={{ height: "40px", marginTop: "15px" }}
          >
            {editRowId ? "Save" : "Add Row"}
          </Button>
          {editRowId && (
            <Button
              variant="contained"
              onClick={cancelEdit}
              style={{ height: "40px", marginLeft: "10px", marginTop: "15px" }}
            >
              Cancel
            </Button>
          )}
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "#aab7cf",
                  "& .MuiTableCell-root": {
                    color: "white",
                    fontWeight: "bold",
                  },
                }}
              >
                {columns.map((key) => (
                  <TableCell
                    key={key}
                    style={{ border: "1px solid black", padding: "8px" }}
                  >
                    <TextField
                      fullWidth
                      variant="standard"
                      value={filters[key] || ""}
                      onChange={(e) => handleFilterChange(e, key)}
                      placeholder={key.replace(/([A-Z])/g, " $1").trim()}
                      InputProps={{ disableUnderline: true }}
                    />
                  </TableCell>
                ))}
                <TableCell
                  style={{ border: "1px solid black", padding: "8px" }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .filter((row) =>
                  Object.keys(filters).every((key) =>
                    (row[key] || "")
                      .toString()
                      .toLowerCase()
                      .includes(filters[key].toLowerCase())
                  )
                )
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.id}>
                    {columns.map((key) => (
                      <TableCell
                        key={key}
                        style={{ border: "1px solid black", padding: "8px" }}
                      >
                        {editRowId === row.id ? (
                          <TextField
                            value={newRow[key]}
                            onChange={(e) => handleInputChange(e, key)}
                            size="small"
                          />
                        ) : typeof row[key] === "object" && row[key].seconds ? (
                          convertTimestampToDate(row[key])
                        ) : (
                          row[key]
                        )}
                      </TableCell>
                    ))}
                    <TableCell
                      style={{ border: "1px solid black", padding: "8px" }}
                    >
                      {editRowId === row.id ? (
                        <>
                          <IconButton onClick={saveEdit}>
                            <SaveIcon />
                          </IconButton>
                          <IconButton onClick={cancelEdit}>
                            <DeleteIcon />
                          </IconButton>
                        </>
                      ) : (
                        <>
                          <IconButton onClick={() => startEdit(row)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => handleDelete(row.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) =>
            setRowsPerPage(parseInt(event.target.value, 10))
          }
          rowsPerPageOptions={[10, 25, 50, 100]}
        />
      </Grid>
    </Grid>
  );
}

export default TradingTable;
