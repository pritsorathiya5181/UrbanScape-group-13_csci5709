import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NavBar from './components/Navbar/NavBar'
import BeautyService from './components/Services/BeautyService'
import UserHomePage from './components/User/UserHomePage'
import ForgetPassword from './components/UserAuthentication/ForgetPassword'
import SignInSide from './components/UserAuthentication/UserLogin'
import SignUpUser from './components/UserAuthentication/SignUpUser'
import SignUpProfessional from './components/UserAuthentication/SignUpProfessional'
import Otp from './components/UserAuthentication/Otp'
import UpdatePassword from './components/UserAuthentication/UpdatePassword'

function App() {
  return (
    <Router>
      <NavBar />
      <section>
        <Routes>
          <Route path='/' element={<UserHomePage />} />
          <Route path='/beautyservices' element={<BeautyService />} />
          <Route path='/userlogin' element={<SignInSide/>}/>
          <Route path='/signupuser' element={<SignUpUser/>}/>
          <Route path='/signupprofessional' element={<SignUpProfessional/>}/>
          <Route path='/forgetpassword' element={<ForgetPassword/>}/>
          <Route path='/otp' element={<Otp />}/>
          <Route path='/updatepassword' element={<UpdatePassword />} />
        </Routes>
      </section>
    </Router>
  )
}

export default App
