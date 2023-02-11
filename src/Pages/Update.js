import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {useParams,useNavigate} from 'react-router-dom'
import TextField from '@mui/material/TextField';
import {Button} from '@material-ui/core';
import {
  Typography,

} from "@material-ui/core";
import axios from 'axios';


const Update = () => {
  const navigate =useNavigate()
  const [student, setStudent] = useState({
    name: "",
    email: ""
   });


  const {id} =useParams()
  console.log(id);
  useEffect(()=>{
    const getStudent=async()=>{
      try{
  const data =await axios.get(`http://localhost:3001/students/${id}`)
  setStudent(data.data)
      }catch(error){
  console.log("something want to wrong");
      }
  
    }
    getStudent()
  },[id])



  
  
  const handlSubmit=async(e)=>{
    e.preventDefault()

try{
  
await axios.put(`http://localhost:3001/students/${id}`,student)

navigate('/')
}catch(error){
console.log("someting want wrong");
}
  }

  function onTextFieldChange(e) {
    setStudent({
     ...student,
     [e.target.name]: e.target.value
    })
   }

  return (
    <div>
      <Box style={{textAlign:"center"}}>
        <Typography variant="h4">React CRUD with API Call</Typography>
      </Box>
      <form onSubmit={handlSubmit}>
     <Box style={{margin:"40px 400px"}} >
      <Grid container >
        <Grid item xs={4} >
        <TextField id="outlined-basic" name="name" disabled value={id} variant="outlined" fullWidth />

        </Grid>
        <Grid item xs={8} >
        <TextField id="nane" name="name"  value={student.name} variant="outlined" fullWidth onChange={e => onTextFieldChange(e)}/>

        </Grid>
        
      
   
      </Grid>
      <Grid container spacing={2} style={{paddingTop:"20px"}}>
        <Grid item xs={12}>
        <TextField id="outlined-basic"  name="email" value={student.email} variant="outlined" fullWidth onChange={e => onTextFieldChange(e)}/>

        </Grid>
      
        
      
   
      </Grid>
     

    </Box>
    <Box  style={{ padding: "10px",textAlign:"center" }}>
      <Button  variant="contained" type='submit' >Update</Button>
      </Box>
    </form>
    <Box  style={{ padding: "10px",textAlign:"center" }}>
        <Button  variant="contained" onClick={()=>navigate(-1)}>GO TO BACK</Button>
      </Box>
    </div>
  )
}

export default Update
