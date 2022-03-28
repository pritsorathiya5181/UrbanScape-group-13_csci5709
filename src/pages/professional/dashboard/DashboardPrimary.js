import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import useWindowDimensions from '../../../utils/scale'
import { useNavigate } from 'react-router-dom'

export default function DashboardPrimary(props) {
  const { width } = useWindowDimensions()
  let navigate = useNavigate()

  const serviceList = [
    {
      name: 'Plumbing',
      charge: '30',
      locations: 'Halifax, Dartmouth',
    },
    {
      name: 'Carpenting',
      charge: '40',
      locations: 'Halifax South-End',
    },
    {
      name: 'Carpenting',
      charge: '40',
      locations: 'Halifax South-End',
    },
    {
      name: 'Carpenting',
      charge: '40',
      locations: 'Halifax South-End',
    },
    {
      name: 'Carpenting',
      charge: '40',
      locations: 'Halifax South-End',
    },
  ]

  return (
    <>
      <section
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: width > 650 ? 'space-between' : 'center',
          margin: '50px 30px',
          flexWrap: 'wrap',
        }}
      >
        <Card
          sx={{
            width: '315px',
            backgroundColor: '#1a1717',
            marginBottom: '20px',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/professional/servicerequests')}
        >
          <CardContent>
            <Typography
              variant='h5'
              component='div'
              sx={{
                color: 'white',
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'center',
              }}
            >
              Pending Requests
            </Typography>
            <Typography
              variant='h1'
              component='div'
              sx={{
                color: 'white',
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'center',
              }}
            >
              {props.serviceStatsData?.pendingRequests?.length}
            </Typography>
          </CardContent>
        </Card>

        <Card
          sx={{
            width: '315px',
            backgroundColor: '#1a1717',
            marginBottom: '20px',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/professional/servicehistory')}
        >
          <CardContent>
            <Typography
              variant='h5'
              component='div'
              sx={{
                color: 'white',
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'center',
              }}
            >
              Approved Requests
            </Typography>
            <Typography
              variant='h1'
              component='div'
              sx={{
                color: 'white',
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'center',
              }}
            >
              {props.serviceStatsData?.approvedRequests?.length}
            </Typography>
          </CardContent>
        </Card>
        <Card
          sx={{
            width: '315px',
            backgroundColor: '#1a1717',
            marginBottom: '20px',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/professional/servicehistory')}
        >
          <CardContent>
            <Typography
              variant='h5'
              component='div'
              sx={{
                color: 'white',
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'center',
              }}
            >
              Processed Requests
            </Typography>
            <Typography
              variant='h1'
              component='div'
              sx={{
                color: 'white',
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'center',
              }}
            >
              {props.serviceStatsData?.processedRequests?.length}
            </Typography>
          </CardContent>
        </Card>
        <Card
          sx={{
            width: '315px',
            backgroundColor: '#1a1717',
            marginBottom: '20px',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/professional/servicehistory')}
        >
          <CardContent>
            <Typography
              variant='h5'
              component='div'
              sx={{
                color: 'white',
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'center',
              }}
            >
              Cancelled Requests
            </Typography>
            <Typography
              variant='h1'
              component='div'
              sx={{
                color: 'white',
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'center',
              }}
            >
              {props.serviceStatsData?.cancelledRequests?.length}
            </Typography>
          </CardContent>
        </Card>
      </section>

      <section
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'white !important',
        }}
      >
        <p className='page-title'>My Services</p>
        {width > 600 && (
          <button
            style={{
              position: 'absolute',
              right: '50px',
              backgroundColor: '#1e88e5',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '5px',
              fontSize: '15px',
              border: '2px solid transparent',
            }}
            onClick={() => {
              navigate(`/professional/myservices`)
            }}
          >
            View all Service
          </button>
        )}
      </section>

      <section
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: width > 650 ? 'space-between' : 'center',
          margin: '50px 30px',
          flexWrap: 'wrap',
        }}
      >
        {props.serviceList.map((item, index) => {
          return (
            <Card
              sx={{
                width: '315px',
                backgroundColor: '#0d47a1',
                marginBottom: '20px',
              }}
            >
              <CardContent>
                <Typography
                  variant='h5'
                  component='div'
                  sx={{
                    color: 'white',
                    display: 'flex',
                    alignContent: 'center',
                    justifyContent: 'center',
                    borderBottom: 1,
                    borderColor: 'white',
                  }}
                >
                  {item.serviceName}
                </Typography>

                <Typography
                  variant='h6'
                  component='div'
                  sx={{ color: 'white' }}
                  justifyContent='center'
                >
                  Description: {item.serviceDescription}
                </Typography>

                <Typography
                  variant='h6'
                  component='div'
                  sx={{ color: 'white' }}
                  justifyContent='center'
                >
                  Locations Served: {item.serviceLocation}
                </Typography>
              </CardContent>
            </Card>
          )
        })}
      </section>
    </>
  )
}
