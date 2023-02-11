import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  makeStyles,

  IconButton,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
} from "@material-ui/core";
import { deepPurple, green, orange } from "@material-ui/core/colors";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import {useNavigate } from 'react-router-dom'

const useStyles = makeStyles({
  headingColor: {
    backgroundColor: deepPurple[400],
    color: "white",
    textAlign: "center",
    padding: "15px",
  },
  addStuColor: {
    backgroundColor: green[400],
    color: "white",
    textAlign: "center",
  },
  stuListColor: {
    backgroundColor: orange[400],
    color: "white",
    textAlign: "center",
  },

  tableHeadCell: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

const List = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const navigate =useNavigate()
  useEffect(() => {
    GetAllStudents();
  }, []);

  const GetAllStudents = async () => {
    try {
      const student = await axios.get("http://localhost:3001/students");
      setData(student.data);
    } catch (error) {
      console.log("Something is Wrong");
    }
  };

const handleDelete=async id=>{
  console.log(id);

  await axios.delete(`http://localhost:3001/students/${id}`)


  const newDelete=data.filter((item)=>{
    console.log(item.id);
    return item.id !==id



  })
  setData(newDelete)

}

 

  return (
    <>
      <Box className={classes.stuListColor} style={{ padding: "10px" }}>
        <Typography variant="h4">Student List</Typography>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#616161" }}>
              <TableCell align="center" className={classes.tableHeadCell}>
                No
              </TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>
                Name
              </TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>
                Email
              </TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((student, i) => {
              return (
                <TableRow key={i}>
                  <TableCell align="center">{i + 1}</TableCell>
                  <TableCell align="center">{student.name}</TableCell>
                  <TableCell align="center">{student.email}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="View">
                      <IconButton>
                        <VisibilityIcon color="primary" onClick={()=>navigate(`/view/${student.id}`)} />{" "}
                        

                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton>
                        {" "}
                        <ModeEditIcon color="primary" onClick={()=>navigate(`/update/${student.id}`)}/>{" "}
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton>
                        <DeleteIcon color="primary" onClick={()=>handleDelete(student.id)} />{" "}
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default List;
