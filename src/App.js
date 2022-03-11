import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NavBar from './components/customer/Navbar/NavBar'
import BeautyService from './pages/customer/ServicePage/BeautyService'
import UserHomePage from './pages/customer/HomePage/UserHomePage'
import Dashboard from './pages/professional/dashboard/Dashboard'
import AddService from './pages/professional/HandleService/AddService'
import ServiceProfile from './pages/professional/HandleService/ServiceProfile'
import store from './store/store'
import { Provider } from 'react-redux'

function App() {
  const url = window.location.pathname

  return (
    <Provider store={store}>
      <Router>
        {url.split('/')[1] !== 'professional' && <NavBar />}
        <section>
          <Routes>
            <Route path='/' element={<UserHomePage />} />
            <Route path='/beautyservices' element={<BeautyService />} />
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
          </Routes>
        </section>
      </Router>
    </Provider>
  )
}

export default App
