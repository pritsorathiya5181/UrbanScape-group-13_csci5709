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

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import HouseIcon from '@mui/icons-material/House'
import PersonIcon from '@mui/icons-material/Person'
import MenuIcon from '@mui/icons-material/Menu'

import * as MENU from '../../../utils/constant'
import { makeStyles } from '@mui/styles'

const ResponsiveAppBar = () => {
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
  const [serviceOption, setServiceOption] = useState(null)

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
    navigate('./')
  }

  const navigateToBeautyServices = () => {
    handleClose()
    navigate('./beautyservices')
  }

  const handleClick = (event) => {
    setServiceOption(event.currentTarget)
  }

  const handleClose = () => {
    setServiceOption(null)
  }

  const openMenu = Boolean(serviceOption)

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
        {MENU.pages.map((page, index) => (
          <>
            <Button
              key={index.toString()}
              //   onClick={handleCloseNavMenu}
              onClick={page === 'Services' ? handleClick : handleCloseNavMenu}
              sx={{
                my: 2,
                color: 'white',
                // display: 'block',
                fontSize: '20px',
                fontWeight: 'bold',
                textTransform: 'capitalize',
                paddingRight: '15px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {page}
              {page === 'Services' && <KeyboardArrowDownIcon />}
            </Button>
          </>
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
          {MENU.pages.map((page) => (
            <MenuItem key={page} onClick={handleCloseNavMenu}>
              <Typography textAlign='center'>{page}</Typography>
              {page === 'Services' && <ArrowDropDownIcon />}
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
        <Tooltip title='Open cart'>
          <IconButton sx={{ paddingRight: 1 }}>
            <ShoppingCartIcon fontSize='large' sx={{ color: 'white' }} />
          </IconButton>
        </Tooltip>
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
          {MENU.profileSettings.map((setting) => (
            <MenuItem key={setting} onClick={handleCloseUserMenu}>
              <Typography textAlign='center'>{setting}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    )
  }

  const renderServiceView = () => {
    return (
      <Menu
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        id='menu-list'
        open={openMenu}
        onClose={handleClose}
        anchorEl={serviceOption}
      >
        <MenuItem onClick={navigateToBeautyServices}>Beauty Services</MenuItem>
        <MenuItem onClick={handleClose}>Home Repair Services</MenuItem>
      </Menu>
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

          {renderServiceView()}
          {renderProfileView()}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default ResponsiveAppBar
