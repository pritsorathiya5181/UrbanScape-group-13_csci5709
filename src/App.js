import React, { useEffect } from 'react'
import './App.css'
import store from './store/store'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NavBar from './components/customer/Navbar/NavBar'
import BeautyService from './pages/customer/ServicePage/BeautyService'
import UserHomePage from './pages/customer/HomePage/UserHomePage'
import ContactUs from './pages/customer/Support/ContactUs'
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
          <Route path='/support' element={<ContactUs />} />
          <Route
            exact
            path='/customer/myprofile/'
            element={<CustomerProfilePage />}
          />
          <Route exact path='/customer/cartpage/' element={<CartPage />} />

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
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
