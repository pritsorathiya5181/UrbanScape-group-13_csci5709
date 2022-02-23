import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NavBar from './components/Navbar/NavBar'
import BeautyService from './components/Services/BeautyService'
import UserHomePage from './components/User/UserHomePage'

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
