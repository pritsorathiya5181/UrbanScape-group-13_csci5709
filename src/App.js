import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import BeautyService from "./components/Services/BeautyService";
import UserHomePage from "./components/User/UserHomePage";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<UserHomePage></UserHomePage>}>
            </Route>
            <Route path="/beautyservices" element={<BeautyService />}>
              
            </Route>
          </Routes>


        </div>

      </div>
    </Router>

  );
}

export default App;
