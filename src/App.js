import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Cart from './components/Cart/Cart'
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
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </section>
    </Router>
  )
}

export default App
