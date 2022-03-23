import React, { useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import './ServiceCard.css'
import ChevronRight from '@mui/icons-material/ChevronRight'
import ChevronLeft from '@mui/icons-material/ChevronLeft'
import useWindowDimensions from '../../../utils/scale'
import { useNavigate } from 'react-router-dom'
import * as PATH from '../../../utils/string'

const ServiceCard = ({ item }) => {
  const navigate = useNavigate()
  const { width } = useWindowDimensions()
  const [imageIndex, setImageIndex] = useState(0)

  const adjustContent = (content) => {
    if (content?.length > 60) {
      return content.substring(0, 100) + '...'
    }
    return content
  }

  const openService = (item) => {
    console.log('item', item)
    navigate(`${PATH.partnerBaseUrl}/updateservice`, {
      state: {
        serviceData: item,
        isUpdate: true,
      },
    })
  }

  return (
    <Card
      sx={{
        width: width < 450 ? 280 : 300,
        marginLeft: width < 450 ? 0 : '5%',
        marginBottom: 5,
        backgroundColor: '#CED3DE',
        cursor: 'pointer',
        boxShadow: '6px 6px 16px 0 grey',
        borderRedius: '15px',
        overflow: 'hidden',
      }}
    >
      <section style={{ position: 'relative' }}>
        {imageIndex > 0 && (
          <ChevronLeft
            style={{
              position: 'absolute',
              left: 10,
              top: '50%',
              backgroundColor: '#0d47a150',
              borderRadius: '50%',
              padding: '3px',
              zIndex: 1,
            }}
            onClick={() => setImageIndex(imageIndex - 1)}
          />
        )}
        <CardMedia
          component='img'
          height='240'
          image={item.serviceImage[imageIndex].photoUrl}
          alt='green iguana'
          style={{ borderBottom: '2px solid #0d47a1' }}
        />
        {item.serviceImage?.length - 2 > imageIndex && (
          <ChevronRight
            style={{
              position: 'absolute',
              right: 10,
              top: '50%',
              backgroundColor: '#0d47a150',
              borderRadius: '50%',
              padding: '3px',
              zIndex: 1,
            }}
            onClick={() => setImageIndex(imageIndex + 1)}
          />
        )}
      </section>
      <CardContent onClick={() => openService(item)}>
        <Typography gutterBottom variant='h5' component='div'>
          {item.serviceCategory}
        </Typography>
        <Typography
          variant='body2'
          color='text.secondary'
          style={{
            height: 60,
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}
        >
          {adjustContent(item.serviceDescription)}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size='small'>Share</Button>
        <Button size='small'>Learn More</Button>
      </CardActions> */}
    </Card>
  )
}

export default ServiceCard
