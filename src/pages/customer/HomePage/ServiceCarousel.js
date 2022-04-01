/**
 * Author: Priti Sri Pandey - B00877337
 */

import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './ServiceCarousel.css';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    Grid
} from '@mui/material'

/**
 * ServiceCarousel takes in a list of service categories as props, and shows the list of services in the first category as a sliding carousel
 */
const ServiceCarousel = (props) => {
    let navigate = useNavigate();
    return (
        <Carousel showStatus={false} dynamicHeight={true} showThumbs={false} autoPlay={true} interval={5000} infiniteLoop={true} transitionTime={1000}>

            {props.categories?.length > 0 &&
                props?.categories[0].services?.map((service, index) => {
                    return (
                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                                <img src={service.img} height="100%" width="300px" />
                            </Grid>
                            <Grid item xs={4}>
                                <div className='content'>
                                    <div className='title'>{service.serviceName}</div>
                                    <p className='description'>{service.desc}</p>
                                    <Button sx={{color: "black"}} onClick={() => navigate('./beautyservices')}
                                        size='small'
                                        variant="outlined"
                                    >
                                        Book Now
                                    </Button>
                                </div>

                            </Grid>
                        </Grid>
                    )
                })}

        </Carousel>
    )
}

export default ServiceCarousel
