import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { RootState } from './app/store';
import { login } from './features/auth/authSlice';
import Login from './pages/Login';
import SignUp from './pages/SignUp';  
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute'; 

const App: React.FC = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  // On page load, check if there's an auth token in localStorage
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    console.log("Token from localStorage:", token);
    if (token) {
      dispatch(login(token));  // Automatically log in the user if token exists
    }
  }, [dispatch]);

  console.log("isLoggedIn state:", isLoggedIn);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />

        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        {/* Protected dashboard route */}
        <Route path="/dashboard" element={<PrivateRoute isLoggedIn={isLoggedIn}><Dashboard /></PrivateRoute>} />
      </Routes>
    </Router>
  );
};

export default App;