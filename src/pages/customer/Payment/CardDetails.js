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
    FormLabel
  } from '@mui/material'

function CardDetails( props) {

  console.log(" CardDetails props: " , props)
  return (
       <div>

        <div className="col-xs-12 col-md-4">
        
        <h3 > Enter card details: </h3>
      
        <FormControl disabled={true}>
        <FormLabel > CARD NUMBER :</FormLabel>
                   
        <input type="text" placeholder="Valid Card Number" disabled={true}  />             
        <div className="row">
        <div className="col-xs-7 col-md-7">
                     
        <label >  EXPIRY DATE</label>

        <div className="col-xs-6 col-lg-6">
        <input type="text"  placeholder="MM" required />
        </div>

        <div className="col-xs-6 col-lg-6">
        <input type="text" placeholder="YY" required />
        </div>
        </div>
     
        <div className="col-xs-5 col-md-5">           
        <label >   CV CODE</label>
        <input type="password"  placeholder="CV" required />
        </div>
    
        </div>
        </FormControl>
        </div>
   </div>
 
  );
}

export default CardDetails;
