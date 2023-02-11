import React ,{useState}from "react";
import {
  Typography,
  Box,
  makeStyles,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import { deepPurple, green, orange } from "@material-ui/core/colors";

import List from "../Pages/List";
import axios from "axios";

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

const Home = () => {
  const classes = useStyles();
  // const [student, setStudent] = useState({
  //   name: "",
  //   email: ""
  //  });

  const [name,setName] =useState('')
  const [email,setEmail] =useState('')
  const [errors, setErrors] = useState({});

console.log(errors);


  //  const onChangeHandle=(e)=>{
  //   setStudent({
  //     ...student,
  //     [e.target.name]: e.target.value
  //    })
  //  }
   const [status, setStatus] = useState(false);
   console.log(status);

   const handleSubmit=async(e)=>{
    e.preventDefault()
    const newErrors = {};
    if(!name ){
      newErrors.name ="Name is required"
    }   if(!email){
      newErrors.email="Email is required"
    }
    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      try{
        await axios.post(`http://localhost:3001/students`,{name,email})
        setStatus(true)
       
       }catch(error){
         console.log("something want to wrong")
       
       }
          }
    }



   if (status) {
    return <Home />
   }


   
  return (
    <>
      <Box className={classes.headingColor}>
        <Typography variant="h4">React CRUD with API Call</Typography>
      </Box>
      <form onSubmit={handleSubmit}>
      <Grid container style={{ paddingTop: "20px" }} spacing={4}>
        <Grid item md={6} xs={12}>
          <Box className={classes.addStuColor} style={{ padding: "10px" }}>
            <Typography variant="h4">Students</Typography>
          </Box>
          <Grid container>
            <Grid item xs={12} style={{ paddingTop: "10px" }}>
              <TextField
                autoComplete="Email"
                name="name"
                variant="outlined"
                fullWidth
                id="stuname"
                label="Name"
                onChange={(e)=>setName(e.target.value)}
              />
             <p style={{color:"red"}}>{errors.name}</p> 
            </Grid>

            <Grid item xs={12} style={{ paddingTop: "10px" }}>
              <TextField
                autoComplete="Email"
                name="email"
                variant="outlined"
                fullWidth
                id="Email"
                label="Email"
                onChange={(e)=>setEmail(e.target.value)}

              />
                          <p style={{color:"red"}}>{errors.email}</p> 


            </Grid>
          </Grid>
          <Box m={3} style={{ paddingTop: "10px" }}>
            <Button type="submit" variant="contained" color="primary" fullWidth >
              Add
            </Button>
          </Box>
        </Grid>
        <Grid item md={6} xs={12}>
          <List />
        </Grid>
      </Grid>
      </form>
    </>
  );
};

export default Home;
