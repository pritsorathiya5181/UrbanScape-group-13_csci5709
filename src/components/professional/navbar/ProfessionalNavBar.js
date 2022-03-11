import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import * as PATH from '../../../utils/Scale'
import Dropdown from '../dropdown/Dropdown'

const ProfessionalNavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [dropdown, setDropdown] = useState(false)

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false)
    } else {
      setDropdown(true)
    }
  }

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false)
    } else {
      setDropdown(false)
    }
  }

  const logout = () => {
    //perform logout action here
  }

  return (
    <React.Fragment>
      <nav className='navbar'>
        <Link
          to={`/professional`}
          className='navbar-logo'
          onClick={() => setIsMenuOpen(false)}
        >
          Urban Halifax
          {/* <i class='fas fa-city' /> */}
        </Link>
        <figure
          className='menu-icon'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <i className={isMenuOpen ? 'fas fa-times' : 'fas fa-bars'} />
        </figure>
        <ul className={isMenuOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link
              to={`/professional`}
              className='nav-links'
              onClick={closeMenu}
            >
              My Profile
            </Link>
          </li>
          <li
            className='nav-item'
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <Link
              to={`${PATH.partnerBaseUrl}/myservices`}
              className='nav-links'
              onClick={closeMenu}
            >
              Services <i className='fas fa-caret-down' />
            </Link>
            {dropdown && <Dropdown />}
          </li>
          <li className='nav-item'>
            <Link
              // to={`${PATH.partnerBaseUrl}/products`}
              to={`/professional`}
              className='nav-links'
              onClick={closeMenu}
            >
              Schedule
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              // to={`${PATH.partnerBaseUrl}contact-us`}
              to={`/professional`}
              className='nav-links'
              onClick={closeMenu}
            >
              Contact Us
            </Link>
          </li>
          <li>
            <Link
              // to={`${PATH.partnerBaseUrl}/home`}
              to={`/`}
              className='nav-links-mobile'
              onClick={() => logout()}
            >
              Logout
            </Link>
          </li>
        </ul>
        <Link
          // to={`${PATH.partnerBaseUrl}/home`}
          to={`/`}
        >
          <button className='btn'>Logout</button>
        </Link>
      </nav>
    </React.Fragment>
  )
}

export default ProfessionalNavBar
