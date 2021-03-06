import React from 'react'
import './App.css'
import store from './store/store'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NavBar from './components/customer/Navbar/NavBar'
import BeautyService from './pages/customer/ServicePage/BeautyService'
import UserHomePage from './pages/customer/HomePage/UserHomePage'

import Dashboard from './pages/professional/dashboard/Dashboard'
import AddService from './pages/professional/HandleService/AddService'
import ServiceProfile from './pages/professional/HandleService/ServiceProfile'
import ProfessionalProfilePage from './pages/professional/profile/ProfessionalProfilePage'
import CustomerProfilePage from './pages/customer/profile/CustomerProfilePage'
import ServiceRequests from './pages/professional/serviceListing/ServiceRequests'
import ServiceHistory from './pages/professional/serviceListing/ServiceHistory'
import CartPage from './pages/customer/CartPage/CartPage'
import ForgetPassword from './components/UserAuthentication/ForgetPassword'
import SignInSide from './components/UserAuthentication/UserLogin'
import SignUpUser from './components/UserAuthentication/SignUpUser'
import SignUpProfessional from './components/UserAuthentication/SignUpProfessional'
import Otp from './components/UserAuthentication/Otp'
import UpdatePassword from './components/UserAuthentication/UpdatePassword'
import CarpenterService from './pages/customer/ServicePage/CarpenterService'
import PlumbingService from './pages/customer/ServicePage/PlumbingService'
import Contact from './pages/customer/Support/Contact'
import NotLoggedIn from './pages/customer/profile/NotLoggedIn'
import AddReview from './components/UserReviews/AddReview'
import DisplayReview from './components/UserReviews/DisplayReview'

import MyOrders from '../src/pages/customer/Orders/MyOrders'
import Payment from './pages/customer/Payment/Payment'
import BookingConfirmed from './pages/customer/Payment/BookingConfirmed'

function App() {
  const url = window.location.pathname

  return (
    <Provider store={store}>
      <Router>
        {url.split('/')[1] !== 'professional' && <NavBar />}

        <Routes>
          <Route path='/' element={<UserHomePage />} />

          <Route path='/beautyservices' element={<BeautyService />} />
          <Route path='/carpentryservices' element={<CarpenterService />} />
          <Route path='/plumbingservices' element={<PlumbingService />} />
          <Route path='/support' element={<Contact />} />
          <Route
            exact
            path='/customer/myprofile/'
            element={<CustomerProfilePage />}
          />
          <Route exact path='/cartpage/' element={<CartPage />} />
          <Route exact path='/payment/' element={<Payment />} />
          <Route exact path='/success/' element={<BookingConfirmed />} />
          <Route
            exact
            path='/customer/unauthenticated/'
            element={<NotLoggedIn />}
          />
          <Route exact path='/notloggedin/' element={<NotLoggedIn />} />

          <Route exact path='/professional' element={<Dashboard />} />
          <Route
            exact
            path='/professional/myservices/'
            element={<ServiceProfile />}
          />
          <Route
            exact
            path='/professional/addservice/'
            element={<AddService />}
          />
          <Route
            exact
            path='/professional/updateservice/'
            element={<AddService />}
          />
          <Route
            exact
            path='/professional/servicerequests/'
            element={<ServiceRequests />}
          />
          <Route
            exact
            path='/professional/servicehistory/'
            element={<ServiceHistory />}
          />
          <Route
            exact
            path='/professional/myprofile/'
            element={<ProfessionalProfilePage />}
          />

          <Route path='/userlogin' element={<SignInSide />} />
          <Route path='/signupuser' element={<SignUpUser />} />
          <Route path='/signupprofessional' element={<SignUpProfessional />} />
          <Route path='/forgetpassword' element={<ForgetPassword />} />
          <Route path='/otp' element={<Otp />} />
          <Route path='/updatepassword' element={<UpdatePassword />} />

          <Route path='/myorders' element={<MyOrders />} />
          <Route path='/addreview' element={<AddReview />} />
          <Route path='/displayReview' element={<DisplayReview />} />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
