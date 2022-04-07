import React, { useMemo, useState, useEffect } from 'react'
import './MyOrders.css'
import { BASE_URL } from '../../../utils/string'
import StickyHeadTable from './StickyHeadTable'
import { getCustomerUser, getUserType, hasToken } from '../../../utils/scale'

export default function MyOrders() {
  const [data, setData] = useState([])

  useEffect(() => {
    ;(async () => {
      if (!hasToken() || getUserType() !== 'customer') {
        window.location.href = '/customer/notloggedin/'
      } else {
        var userInfo = getCustomerUser()
        if (userInfo) {
          userInfo = JSON.parse(userInfo)
        }

        var requestOptions = {
          method: 'GET',
          redirect: 'follow',
        }

        fetch(`${BASE_URL}order/`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log(result)
            setData(
              result?.orders?.filter(
                (item) => item.userName === userInfo?.firstname
              )
            )
          })
          .catch((error) => console.log('error', error))
      }
    })()
  }, [])

  return (
    <div className='MyOrders'>
      {data?.length > 0 ? (
        <StickyHeadTable orderData={data} />
      ) : (
        <section
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          <h1>You haven't order anything yet!</h1>
        </section>
      )}
    </div>
  )
}
