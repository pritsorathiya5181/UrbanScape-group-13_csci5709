import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ResponsiveAppBar from './components/Navbar/ResponsiveNavbar'
import BeautyService from './components/Services/BeautyService'
import UserHomePage from './components/User/UserHomePage'

function App() {
  return (
    <Router>
      <ResponsiveAppBar />
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
