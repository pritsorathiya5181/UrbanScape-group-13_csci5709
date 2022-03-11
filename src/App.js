import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NavBar from './components/Navbar/NavBar'
import BeautyService from './pages/customer/ServicePage/BeautyService'
import UserHomePage from './pages/customer/HomePage/UserHomePage'

function App() {
  return (
    <Router>
      <NavBar />
      <section>
        <Routes>
          <Route path='/' element={<UserHomePage />} />
          <Route path='/beautyservices' element={<BeautyService />} />
        </Routes>
      </section>
    </Router>
  )
}

export default App
