import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import './ServiceCard.css'
import useWindowDimensions from '../../../utils/scale'
import { useNavigate } from 'react-router-dom'
import * as PATH from '../../../utils/string'

const ServiceCard = ({ item }) => {
  const navigate = useNavigate()
  const { width } = useWindowDimensions()

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
      }}
      onClick={() => openService(item)}
    >
      <CardMedia
        component='img'
        height='140'
        image={item.serviceImage[0].photoUrl}
        alt='green iguana'
        style={{ borderBottom: '1px solid #1c1b1b' }}
      />
      <CardContent>
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
