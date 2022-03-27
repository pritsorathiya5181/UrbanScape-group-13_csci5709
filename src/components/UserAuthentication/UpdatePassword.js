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
import { useNavigate } from "react-router-dom";
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


export default function UpdatePassword() {
  const [passwordError,setPasswordError] = useState();
  const navigateLogin = useNavigate();

  const validatePwd=(password)=>{
 
    var re=/^[A-Z]*$/
    return re.test(password);
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
    // eslint-disable-next-line no-console
    if(passwordError.length >0){
      alert("Error in Password");
      return;
    }
    var username = data.get('username');
    var password = data.get('password');
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch(`http://localhost:5000/api/auth/updatepassword/${username}/${password}`, requestOptions)
      .then(response => response.text())
      .then(result =>{
        if(result == "password updated"){
          navigateLogin('/userlogin');
        }
        else{
          console.log("Error updating password");
        }
      })
      .catch(error => console.log('error', error));
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
              New Password
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
             
            <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Enter Username"
                name="username"
                autoComplete="username"
                type="email"
                autoFocus
              />
             
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Enter New Password"
                name="password"
                autoComplete="password"
                type="password"
                autoFocus
                onChange={(e)=> handlePassword(e)}
              />
              <Typography style={{color:"red",width:"100%"}}>
               {passwordError}
            </Typography>
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                UpdatePassword
              </Button>
              <Grid container>
                <Grid item>
               </Grid>
              </Grid>
              
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}