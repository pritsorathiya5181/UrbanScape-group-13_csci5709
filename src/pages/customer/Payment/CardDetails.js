import React from "react"
import {
    Button,
    FormControl,
    MenuItem,
    Select,
    TextField,
    Tooltip,
    Typography,
    InputLabel ,
    FormHelperText, 
    FormLabel,
    Card,
    Box,
    Divider
  } from '@mui/material'


  
function CardDetails( props) {

  console.log(" CardDetails props: " , props)
  return (
       <div
      //  style={{
      //   display: "flex",
      //   padding: "1em 0.7em",
      //   width: "100%",
      //   alignItems: "center"
      // }}
      >

  
<Divider /> 
        <div className="col-xs-12 col-md-4" alignItems="center">
        <Box  display = "flex"
    justifyContent="center"
    alignItems = "center"
    paddingTop='20px'
    paddingBottom='20px'>
      
        <Typography variant= "h4">  Enter card details </Typography>
        </Box>
        <FormControl>

 
        <FormLabel > CARD NUMBER </FormLabel>         
        <input type="text" placeholder="Valid Card Number"   />             
    

        <div className="row" alignItems="center">
        
        <div className="col-xs-7 col-md-7">

                     
        <FormLabel >  EXPIRY DATE </FormLabel>

        <div className="col-xs-6 col-lg-6">
        <input type="text"  placeholder="MM" required />
        </div>

        <div className="col-xs-6 col-lg-6">
        <input type="text" placeholder="YY" required />
        </div>
        </div>


        <div className="col-xs-5 col-md-5">           
        <FormLabel > CVV CODE </FormLabel> 
        <input type="password"  placeholder="CVV" required />
        </div>
    
        </div>
        </FormControl>

        </div>

   </div>
 
  );
}

export default CardDetails;
