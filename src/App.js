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

function App() {
  const url = window.location.pathname

  return (
    <Provider store={store}>
      <Router>
        {url.split('/')[1] !== 'professional' && <NavBar />}

        <Routes>
          <Route path='/' element={<UserHomePage />} />
          <Route path='/beautyservices' element={<BeautyService />} />
          <Route
            exact
            path='/customer/myprofile/'
            element={<CustomerProfilePage />}
          />
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
            path='/professional/myprofile/'
            element={<ProfessionalProfilePage />}
          />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
