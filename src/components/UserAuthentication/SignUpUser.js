import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Select } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ValidatorComponent } from 'react-material-ui-form-validator';
import { useState } from "react/cjs/react.development";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUpUser() {
  const [fnameError,setFnameError] = useState();
    const [lnameError,setLnameError] = useState();
    const [emailError,setEmailError] = useState();
    const [phonenoError,setPhoneNo] = useState();
    const [passwordError,setPasswordError] = useState();
    const [confirmPasswordError,setConfirmPasswordError] = useState();
  const validateFName=(name)=>{
    var re = /[^a-zA-Z]/
   return re.test(name);
}
const validateEmail=(email)=>{
 var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 return re.test(email);
}
const validatePwd=(password)=>{
 
 var re=/^[A-Z]*$/
 return re.test(password);
}
const handleFName=(event)=>{
  
 const firstName =event.target.value;
 if(validateFName(firstName)){
   setFnameError('Alphabets only');
 }
 else{
   setFnameError('');
 }

}

const handleLName=(event)=>{
 const lastName =event.target.value;
 localStorage.setItem('lname','lastName');
 if(validateFName(lastName)){
   setLnameError('Alphabets only');
 }
 else{
   setLnameError('');
 }
}

const handleEmail=(event)=>{
 const Email =event.target.value;
 localStorage.setItem('email','Email');
 if(!validateEmail(Email)){
   setEmailError('Invalid email foramt');
 }
 else{
   setEmailError('');
 }
}

const handlePhone = (event)=>{
  const PhoneNo = event.target.value;
  if(PhoneNo.length == 10){
    setPhoneNo('')
  }
  else{
    setPhoneNo('Must be 10 digits');
  }
}

const handlePassword=(event)=>{
 const Password =event.target.value;
 if(validatePwd(Password)){
   setPasswordError('Should have special and alphanumeric characters ');
 }
 else if(Password.length < 8){
   setPasswordError('Minimum 8 characters are required');
 }
 else{
   setPasswordError('');
 }
}

const handleConfirmPassword=(event)=>{
 const pass = document.getElementById('password').value;
 console.log(pass);
 const cpass = event.target.value;
 console.log(cpass);
 if(pass!==cpass){
   console.log(cpass);
   setConfirmPasswordError('Confirm Password does not match to Password');
 }
 else{
   setConfirmPasswordError('');
 }
}

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    if(fnameError.length >0){
      alert("Error in FirstName");
      return;
    }
    
    if(lnameError.length >0){
     alert("Error in LastName");
     return;
   }
   if(emailError.length >0){
     alert("Error in Email");
     return;
   }
   if(phonenoError.length>0){
     alert("Invalid phone Number");
     return;
   }
   if(passwordError.length >0){
     alert("Error in Password");
     return;
   }
   if(confirmPasswordError.length >0){
     alert("Error in Confirm Password");
     return;
   }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      firstname: data.get("firstname"),
      lastname:data.get("lastname"),
      email: data.get("email"),
      phoneno : data.get("phoneno"),
      password: data.get("password"),
      
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:5000/api/auth/usersignup", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

    
    console.log({
      firstname: data.get("firstname"),
      lastname:data.get("lastname"),
      email: data.get("email"),
      phoneno : data.get("phoneno"),
      password: data.get("password"),
    });


  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="firstname"
                label="Firstname"
                name="firstname"
                autoComplete="firstname"
                autoFocus
                onChange={(e)=> handleFName(e)}
              />
              <Typography style={{color:"red",width:"500px"}}>
               {fnameError}
            </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="lastname"
                label="LastName"
                name="lastname"
                autoComplete="lastname"
                autoFocus
                onChange={(e)=> handleLName(e)}
              />
              <Typography style={{color:"red",width:"500px"}}>
               {lnameError}
            </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                type="email"
                autoFocus
                onChange={(e)=> handleEmail(e)}
              />
              <Typography style={{color:"red",width:"500px"}}>
               {emailError}
            </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                name="phoneno"
                label="PhoneNo"
                type="phoneno"
                id="phoneno"
                autoComplete="phoneno"
                autoFocus
                onChange={(e)=>handlePhone(e)}
              />
              <Typography style={{color:"red",width:"500px"}}>
               {phonenoError}
            </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e)=> handlePassword(e)}
              />
              <Typography style={{color:"red",width:"500px"}}>
               {passwordError}
            </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                name="cpassword"
                label="Confirm Password"
                type="password"
                id="cpassword"
                autoComplete="current-password"
                onChange={(e)=> handleConfirmPassword(e)}
              />
              <Typography style={{color:"red",width:"500px"}}>
               {confirmPasswordError}
            </Typography>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Already a user? Login"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}