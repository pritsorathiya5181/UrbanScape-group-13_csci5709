import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './ServiceProfile.css'
import useWindowDimensions from '../../../utils/Scale'
import * as PATH from '../../../utils/constant'
import ServiceCard from './ServiceCard'
import { useSelector } from 'react-redux'
import { Tooltip } from '@mui/material'

const ServiceProfile = () => {
  const { width } = useWindowDimensions()

  const [services, setServices] = useState([
    {
      serviceId: 1,
      serviceCategory: 'Hair Cutting',
      serviceLocation: 'Quinpool Rd',
      serviceTime: '10.30AM - 12.00PM',
      serviceImage: [
        {
          photoId: 1,
          isPhoto: true,
          photoUrl:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwlPlC2_ZU7QmDuD3i_89798-VpFIDX4oipd83hSQwvqTjWQhW1YWe9zPRY0H1jvpkzIg&usqp=CAU',
        },
        {
          photoId: 0,
          isPhoto: false,
        },
      ],
      serviceDesc:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
    },
    {
      serviceId: 2,
      serviceCategory: 'Home Decoration',
      serviceLocation: 'Joseph Howe dr',
      serviceTime: '11.30AM - 01.00PM',
      serviceImage: [
        {
          photoId: 1,
          isPhoto: true,
          photoUrl:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwlPlC2_ZU7QmDuD3i_89798-VpFIDX4oipd83hSQwvqTjWQhW1YWe9zPRY0H1jvpkzIg&usqp=CAU',
        },
        {
          photoId: 0,
          isPhoto: false,
        },
      ],
      serviceDesc:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
    },
    {
      serviceId: 3,
      serviceCategory: 'Personal Beauty',
      serviceLocation: 'South park rd',
      serviceTime: '11.30AM - 02.00PM',
      serviceImage: [
        {
          photoId: 1,
          isPhoto: true,
          photoUrl:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwlPlC2_ZU7QmDuD3i_89798-VpFIDX4oipd83hSQwvqTjWQhW1YWe9zPRY0H1jvpkzIg&usqp=CAU',
        },
        {
          photoId: 0,
          isPhoto: false,
        },
      ],
      serviceDesc:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
    },
    {
      serviceId: 4,
      serviceCategory: 'Spa',
      serviceLocation: 'Quinpool Rd',
      serviceTime: '10.30AM - 12.00PM',
      serviceImage: [
        {
          photoId: 1,
          isPhoto: true,
          photoUrl:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwlPlC2_ZU7QmDuD3i_89798-VpFIDX4oipd83hSQwvqTjWQhW1YWe9zPRY0H1jvpkzIg&usqp=CAU',
        },
        {
          photoId: 0,
          isPhoto: false,
        },
      ],
      serviceDesc:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
    },
    {
      serviceId: 5,
      serviceCategory: 'Hair Cutting',
      serviceLocation: 'Quinpool Rd',
      serviceTime: '10.30AM - 12.00PM',
      serviceImage: [
        {
          photoId: 1,
          isPhoto: true,
          photoUrl:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwlPlC2_ZU7QmDuD3i_89798-VpFIDX4oipd83hSQwvqTjWQhW1YWe9zPRY0H1jvpkzIg&usqp=CAU',
        },
        {
          photoId: 0,
          isPhoto: false,
        },
      ],
      serviceDesc:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
    },
    {
      serviceId: 6,
      serviceCategory: 'Hair Cutting',
      serviceLocation: 'Quinpool Rd',
      serviceTime: '10.30AM - 12.00PM',
      serviceImage: [
        {
          photoId: 1,
          isPhoto: true,
          photoUrl:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwlPlC2_ZU7QmDuD3i_89798-VpFIDX4oipd83hSQwvqTjWQhW1YWe9zPRY0H1jvpkzIg&usqp=CAU',
        },
        {
          photoId: 0,
          isPhoto: false,
        },
      ],
      serviceDesc:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.",
    },
  ])

  const servicesList = useSelector((state) => state.services)
  useEffect(() => {
    if (servicesList?.length > 0) {
      setServices([...services, ...servicesList])
    }
  }, [])

  // setServices(servicesList)

  return (
    <>
      <nav className='service-navbar'>
        <Link to={`${PATH.partnerBaseUrl}/myservices`} className='navbar-logo'>
          My Services
        </Link>
        {width > 550 ? (
          <Link to={`${PATH.partnerBaseUrl}/addservice`}>
            <button className='add-service-btn'>Add Service</button>
          </Link>
        ) : (
          <Tooltip title='Add new service'>
            <Link to={`${PATH.partnerBaseUrl}/addservice`}>
              <figure className='add-service-btn'>
                <i className='far fa-plus fa-lg' />
              </figure>
            </Link>
          </Tooltip>
        )}
      </nav>

      <section
        style={{
          display: 'flex',
          flex: 1,
          alignItems: 'center',
        }}
      >
        {services?.length > 0 ? (
          <section className='service-item'>
            <section className={width > 600 ? 'service-row' : 'service-column'}>
              {services.map((item, index) => {
                return <ServiceCard key={index.toString()} item={item} />
              })}
            </section>
          </section>
        ) : (
          <details className='centered'>
            <h1>You haven't add any service. Please add first! :)</h1>
          </details>
        )}
      </section>
    </>
  )
}

export default ServiceProfile
