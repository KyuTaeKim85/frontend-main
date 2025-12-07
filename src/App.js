import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Main from './pages/Main';
// import Main1 from './layout/Main'; 

function App() {
  const [token, setToken] = useState(localStorage.getItem('jwt_token'));

  const setAuthToken = (newToken) => {
    if (newToken) {
      localStorage.setItem('jwt_token', newToken);
    } else {
      localStorage.removeItem('jwt_token');
    }
    setToken(newToken);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route 
            path="/main" 
            element={
              <PrivateRoute token={token}>
                <Main />
              </PrivateRoute>
            } 
          />
          {/* <Route 
            path="/*"
            element={
              <PrivateRoute token={token}>
                <Main1 />
              </PrivateRoute>
            } 
          /> */}
          <Route path="/auth/callback" element={<AuthCallback setAuthToken={setAuthToken} />} />
        </Routes>
      </div>
    </Router>
  );
}

const PrivateRoute = ({ children, token }) => {
  return token ? children : <Navigate to="/login" />;
};

const AuthCallback = ({ setAuthToken }) => {
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');

        if (token) {
            setAuthToken(token);
        }
    }, [location, setAuthToken]);

    return <Navigate to="/" />;
};

export default App;