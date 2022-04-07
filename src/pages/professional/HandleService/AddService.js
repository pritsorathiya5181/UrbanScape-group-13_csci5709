/**
 * Author: Prit Ajaykumar Sorathiya - B00890175
 */

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
import { connect } from 'react-redux'
import Loader from '../../../components/customloader/Loader'
import NavBar from '../../../components/professional/NavBar/NavBar'
import useWindowDimensions, {
  getProfessionalUser,
  getUserType,
  hasToken,
} from '../../../utils/scale'
import AddIcon from '@mui/icons-material/Add'
import * as ServiceAction from '../../../action/ServiceAction'
import * as serviceCategoryAction from '../../../action/serviceCategoryAction'
import * as PATH from '../../../utils/string'

/**
 * AddService Component is used to add new service
 */
const AddService = (props) => {
  const navigate = useNavigate()
  const { state } = useLocation()
  const { width } = useWindowDimensions()

  const [category, setCategory] = useState('')
  const [serviceName, setServiceName] = useState('')
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
  const [serviceLoading, setServiceLoading] = useState(false)
  const [staticServices, setStaticServices] = useState(
    props.serviceCategories || []
  )

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
    if (!hasToken() || getUserType() !== 'professional') {
      window.location.href = '/notloggedin/'
    }

    if (
      category?.length > 0 &&
      serviceName?.length > 0 &&
      photos.length > 1 &&
      location.length > 0 &&
      description.length > 0
    ) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }

    if (state?.isUpdate && state?.serviceData) {
      const data = state.serviceData

      setCategory(category || data?.serviceCategory)
      setServiceName(serviceName || data?.serviceName)
      photos.length > 1
        ? setPhotos(photos || data?.serviceImage)
        : setPhotos(data?.serviceImage)
      setLocation(location || data?.serviceLocation)
      setDescription(description || data?.serviceDescription)
    }
  }, [
    category,
    serviceName,
    photos,
    location,
    fromTime,
    toTime,
    description,
    state?.isUpdate,
    state?.serviceData,
  ])

  useEffect(() => {
    props.serviceCatAction
      .getServices()
      .then((res) => {
        console.log('Static services', res)
        setStaticServices(res?.serviceCategories)
      })
      .catch((err) => {
        console.log('Add Cart Item Error', err)
      })
  }, [props.serviceCatAction])

  const onSelectCategory = (event) => {
    setCategory(event.target.value)
    setServiceName('')
  }

  const onSelectServiceName = (event) => {
    setServiceName(event.target.value)
  }

  const handleChangeInput = (event) => {
    const value = event.target.value
    switch (event.target.id) {
      case 'location':
        setLocation(value)
        break
      case 'FromTime':
        setFromTime(value)
        break
      case 'ToTime':
        setToTime(value)
        break
      case 'description':
        setDescription(value)
        break
      default:
        break
    }
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
    var userInfo = getProfessionalUser()
    if (userInfo) {
      userInfo = JSON.parse(userInfo)
    }

    const serviceObj = {
      serviceId: uuidv4(),
      serviceCategory: category,
      serviceName: serviceName,
      serviceLocation: location,
      serviceImage: photos,
      serviceDescription: description,
      userId: userInfo?._id,
    }

    setServiceLoading(true)
    props.action
      .addService(serviceObj)
      .then((res) => {
        setServiceLoading(false)
        navigate(`${PATH.partnerBaseUrl}/myservices`)
      })
      .catch((err) => {
        setServiceLoading(false)
        console.log('add service error', err)
      })
  }

  const onUpdateService = () => {
    const updateServiceObj = {
      subjectId: state?.serviceData?.subjectId,
      serviceCategory: category,
      serviceName: serviceName,
      serviceLocation: location,
      serviceImage: photos,
      serviceDescription: description,
    }

    setServiceLoading(true)
    props.action
      .updateService(updateServiceObj, state?.serviceData?.serviceId)
      .then((res) => {
        console.log('res', res)
        setServiceLoading(false)
        navigate(`${PATH.partnerBaseUrl}/myservices`)
      })
      .catch((err) => {
        setServiceLoading(false)
        console.log('update service error', err)
      })
  }

  const onDeleteService = () => {
    setServiceLoading(true)

    props.action
      .deleteService(state?.serviceData?.serviceId)
      .then((res) => {
        console.log('res', res)
        setServiceLoading(false)
        navigate(`${PATH.partnerBaseUrl}/myservices`)
      })
      .catch((err) => {
        setServiceLoading(false)
        console.log('delete service error', err)
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

      <section className='centered-view'>
        {serviceLoading ? (
          <div className={'centered-loader'}>
            <Loader />
          </div>
        ) : (
          <div className={width >= 700 && 'form-view'}>
            <section className='row'>
              <p className='serviceTitle'>Category</p>
              <FormControl sx={{ width: getWidth(), textAlign: 'left' }}>
                <Select
                  displayEmpty
                  labelId='demo-simple-select-helper-label'
                  id='demo-simple-select-helper'
                  value={category}
                  onChange={onSelectCategory}
                  placeholder='Select Category'
                >
                  <MenuItem disabled value=''>
                    <em>Select a category...</em>
                  </MenuItem>
                  {staticServices
                    .map((item) => item.serviceCategory)
                    .map((name) => {
                      return (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      )
                    })}
                </Select>
              </FormControl>
            </section>
            <section className='row'>
              <p className='serviceTitle'>Name</p>
              <FormControl sx={{ width: getWidth(), textAlign: 'left' }}>
                <Select
                  displayEmpty
                  labelId='demo-simple-select-helper-label'
                  id='demo-simple-select-helper'
                  value={serviceName}
                  onChange={onSelectServiceName}
                  placeholder='Select Category'
                >
                  <MenuItem disabled value=''>
                    <em>Select a category...</em>
                  </MenuItem>
                  {staticServices.map((item) => {
                    if (item.serviceCategory === category) {
                      return item.services.map((name) => (
                        <MenuItem
                          key={name.serviceName}
                          value={name.serviceName}
                        >
                          {name.serviceName}
                        </MenuItem>
                      ))
                    }
                  })}
                </Select>
              </FormControl>
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

            {state?.isUpdate ? (
              <section>
                <Tooltip
                  title={
                    isDisabled
                      ? 'Please enter all the details'
                      : 'Update service'
                  }
                >
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
                    }}
                    variant='contained'
                    onClick={() => {
                      onUpdateService()
                    }}
                  >
                    Update
                  </Button>
                </Tooltip>
                <Tooltip
                  title={
                    isDisabled
                      ? 'Please enter all the details'
                      : 'Delete service'
                  }
                >
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
                      onDeleteService()
                    }}
                  >
                    Delete
                  </Button>
                </Tooltip>
              </section>
            ) : (
              <Tooltip
                title={
                  isDisabled
                    ? 'Please enter all the details'
                    : 'Add new service'
                }
              >
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
              </Tooltip>
            )}
          </div>
        )}
      </section>
    </>
  )
}

function mapStateToProps(state) {
  if (state) {
    return {
      addService: state.services,
      serviceCategories: state.serviceCategories.serviceCategories,
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(ServiceAction, dispatch),
    serviceCatAction: bindActionCreators(serviceCategoryAction, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddService)
