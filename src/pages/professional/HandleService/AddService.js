import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './AddService.css'
import useWindowDimensions, * as PATH from '../../../utils/Scale'
import { ServiceCategory } from '../../../utils/service'
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from '@mui/material'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

const AddService = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { height, width } = useWindowDimensions()

  const [category, setCategory] = React.useState('')
  const [cost, setCost] = useState('')
  const [location, setLocation] = useState('')
  const [fromTime, setFromTime] = useState('')
  const [toTime, setToTime] = useState('')
  const [description, setDescription] = useState('')
  const [photos, setPhotos] = useState([
    {
      photoId: 0,
      isPhoto: false,
    },
  ])
  const [isDisabled, setIsDisabled] = useState(true)

  useEffect(() => {
    if (
      category.length > 0 &&
      cost.length > 0 &&
      photos.length > 1 &&
      location.length > 0 &&
      fromTime.length > 0 &&
      toTime.length > 0 &&
      description.length > 0
    ) {
      setIsDisabled(false)
    }
  }, [category, cost, photos, location, fromTime, toTime, description])

  const onSelectCategory = (event) => {
    setCategory(event.target.value)
  }

  const handleChangeInput = (event) => {
    const value = event.target.value
    console.log('first', value)
    switch (event.target.id) {
      case 'cost':
        if (/^[0-9]*$/.test(value)) {
          setCost(value)
        } else {
          setCost('')
        }
        break
      case 'location':
        setLocation(value)
        break
      case 'FromTime':
        // setFromTime(convertTo12hours(value))
        setFromTime(value)
        break
      case 'ToTime':
        setToTime(value)
        // setToTime(convertTo12hours(value))
        break
      case 'description':
        setDescription(value)
        break
      default:
        break
    }
  }

  const convertTo12hours = (timeIn24) => {
    var hours = timeIn24.split(':')[0] // gives the value in 24 hours format
    var AmOrPm = hours >= 12 ? 'pm' : 'am'
    hours = hours % 12 || 12
    var minutes = timeIn24.split(':')[1]
    var finalTime = hours + ':' + minutes + ' ' + AmOrPm
    return finalTime
  }

  const handleFileChange = (event) => {
    const { target } = event
    const { files } = target

    if (files && files[0]) {
      var reader = new FileReader()

      // reader.onloadstart = () => this.setState({loading: true});

      reader.onload = (event) => {
        // this.setState({
        //   data: event.target.result,
        //   loading: false
        // });
        var imageResult = {
          photoId: photos.length,
          isPhoto: true,
          photoUrl: event.target.result,
        }
        setPhotos([imageResult, ...photos])
      }

      reader.readAsDataURL(files[0])
    }
  }

  const onAddService = () => {
    const serviceObj = {
      serviceId: uuidv4(),
      serviceCategory: category,
      serviceLocation: location,
      serviceTime: fromTime + '-' + toTime,
      serviceDesc: description,
      serviceImage: photos,
    }

    dispatch({
      type: 'ADD_SERVICE',
      payload: {
        serviceObj: serviceObj,
      },
    })

    // servicesList = [...servicesList, serviceObj]
    // localStorage.setItem('services', servicesList)
    navigate(`${PATH.partnerBaseUrl}/myservices`)
  }

  const getWidth = () => {
    if (width < 600) {
      return 320
    } else {
      return 420
    }
  }

  return (
    <>
      <nav className='service-navbar'>
        <Link to={`${PATH.partnerBaseUrl}/addservice`} className='navbar-logo'>
          Add Service
        </Link>
        {width < 550 && (
          <Link to={`${PATH.partnerBaseUrl}/myservices`}>
            <div
              className='add-service-btn'
              onClick={() => {
                onAddService()
              }}
            >
              <i class='far fa-arrow-left'></i>
            </div>
          </Link>
        )}
      </nav>
      <section className='split'>
        <section className='centered'>
          <section className='row'>
            <p className='serviceTitle'>Category</p>
            <FormControl sx={{ width: getWidth(), textAlign: 'left' }}>
              {/* <InputLabel id='demo-simple-select-helper-label'>Age</InputLabel> */}
              <Select
                displayEmpty
                labelId='demo-simple-select-helper-label'
                id='demo-simple-select-helper'
                value={category}
                // label='Age'
                onChange={onSelectCategory}
                placeholder='Select Category'
              >
                <MenuItem disabled value=''>
                  <em>Select a category...</em>
                </MenuItem>
                {ServiceCategory.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </section>
          <section className='row'>
            <p className='serviceTitle'>Cost</p>
            <TextField
              required
              sx={{ width: getWidth() }}
              id='cost'
              type='text'
              value={cost}
              placeholder='Service cost (e.g. 10, 20)'
              onChange={handleChangeInput}
            />
          </section>
          <section className='row'>
            <p className='serviceTitle'>Photos</p>
            <div
              style={{
                display: 'flex',
                width: width < 600 ? 320 : 400,
                flexWrap: 'wrap',
                flexDirection: 'row',
              }}
            >
              {photos.map((item) => {
                return item.isPhoto ? (
                  <button key={item.photoId} className='addImage'>
                    <img
                      alt='serviceImg'
                      className='serviceImg'
                      src={item.photoUrl}
                    />
                  </button>
                ) : (
                  <div style={{ flexDirection: 'column', display: 'flex' }}>
                    <input
                      id='car'
                      type='file'
                      accept='image/*'
                      capture='camera'
                      onChange={handleFileChange}
                      className='fileInput'
                    />
                    <div key={item.photoId} className='addImage'>
                      <i className='fas fa-plus fa-lg' />
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
          <section className='row'>
            <p className='serviceTitle'>Location</p>
            <TextField
              required
              sx={{ width: getWidth() }}
              id='location'
              type='text'
              value={location}
              placeholder='Preferred Location (e.g. Quinpool Rd, Halifax)'
              onChange={handleChangeInput}
            />
          </section>
          <section className='row'>
            <p className='serviceTitle'>Time</p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: getWidth(),
              }}
            >
              <Tooltip title='From Time (e.g. 10.15 AM)'>
                <TextField
                  required
                  sx={{ width: getWidth() / 2.1 }}
                  id='FromTime'
                  type='time'
                  value={fromTime}
                  placeholder='From'
                  onChange={handleChangeInput}
                />
              </Tooltip>
              <Tooltip title='To Time (e.g. 11.15 AM)'>
                <TextField
                  required
                  sx={{ width: getWidth() / 2.1 }}
                  id='ToTime'
                  type='time'
                  value={toTime}
                  placeholder='To'
                  onChange={handleChangeInput}
                />
              </Tooltip>
            </div>
          </section>
          <section className='row'>
            <p className='serviceTitle'>Description</p>
            <TextField
              required
              sx={{ width: getWidth() }}
              multiline
              minRows={3}
              id='description'
              type='text'
              value={description}
              placeholder='Description'
              onChange={handleChangeInput}
            />
          </section>
          <Tooltip
            title={
              isDisabled ? 'Please enter all the details' : 'Add new service'
            }
          >
            <section>
              <Button
                disabled={isDisabled}
                sx={{
                  width: width < 600 ? 320 : 170,
                  backgroundColor: '#1c1b1b',
                  marginTop: '20px',
                  marginBottom: width < 600 ? 30 : 0,
                }}
                // className='add-service-btn'
                variant='contained'
                onClick={() => {
                  onAddService()
                }}
              >
                Add
              </Button>
            </section>
          </Tooltip>
        </section>
      </section>
    </>
  )
}

export default AddService
