/*  Author: Prit Ajaykumar Sorathiya - B00890175 */

import React, { useEffect, useState } from 'react'
import './ProfessionalProfilePage.css'
import NavBar from '../../../components/professional/NavBar/NavBar'
import { Button, FormControl, TextField, Tooltip } from '@mui/material'
import useWindowDimensions, {
  getProfessionalUser,
  getUserType,
  hasToken,
} from '../../../utils/scale'
import { makeStyles } from '@mui/styles'
import DialogAlert from '../../../components/DialogAlert'
import ArrowBackIos from '@mui/icons-material/ArrowBackIos'
import swal from 'sweetalert'
import * as userAction from '../../../action/userAction'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const ProfessionalProfilePage = (props) => {
  const { width } = useWindowDimensions()

  const [isProfileMenuOpen, setisProfileMenuOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState('info')
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [profileImg, setProfileImg] = useState()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [mobileNo, setMobileNo] = useState('')
  const [about, setAbout] = useState('')
  const [experience, setExperience] = useState('')
  const [workedHours, setWorkedHours] = useState('')
  const [address, setAddress] = useState('')
  const [userData, setUserData] = useState()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  useEffect(() => {
    if (!hasToken() || getUserType() !== 'professional') {
      window.location.href = '/notloggedin/'
    } else {
      var userInfo = getProfessionalUser()
      if (userInfo) {
        userInfo = JSON.parse(userInfo)
      }

      console.log('userInfo', userInfo)

      props.action
        .getProfessionalUser(userInfo.email)
        .then((res) => {
          setUserData(res?.user)
          setName(`${res?.user?.firstname} ${res?.user?.lastname}`)
          setEmail(res?.user?.email)
          setMobileNo(res?.user?.phoneno)
          setExperience(res?.user?.experience)
          setAddress(res?.user?.preferredlocation)
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
      case 'experience':
        setExperience(value)
        break
      case 'workedhours':
        setWorkedHours(value)
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
        .updateProfessionalUser(email, value)
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
      preferredlocation: address,
      experience: experience,
      about: about,
    }
    props.action
      .updateProfessionalUser(email, value)
      .then((res) => {
        swal('Profile updated successfully', '', 'success')
      })
      .catch((err) => {
        swal('Profile update fails', '', 'error')
      })
  }

  const deleteProfile = () => {
    props.action
      .deleteProfessionalUser(email)
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

  const classes = useStyles()

  const profilePersonalDetailView = (isMenu) => {
    return (
      <section className='profile-view'>
        <section className='profile-img-view'>
          <section className='profile-img'>
            {/* <PersonIcon fontSize='large' /> */}
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

        <FormControl
          sx={{
            width: '92%',
            marginTop: '30px',
            // boxShadow: isMenu && '6px 6px 16px 0 grey',
            // borderRadius: isMenu && '15px',
            // padding: isMenu && '10px',
          }}
        >
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
                // InputProps={{ style: { color: isMenu && 'white' } }}
                // className={isMenu && classes.textField}
                value={name}
                placeholder='Tom Holland'
                // onChange={handleChangeInput}
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
                // InputProps={{ style: { color: isMenu && 'white' } }}
                // className={isMenu && classes.textField}
                value={email}
                placeholder='tomholland@gmail.com'
                // onChange={handleChangeInput}
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
              sx={{
                width: '100%',
                paddingTop: '10px',
              }}
              // InputProps={{ style: { color: isMenu && 'white' } }}
              // className={isMenu && classes.textField}
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
            // color: 'white !important',
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
            <p className='detail-view-title-text'>Overview</p>
            <section className='row-option'>
              <p className=''>Exerience</p>
              <TextField
                required
                variant='standard'
                id='experience'
                sx={{
                  width: '8%',
                  padding: '0px 10px',
                  justifyContent: 'flex-end',
                  height: '40px',
                }}
                inputProps={{ min: 0, style: { textAlign: 'center' } }}
                type='number'
                value={experience}
                placeholder='i.e. 2,3'
                onChange={handleChangeInput}
              />
              <p className=''>Years</p>
            </section>
            {/* <section className='row-option'>
              <p className=''>Worked hours</p>
              <TextField
                required
                variant='standard'
                id='hours'
                sx={{
                  width: '11%',
                  padding: '0px 10px',
                  justifyContent: 'flex-end',
                  height: '40px',
                }}
                inputProps={{ min: 0, style: { textAlign: 'center' } }}
                type='number'
                value={workedHours}
                placeholder='i.e. 150, 200'
                onChange={handleChangeInput}
              />
              <p className=''>Hours</p>
            </section> */}
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
            // setIsAlertOpen(true)
            swal({
              title: 'Delete Account',
              text: 'Are you sure want to delete the account?',
              icon: 'warning',
              buttons: true,
              dangerMode: true,
            }).then(() => {
              deleteProfile()
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
          onClick={() => {
            changePassword()
          }}
        >
          Change
        </Button>
      </section>
    )
  }

  return (
    <>
      <NavBar />

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
            <small
              className={
                selectedOption === 'info'
                  ? 'profile-option-btn left-option selected'
                  : 'profile-option-btn left-option'
              }
              onClick={() => setSelectedOption('info')}
            >
              info
            </small>
            <small
              className={
                selectedOption === 'changepass'
                  ? 'profile-option-btn right-option selected'
                  : 'profile-option-btn right-option'
              }
              onClick={() => setSelectedOption('changepass')}
            >
              change password
            </small>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfessionalProfilePage)
