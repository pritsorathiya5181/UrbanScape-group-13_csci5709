import React, { useEffect, useState } from 'react'
import './ProfilePage.css'
import NavBar from '../../components/professional/NavBar/NavBar'
import PersonIcon from '@mui/icons-material/Person'
import { Button, FormControl, TextField } from '@mui/material'
import useWindowDimensions from '../../utils/scale'

const ProfilePage = () => {
  const { width } = useWindowDimensions()
  const [isProfileMenuOpen, setisProfileMenuOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState('info')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [mobileNo, setMobileNo] = useState('')
  const [about, setAbout] = useState('')
  const [experience, setExperience] = useState('')
  const [workedHours, setWorkedHours] = useState('')
  const [address, setAddress] = useState('')

  useEffect(() => {
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
      default:
        break
    }
  }

  const profilePersonalDetailView = () => {
    return (
      <section className='profile-view'>
        <section className='profile-img-view'>
          <section className='profile-img'>
            <PersonIcon fontSize='large' />
          </section>
        </section>

        <FormControl sx={{ width: '92%', marginTop: '30px' }}>
          <section>
            <p className='profile-personal-title'>Name</p>
            <TextField
              required
              variant='standard'
              id='name'
              sx={{
                width: '100%',
                paddingTop: '10px',
              }}
              type='text'
              value={name}
              placeholder='Tom Holland'
              onChange={handleChangeInput}
            />
          </section>

          <section>
            <p className='profile-personal-title'>Email</p>
            <TextField
              required
              variant='standard'
              id='email'
              sx={{
                width: '100%',
                paddingTop: '10px',
              }}
              type='text'
              value={email}
              placeholder='tomholland@gmail.com'
              onChange={handleChangeInput}
            />
          </section>

          <section>
            <p className='profile-personal-title'>Mobile No.</p>
            <TextField
              required
              variant='standard'
              id='mobileno'
              sx={{
                width: '100%',
                paddingTop: '10px',
              }}
              type='text'
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
        >
          Logout
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
              id='name'
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
                id='name'
                sx={{
                  width: '8%',
                  padding: '0px 10px',
                  justifyContent: 'flex-end',
                  height: '40px',
                }}
                inputProps={{ min: 0, style: { textAlign: 'center' } }}
                type='text'
                value={experience}
                placeholder='i.e. 2,3'
                onChange={handleChangeInput}
              />
              <p className=''>Years</p>
            </section>
            <section className='row-option'>
              <p className=''>Worked hours</p>
              <TextField
                required
                variant='standard'
                id='name'
                sx={{
                  width: '11%',
                  padding: '0px 10px',
                  justifyContent: 'flex-end',
                  height: '40px',
                }}
                inputProps={{ min: 0, style: { textAlign: 'center' } }}
                type='text'
                value={workedHours}
                placeholder='i.e. 150, 200'
                onChange={handleChangeInput}
              />
              <p className=''>Hours</p>
            </section>
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
        >
          Delete Account
        </Button>
      </section>
    )
  }

  const changePasswordView = () => {
    return (
      <section>
        <text>change password</text>
      </section>
    )
  }
  console.log('first', isProfileMenuOpen)
  return (
    <>
      <NavBar />

      <section>
        {width < 800 && (
          <PersonIcon
            onClick={() => setisProfileMenuOpen(!isProfileMenuOpen)}
          />
        )}
        {width > 800 && (
          <aside className='split left'>{profilePersonalDetailView()}</aside>
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
          {profilePersonalDetailView()}
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
          <section className='row-option'>
            <text
              className={
                selectedOption === 'info'
                  ? 'profile-option-btn selected'
                  : 'profile-option-btn'
              }
              onClick={() => setSelectedOption('info')}
            >
              info
            </text>
            <text
              className={
                selectedOption === 'changepass'
                  ? 'profile-option-btn selected'
                  : 'profile-option-btn'
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
        </section>
      </section>
    </>
  )
}

export default ProfilePage
