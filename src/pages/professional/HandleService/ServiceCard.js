/**
 * Author: Prit Ajaykumar Sorathiya - B00890175
 */

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

/**
 * ServiceCard Component - Displays the service card
 */
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
        boxShadow: '6px 6px 16px 0 grey',
        borderRedius: '15px',
        overflow: 'hidden',
        cursor: 'pointer',
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
          onClick={() => openService(item)}
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
          {item?.serviceCategory}
        </Typography>
        <Typography variant='body2' color='black' component='div'>
          {item?.serviceName}
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
    </Card>
  )
}

export default ServiceCard
