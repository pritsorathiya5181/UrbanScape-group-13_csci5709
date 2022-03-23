import React from 'react'
import './UserHomePageStyle.css'
import ServiceTile from './ServiceTile'
import salonImage from '../../../asserts/images/salon.jpg'
import plumbingImg from '../../../asserts/images/carpentry.jpg'
import carpentryImg from '../../../asserts/images/plumbing.jpg'
import { Grid, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import Slider from '../../../components/Slider'
import CategoryItem from '../../../components/CategoryItem'
import styled, { css } from 'styled-components'
import NewsLetter from '../../../components/NewsLetter'
import Footer from '../../../components/Footer'

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 380px) {
      ${props}
    }
  `
}

const useStyles = makeStyles({
  gridcontainer: {
    paddingLeft: '25px',

    paddingRight: '25px',

    paddingTop: '50px',
  },
})
function UserHomePage() {
  const classes = useStyles()

  let offeredServices = []
  offeredServices.push({
    name: 'Book Salon Service',
    image: salonImage,
    description:
      'Book our salon services at affordable prices to rejuvenate your senses !!',
  })
  offeredServices.push({
    name: 'Book Carpentry Service',
    image: carpentryImg,
    description: 'Coming Soon',
  })
  offeredServices.push({
    name: 'Book Plumbing Services',
    image: plumbingImg,
    description: 'Coming Soon',
  })

  const Container = styled.div`
    display: flex;
    padding: 20px;
    justify-content: space-between;
    ${mobile({ padding: '0px', flexDirection: 'column' })}
  `

  return (
    <div>
      {/* <Typography style={{ textAlign: 'center', padding: '20px' }} variant='h2'>
        Welcome Home !
      </Typography>
      <Typography style={{ textAlign: 'center', padding: '10px' }} variant='h4'>
        We are the one stop solution for all your worries
      </Typography> */}
      <Slider />

      {/* <Carousel
        autoPlay
        infiniteLoop
        showArrows={false}
        showThumbs={false}
        renderIndicator={(onClickHandler, isSelected, index, label) => {
          const defStyle = { marginLeft: 20, color: 'white', cursor: 'pointer' }
          const style = isSelected
            ? { ...defStyle, color: 'red' }
            : { ...defStyle }
          return (
            <span
              style={style}
              onClick={onClickHandler}
              onKeyDown={onClickHandler}
              value={index}
              key={index}
              role='button'
              tabIndex={0}
              aria-label={`${label} ${index + 1}`}
            >
              {'cust ' + index}
            </span>
          )
        }}
      >
        <div>
          <img src={carpentryImg} />
        </div>
        <div>
          <img src={salonImage} />
        </div>
        <div>
          <img src={plumbingImg} />
        </div>
      </Carousel> */}

      <div>
        {/* <Grid container spacing={3} className={classes.gridcontainer}>
          {offeredServices.map((service, index) => {
            return (
              <Grid key={index.toString()} item xs={12} sm={6} md={3}>
                <div>
                  <ServiceTile service={service} />
                </div>
              </Grid>
            )
          })}
        </Grid> */}
      </div>
      <Container>
        {offeredServices.map((item) => (
          <CategoryItem item={item} key={item.id} />
        ))}
      </Container>

      <NewsLetter />

      <Footer />
    </div>
  )
}

export default UserHomePage
