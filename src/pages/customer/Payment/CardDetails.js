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
    FormHelperText 
  } from '@mui/material'

function CardDetails() {
  return (
    <div className="container">

        <div class="col-xs-12 col-md-4">
        
        <h3 > Enter card details: </h3>
      
        <FormControl>
        <label > CARD NUMBER :</label>
                        
        <input type="text" placeholder="Valid Card Number"   />
                         
            <div class="row">
            <div class="col-xs-7 col-md-7">
                     
                <label >  EXPIRY DATE</label>

                <div class="col-xs-6 col-lg-6">
                <input type="text"  placeholder="MM" required />
                </div>

                 <div class="col-xs-6 col-lg-6">
                 <input type="text" placeholder="YY" required />
                </div>

            </div>
     
            <div class="col-xs-5 col-md-5">           
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
