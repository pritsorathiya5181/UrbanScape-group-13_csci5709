import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import './ServiceCard.css'
import useWindowDimensions from '../../../utils/Scale'

const ServiceCard = ({ item }) => {
  const { width } = useWindowDimensions()

  const adjustContent = (content) => {
    if (content.length > 60) {
      return content.substring(0, 100) + '...'
    }
    return content
  }
  return (
    <Card
      sx={{
        width: width < 380 ? 280 : 300,
        marginLeft: width < 380 ? 0 : 10,
        marginBottom: 5,
        backgroundColor: '#CED3DE',
      }}
      onClick={() => console.log('first')}
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
          {adjustContent(item.serviceDesc)}
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
