/**
 * Author: Prit Ajaykumar Sorathiya - B00890175
 */

import React, { useEffect, useState } from 'react'
import './CustomerProfilePage.css'
import { Button, FormControl, TextField, Tooltip } from '@mui/material'
import useWindowDimensions, {
  getCustomerUser,
  getUserType,
  hasToken,
} from '../../../utils/scale'
import { makeStyles } from '@mui/styles'
import DialogAlert from '../../../components/DialogAlert'
import swal from 'sweetalert'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userAction from '../../../action/userAction'
import ArrowBackIos from '@mui/icons-material/ArrowBackIos'

/**
 * CustomerProfilePage Component is used to display the customer profile details
 */
const CustomerProfilePage = (props) => {
  const { width } = useWindowDimensions()

  const [isProfileMenuOpen, setisProfileMenuOpen] = useState(false)
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState('info')
  const [profileImg, setProfileImg] = useState()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [mobileNo, setMobileNo] = useState('')
  const [about, setAbout] = useState('')
  const [address, setAddress] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [userData, setUserData] = useState()

  useEffect(() => {
    if (!hasToken() || getUserType() !== 'customer') {
      window.location.href = '/customer/notloggedin/'
    } else {
      var userInfo = getCustomerUser()
      if (userInfo) {
        userInfo = JSON.parse(userInfo)
      }

      props.action
        .getCustomerUser(userInfo.email)
        .then((res) => {
          setUserData(res?.user)
          setName(`${res?.user?.firstname} ${res?.user?.lastname}`)
          setEmail(res?.user?.email)
          setMobileNo(res?.user?.phoneno)
          res?.user?.address && setAddress(res?.user?.address)
          res?.user?.photoUrl && setProfileImg(res?.user?.photoUrl)
          setAbout(res?.user?.about)
        })
        .catch((err) => {
          console.log('err', err)
        })
    }

    if (width > 800) {
      setisProfileMenuOpen(false)
    }
  }, [width])

  const handleChangeInput = (event) => {
    const value = event.target.value

    switch (event.target.id) {
      case 'name':
        setName(value)
        break
      case 'email':
        setEmail(value)
        break
      case 'mobileno':
        setMobileNo(value)
        break
      case 'about':
        setAbout(value)
        break
      case 'address':
        setAddress(value)
        break
      case 'newpassword':
        setPassword(value)
        break
      case 'confirmnewpass':
        setConfirmPassword(value)
        break
      default:
        break
    }
  }

  const useStyles = makeStyles((theme) => ({
    textField: {
      borderBottom: '1px solid white !important',
      '&:hover': {
        border: 'none !important',
      },
    },
  }))

  const handleFileChange = (event) => {
    const { target } = event
    const { files } = target

    if (files && files[0]) {
      var reader = new FileReader()

      reader.onload = (event) => {
        setProfileImg(event.target.result)
      }

      reader.readAsDataURL(files[0])
    }
  }

  const changePassword = () => {
    if (password === confirmPassword) {
      const value = {
        password: password.trim(),
      }
      props.action
        .updateCustomerUser(email, value)
        .then((res) => {
          swal('Password updated successfully', '', 'success')
        })
        .catch((err) => {
          console.log('err', err)
        })
    } else {
      swal('Password does not match', '', 'error')
    }
  }

  const updateProfile = () => {
    const value = {
      photoUrl: profileImg,
      firstname: name.split(' ')[0],
      lastname: name.split(' ')[1],
      phoneno: mobileNo,
      address: address,
      about: about,
    }
    props.action
      .updateCustomerUser(email, value)
      .then((res) => {
        swal('Profile updated successfully', '', 'success')
      })
      .catch((err) => {
        swal('Profile update fails', '', 'error')
      })
  }

  const deleteProfile = () => {
    props.action
      .deleteCustomerUser(email)
      .then((res) => {
        swal('Profile deleted successfully', '', 'success').then(() => {
          logout()
        })
      })
      .catch((err) => {
        swal(err.message, '', 'error')
      })
  }

  const logout = () => {
    localStorage.removeItem('accesstoken')
    localStorage.removeItem('usertype')
    localStorage.removeItem('professional')
    window.location.href = '/'
  }

  const profilePersonalDetailView = (isMenu) => {
    return (
      <section className='profile-view'>
        <section className='profile-img-view'>
          <section className='profile-img'>
            <img
              src={
                profileImg || require('../../../asserts/logo/app/Capture.JPG')
              }
              alt='profile_image'
              width={'100%'}
              height={'100%'}
            />
          </section>
        </section>
        <div style={{ flexDirection: 'column', display: 'flex' }}>
          <input
            id='car'
            type='file'
            accept='image/*'
            capture='camera'
            onChange={handleFileChange}
            style={{
              backgroundColor: 'red',
              position: 'absolute',
              alignSelf: 'center',
              padding: '10px 10px',
              marginTop: '5px',
              opacity: 0,
            }}
          />
          <div
            style={{
              alignSelf: 'center',
              boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
              backgroundColor: '#f1f1f1',
              padding: '10px 10px',
              marginTop: '5px',
            }}
          >
            Upload Profile Image
          </div>
        </div>

        <FormControl sx={{ width: '92%', marginTop: '30px' }}>
          <section>
            <p className='profile-personal-title'>Name</p>
            <Tooltip title='Not-editable'>
              <TextField
                required
                variant='standard'
                id='name'
                type='text'
                sx={{
                  width: '100%',
                  paddingTop: '10px',
                }}
                value={name}
                placeholder='Tom Holland'
              />
            </Tooltip>
          </section>

          <section>
            <p className='profile-personal-title'>Email</p>
            <Tooltip title='Not-editable'>
              <TextField
                required
                variant='standard'
                id='email'
                type='text'
                sx={{
                  width: '100%',
                  paddingTop: '10px',
                }}
                value={email}
                placeholder='tomholland@gmail.com'
              />
            </Tooltip>
          </section>

          <section>
            <p className='profile-personal-title'>Mobile No.</p>
            <TextField
              required
              variant='standard'
              id='mobileno'
              type='text'
              inputProps={{ maxLength: 10 }}
              sx={{
                width: '100%',
                paddingTop: '10px',
              }}
              value={mobileNo}
              placeholder='+19029029021'
              onChange={handleChangeInput}
            />
          </section>
        </FormControl>

        <Button
          sx={{
            backgroundColor: '#1e88e5',
            marginTop: '30px',
            '&:hover': {
              backgroundColor: '#0d47a1',
              color: '#fff',
            },
          }}
          variant='contained'
          onClick={() => logout()}
        >
          Logout
        </Button>
        <section></section>
        <Button
          sx={{
            marginTop: '10px',
            display: isMenu ? 'flex' : 'none',
          }}
          variant='text'
          onClick={() => setisProfileMenuOpen(false)}
        >
          <ArrowBackIos fontSize='small' />
          Go Back
        </Button>
      </section>
    )
  }

  const infoView = () => {
    return (
      <section>
        <FormControl sx={{ width: '92%', marginTop: '30px' }}>
          <section>
            <p className='detail-view-title-text'>About</p>
            <TextField
              required
              variant='outlined'
              id='about'
              sx={{
                width: '100%',
                paddingTop: '10px',
              }}
              multiline
              minRows={3}
              type='text'
              value={about}
              placeholder='Lorem Ipsum....'
              onChange={handleChangeInput}
            />
          </section>

          <section>
            <p className='detail-view-title-text'>Address</p>
            <TextField
              required
              variant='standard'
              id='address'
              sx={{
                width: '100%',
                paddingTop: '10px',
              }}
              type='text'
              value={address}
              placeholder='Halifax, NS, B3L 4P7'
              onChange={handleChangeInput}
            />
          </section>
        </FormControl>
        <Button
          sx={{
            marginTop: '30px',
            '&:hover': {
              color: '#fff',
            },
          }}
          color='error'
          variant='contained'
          onClick={() => {
            swal({
              title: 'Delete Account',
              text: 'Are you sure want to delete the account?',
              icon: 'warning',
              buttons: true,
              dangerMode: true,
            }).then((willDelete) => {
              if (willDelete) {
                deleteProfile()
              }
            })
          }}
        >
          Delete Account
        </Button>
        <DialogAlert
          open={isAlertOpen}
          title='Delete Account'
          message='Are you sure want to delete the account?'
          handleClose={() => {
            setIsAlertOpen(false)
          }}
          handleOpen={() => {
            setIsAlertOpen(false)
          }}
        />
      </section>
    )
  }

  const changePasswordView = () => {
    return (
      <section>
        <FormControl sx={{ width: '92%', marginTop: '30px' }}>
          <section>
            <p className='profile-personal-title'>New Password</p>
            <TextField
              required
              variant='standard'
              id='newpassword'
              sx={{
                width: '100%',
                paddingTop: '10px',
              }}
              type='password'
              value={password}
              placeholder='********'
              onChange={handleChangeInput}
            />
          </section>

          <section>
            <p className='profile-personal-title'>Confirm New Password</p>
            <TextField
              required
              variant='standard'
              id='confirmnewpass'
              sx={{
                width: '100%',
                paddingTop: '10px',
              }}
              type='password'
              value={confirmPassword}
              placeholder='********'
              onChange={handleChangeInput}
            />
          </section>
        </FormControl>

        <Button
          sx={{
            backgroundColor: '#1e88e5',
            marginTop: '30px',
            '&:hover': {
              backgroundColor: '#0d47a1',
              color: '#fff',
            },
          }}
          variant='contained'
          onClick={() => changePassword()}
        >
          Change
        </Button>
      </section>
    )
  }
  console.log('first', isProfileMenuOpen)
  return (
    <>
      <section>
        {width > 800 && (
          <aside className='split left'>
            {profilePersonalDetailView(false)}
          </aside>
        )}

        <section
          className={
            width < 800
              ? isProfileMenuOpen
                ? 'split menu'
                : 'inactive'
              : 'inactive'
          }
        >
          {profilePersonalDetailView(true)}
        </section>

        <section
          className={
            isProfileMenuOpen
              ? 'inactive'
              : width < 800
              ? 'split responsiveRight'
              : 'split right'
          }
        >
          {width < 800 && (
            <Button onClick={() => setisProfileMenuOpen(true)}>
              My Profile
            </Button>
          )}
          <section className='row-option'>
            <text
              className={
                selectedOption === 'info'
                  ? 'profile-option-btn left-option selected'
                  : 'profile-option-btn left-option'
              }
              onClick={() => setSelectedOption('info')}
            >
              info
            </text>
            <text
              className={
                selectedOption === 'changepass'
                  ? 'profile-option-btn right-option selected'
                  : 'profile-option-btn right-option'
              }
              onClick={() => setSelectedOption('changepass')}
            >
              change password
            </text>
          </section>
          <section className='detail-view'>
            {selectedOption === 'info' && infoView()}
            {selectedOption === 'changepass' && changePasswordView()}
          </section>
          <Button
            sx={{
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
              updateProfile()
            }}
          >
            Update Profile
          </Button>
        </section>
      </section>
    </>
  )
}

function mapStateToProps(state) {
  if (state) {
    return {
      userInfo: state.user,
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(userAction, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerProfilePage)
