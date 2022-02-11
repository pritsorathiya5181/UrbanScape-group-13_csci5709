import { Grid, makeStyles } from '@material-ui/core';
import React from 'react'
import ServiceTile from './ServiceTile';
import salonImage from '../../images/salon.jpg';
import plumbingImg from '../../images/carpentry.jpg';
import carpentryImg from '../../images/plumbing.jpg';

const useStyles = makeStyles({

    gridcontainer: {
  
      paddingLeft: '25px',
  
      paddingRight: '25px',
  
      paddingTop: '50px',
  
    }
  
  });
function UserHomePage() {
    const classes = useStyles();

    let offeredServices = [];
    offeredServices.push({name: "Book Salon Service", image: salonImage, description: "Book our salon services at affordable prices to rejuvenate your senses !!"});
    offeredServices.push({name: "Book Carpentry Service", image: carpentryImg, description: "Coming Soon"});
    offeredServices.push({name: "Book Plumbing Services", image: plumbingImg, description: "Coming Soon"});

    return (

        <div>
    
          <div>
    
            <Grid
    
              container
    
              spacing={3}
    
              className={classes.gridcontainer}>
    
              {offeredServices.map((service) => {
    
                return <Grid item xs={12} sm={6} md={3}>
    
                  <div><ServiceTile service={service} /></div></Grid>
    
              })}
            </Grid>
    
          </div>
    
        </div>
    
      );
}

export default UserHomePage
