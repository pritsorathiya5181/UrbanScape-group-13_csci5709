import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import './AddService.css'
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { v4 as uuidv4 } from 'uuid'
import AddIcon from '@mui/icons-material/Add'
import * as PATH from '../../../utils/string'
import { ServiceCategory } from '../../../utils/service'
import NavBar from '../../../components/professional/NavBar/NavBar'
import useWindowDimensions from '../../../utils/scale'
import * as ServiceAction from '../../../action/ServiceAction'
import { connect } from 'react-redux'

const AddService = (props) => {
  const navigate = useNavigate()
  const { state } = useLocation()

  const { width } = useWindowDimensions()

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

  const useStyles = makeStyles((theme) => ({
    input: {
      '&::placeholder': {
        textOverflow: 'ellipsis !important',
        color: 'black !important',
        fontSize: 16,
      },
    },
  }))
  const classes = useStyles()

  useEffect(() => {
    if (
      category.length > 0 &&
      cost.length > 0 &&
      photos.length > 1 &&
      location.length > 0 &&
      // fromTime.length > 0 &&
      // toTime.length > 0 &&
      description.length > 0
    ) {
      setIsDisabled(false)
    }

    if (state?.isUpdate && state?.serviceData) {
      const data = state.serviceData
      setCategory(data?.serviceCategory)
      setCost(data?.serviceCost)
      setPhotos(data?.serviceImage)
      setLocation(data?.serviceLocation)
      setDescription(data?.serviceDescription)
    }
  }, [category, cost, photos, location, fromTime, toTime, description])

  const onSelectCategory = (event) => {
    setCategory(event.target.value)
  }

  const handleChangeInput = (event) => {
    const value = event.target.value
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

      reader.onload = (event) => {
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
      // serviceTime: fromTime + '-' + toTime,
      serviceCost: cost,
      serviceImage: photos,
      serviceDescription: description,
    }

    props.action
      .addService(serviceObj)
      .then((res) => {
        console.log('res', res)
        navigate(`${PATH.partnerBaseUrl}/myservices`)
      })
      .catch((err) => {
        console.log('err', err)
      })
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
      <NavBar />

      <section className='title-view'>
        <p className='page-title'>
          {state?.isUpdate ? 'Update Service' : 'Add Services'}
        </p>
      </section>

      {/* <section className='split'> */}
      <section className='centered-view'>
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
            InputProps={{
              classes: {
                input: classes.input,
              },
            }}
            onChange={handleChangeInput}
          />
        </section>
        <section className='row'>
          <p className='serviceTitle'>Photos</p>
          <div
            style={{
              display: 'flex',
              width: width < 600 ? 320 : 420,
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
                <div
                  key={item.photoId}
                  style={{ flexDirection: 'column', display: 'flex' }}
                >
                  <input
                    id='car'
                    type='file'
                    accept='image/*'
                    capture='camera'
                    onChange={handleFileChange}
                    className='fileInput'
                  />
                  <div key={item.photoId} className='addImage'>
                    {/* <i className='fas fa-plus fa-lg' /> */}
                    <AddIcon fontSize='large' />
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
        {/* <section className='row'>
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
          </section> */}
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
            isDisabled
              ? 'Please enter all the details'
              : state?.isUpdate
              ? 'Update service'
              : 'Add new service'
          }
        >
          {state?.isUpdate ? (
            <section>
              <Button
                // disabled={isDisabled}
                sx={{
                  width: width < 600 ? 320 : 170,
                  backgroundColor: '#1e88e5',
                  marginTop: '20px',
                  marginBottom: width < 600 ? 30 : 0,
                  '&:hover': {
                    backgroundColor: '#0d47a1',
                    color: '#fff',
                  },
                }}
                variant='contained'
                onClick={() => {
                  onAddService()
                }}
              >
                Update
              </Button>
              <Button
                sx={{
                  width: width < 600 ? 320 : 170,
                  backgroundColor: '#1e88e5',
                  marginTop: '20px',
                  marginBottom: width < 600 ? 30 : 0,
                  '&:hover': {
                    backgroundColor: '#0d47a1',
                    color: '#fff',
                  },
                  marginLeft: 1,
                }}
                variant='contained'
                onClick={() => {
                  onAddService()
                }}
              >
                Delete
              </Button>
            </section>
          ) : (
            <section>
              <Button
                disabled={isDisabled}
                sx={{
                  width: width < 600 ? 320 : 170,
                  backgroundColor: '#1e88e5',
                  marginTop: '20px',
                  marginBottom: width < 600 ? 30 : 0,
                  '&:hover': {
                    backgroundColor: '#0d47a1',
                    color: '#fff',
                  },
                  marginLeft: 1,
                }}
                variant='contained'
                onClick={() => {
                  onAddService()
                }}
              >
                Add
              </Button>
            </section>
          )}
        </Tooltip>
      </section>
      {/* </section> */}
    </>
  )
}

function mapStateToProps(state) {
  if (state) {
    return {
      addService: state.services,
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(ServiceAction, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddService)
