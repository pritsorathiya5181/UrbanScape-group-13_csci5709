import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from "react/cjs/react.development";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function UserLogin() {
  const [errors,setErrors]= React.useState({});
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


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
   if(emailError.length >0){
     alert("Error in Email");
     return;
   }
   
   if(passwordError.length >0){
     alert("Error in Password");
     return;
   }
   
    // eslint-disable-next-line no-console
    var email = data.get('email');
    var password = data.get('password');

    var raw = "";

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch(`http://localhost:5000/api/auth/users/${email}/${password}`, requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            
            <Typography component="h1" variant="h5">
              Login
            </Typography>

            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e)=> handleEmail(e)}
              />
              {/* <p style={{color:"red"}}>{emailError}</p> */}
              <Typography style={{color:"red",width:"500px"}}>
               {emailError}
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
              {/* <p style={{color:"red"}}>{passwordError}</p> */}
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/forgetpassword" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"New User? Sign Up"}
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