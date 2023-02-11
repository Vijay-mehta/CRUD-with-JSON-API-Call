import React ,{useEffect, useState}from 'react'
import {useParams,useNavigate} from 'react-router-dom'
import axios from 'axios'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Box,Button,Typography} from '@material-ui/core'


const View = () => {
const [ViewData,setViewData] =useState([])
  const   {id} =useParams()
  const navigate =useNavigate()
  console.log(id);
useEffect(()=>{
    student()
},[])

  const student =async()=>{
    try{

        const data = await axios.get(`http://localhost:3001/students/${id}`);

        setViewData(data.data);
    } catch(error){
console.log("error");
    }

  }
 
  return (
   <>
    <Box  style={{ padding: "10px",textAlign:"center" }}>
        <Typography variant="h4">Student Detail</Typography>
      </Box>
      <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>So</TableCell>
            <TableCell >Name</TableCell>
            <TableCell >Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

            <TableRow
        
            >
            
              <TableCell>{ViewData.id}</TableCell>
              <TableCell >{ViewData.name}</TableCell>
              <TableCell>{ViewData.email}</TableCell>
            </TableRow>
            </TableBody>
     
      </Table>
    </TableContainer>
    <Box  style={{ padding: "10px",textAlign:"center" }}>
        <Button  variant="contained" onClick={()=>navigate(-1)}>GO TO BACK</Button>
      </Box>
   </>
  )
}

export default View
