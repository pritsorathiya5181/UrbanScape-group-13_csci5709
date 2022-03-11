import React, { useEffect, useState } from 'react'
import { ServiceItem } from '../../../utils/service'
import './Dropdown.css'
import { Link } from 'react-router-dom'

const Dropdown = () => {
  const [click, setClick] = useState(false)

  const handleClick = () => setClick(!click)

  useEffect(() => {
    console.log('hello')
  }, [])

  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
      >
        {ServiceItem.map((item, index) => {
          return (
            <li key={index}>
              <Link
                className={item.className}
                to={item.path}
                onClick={() => setClick(false)}
              >
                {item.title}
              </Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default Dropdown
