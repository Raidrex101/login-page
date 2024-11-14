import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.min"
import './styles/app.css'

import Register from './pages/Register'
import Login from './pages/Login'
import UsersList from './pages/UsersList'

function App() {
  return (
    <Router>

        <Routes>

          <Route path="/login" element={<Login />} />

          <Route path="/users" element={<UsersList />} />
          
          <Route path="/" element={<Register />} />

        </Routes>

    </Router>
  );
}

export default App
