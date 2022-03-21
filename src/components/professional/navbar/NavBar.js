import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Container,
  Button,
  Tooltip,
  AppBar,
} from '@mui/material'
import HouseIcon from '@mui/icons-material/House'
import PersonIcon from '@mui/icons-material/Person'
import MenuIcon from '@mui/icons-material/Menu'
import * as MENU from '../../../utils/constant'
import * as PATH from '../../../utils/string'
import { makeStyles } from '@mui/styles'

const NavBar = () => {
  let navigate = useNavigate()

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    toolbar: {
      height: '50px',
    },
  }))
  const classes = useStyles()

  const [pageNavOption, setPageNameOption] = useState(null)
  const [profileSettingOption, setProfileSettingOption] = useState(null)
  const handleOpenNavMenu = (event) => {
    setPageNameOption(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setProfileSettingOption(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setPageNameOption(null)
  }

  const handleCloseUserMenu = () => {
    setProfileSettingOption(null)
  }

  const navigateToHome = () => {
    navigate('/professional')
  }

  const navigatePages = (endpoint) => {
    if (endpoint === 'Services') {
      navigate(`${PATH.partnerBaseUrl}/myservices`)
    } else if (endpoint === 'Schedule') {
      navigate(`${PATH.partnerBaseUrl}`)
    }
    handleCloseNavMenu()
  }

  const renderAppIconView = () => {
    return (
      <IconButton
        edge='start'
        color='inherit'
        aria-label='menu'
        onClick={navigateToHome}
      >
        <HouseIcon fontSize='large' sx={{ color: 'white' }} />
        <Typography style={{ paddingLeft: '10px' }} variant='h6'>
          UrbanScape
        </Typography>
      </IconButton>
    )
  }

  const renderPagesListingView = () => {
    return (
      <Box
        sx={{
          width: '100%',
          justifyContent: 'center',
          display: { xs: 'none', md: 'flex' },
        }}
      >
        {MENU.PROFESSIONAL_PAGES.map((page, index) => (
          <React.Fragment key={index.toString()}>
            <Button
              key={index.toString()}
              onClick={() => navigatePages(page)}
              sx={{
                my: 2,
                color: 'white',
                fontSize: '20px',
                fontWeight: 'bold',
                textTransform: 'capitalize',
                paddingRight: '15px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {page}
            </Button>
          </React.Fragment>
        ))}
      </Box>
    )
  }

  const renderResponsiveMenu = () => {
    return (
      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
        <IconButton
          size='large'
          aria-label='account of current user'
          aria-controls='menu-appbar'
          aria-haspopup='true'
          onClick={handleOpenNavMenu}
          color='inherit'
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id='menu-appbar'
          anchorEl={pageNavOption}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={Boolean(pageNavOption)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: 'block', md: 'none' },
          }}
        >
          {MENU.PROFESSIONAL_PAGES.map((page) => (
            <MenuItem key={page} onClick={() => navigatePages(page)}>
              <Typography textAlign='center'>{page}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    )
  }

  const renderProfileView = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          width: { md: '120px', xs: 'fit-content' },
        }}
      >
        <Tooltip title='Open settings'>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <PersonIcon fontSize='large' sx={{ color: 'white' }} />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id='menu-appbar'
          anchorEl={profileSettingOption}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(profileSettingOption)}
          onClose={handleCloseUserMenu}
        >
          {MENU.PROFESSIONAL_PROFILE_SETTINGS.map((setting) => (
            <MenuItem key={setting} onClick={handleCloseUserMenu}>
              <Typography textAlign='center'>{setting}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    )
  }

  return (
    <AppBar position='static'>
      <Container maxWidth='100%'>
        <Toolbar disableGutters className={classes.toolbar}>
          <Box
            noWrap
            component='div'
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            {renderAppIconView()}
          </Box>

          {renderPagesListingView()}
          {renderResponsiveMenu()}

          <Box
            noWrap
            component='div'
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            {renderAppIconView()}
          </Box>

          {renderProfileView()}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default NavBar
