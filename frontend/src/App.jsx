import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Admin from './pages/Admin'
import MyAds from './pages/MyAds'
import Ad from './pages/Ad'

import Navbar from './components/Navbar';

import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const { user } = useAuthContext()
  const admin = user && user.admin ? true : false
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/myads"
              element={user ? <MyAds /> : <Navigate to='/' />}
            />
            <Route
              path="/ad/:id"
              element={<Ad />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/admin"
              element={admin ? <Admin /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
