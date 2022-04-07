import React, { useState, useEffect } from 'react'
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
import Badge from '@mui/material/Badge'
import { bindActionCreators } from 'redux'
import * as cartAction from '../../../action/cartAction'
import { connect } from 'react-redux'

import * as MENU from '../../../utils/constant'
import { makeStyles } from '@mui/styles'
import { hasToken } from '../../../utils/scale'

const NavBar = (props) => {
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
  const [cartItemsCount, setCartItemsCount] = useState(
    props?.cartData?.cartData?.cartItems?.length || 0
  )

  // console.log("NAV BAR PROPS ", props.cartData.cartData.cartItems.length)

  useEffect(() => {
    setCartItemsCount(props?.cartData?.cartData?.cartItems?.length)
  }, [props?.cartData])

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

  const navigateToCarpentryServices = () => {
    handleClose()
    navigate('./carpentryservices')
  }

  const navigateToPlumbingServices = () => {
    handleClose()
    navigate('./plumbingservices')
  }

  const navigateToCart = () => {
    navigate('./cartpage')
  }

  const handleClick = (event) => {
    setServiceOption(event.currentTarget)
  }

  const handleClose = () => {
    setServiceOption(null)
    handleCloseNavMenu()
  }

  const handlePageClicks = (pages) => {
    if (pages === 'Support') {
      navigate('/support')
    }
    handleCloseNavMenu()
  }

  const onProfileOptionClick = (item) => {
    console.log(item)
    if (item === 'Login As Customer/Professional') {
      window.location.href = '/userlogin'
    } else if (item === 'Signup As Professional') {
      window.location.href = '/signupprofessional'
    } else if (item === 'My Profile') {
      if (localStorage.getItem('usertype') === 'professional') {
        window.location.href = '/professional/myprofile/'
      } else if (localStorage.getItem('usertype') === 'customer') {
        window.location.href = '/customer/myprofile/'
      } else {
        alert('Please login in to continue')
      }
    } else if (item === 'My Order History') {
      window.location.href = '/myorders'
    } else if (item === 'Logout') {
      localStorage.removeItem('accesstoken')
      localStorage.removeItem('usertype')
      window.location.href = '/'
    }
    handleCloseUserMenu()
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
        {MENU.PAGES.map((page, index) => (
          <React.Fragment key={index.toString()}>
            <Button
              key={index.toString()}
              //   onClick={handleCloseNavMenu}
              onClick={
                page === 'Services' ? handleClick : () => handlePageClicks(page)
              }
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
          {MENU.PAGES.map((page) => (
            <MenuItem
              key={page}
              onClick={
                page === 'Services' ? handleClick : () => handlePageClicks(page)
              }
            >
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
          <IconButton sx={{ paddingRight: 1 }} onClick={navigateToCart}>
            <Badge color='secondary' badgeContent={cartItemsCount}>
              <ShoppingCartIcon fontSize='large' sx={{ color: 'white' }} />
            </Badge>
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
          {hasToken()
            ? MENU.PROFILE_SETTINGS_WITH_TOKEN.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => onProfileOptionClick(setting)}
                >
                  <Typography textAlign='center'>{setting}</Typography>
                </MenuItem>
              ))
            : MENU.PROFILE_SETTINGS_WITHOUT_TOKEN.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => onProfileOptionClick(setting)}
                >
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
        <MenuItem onClick={navigateToPlumbingServices}>
          Plumbing Services
        </MenuItem>
        <MenuItem onClick={navigateToCarpentryServices}>
          Carpentry Services
        </MenuItem>
      </Menu>
    )
  }

  return (
    <AppBar position='static' style={{ backgroundColor: '#2a2a2a' }}>
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

function mapStateToProps(state) {
  if (state) {
    return {
      cartData: state.cart,
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(cartAction, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
