import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());  // Clear auth token from Redux and localStorage
    navigate('/login');  // Redirect to login page
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Welcome to the Dashboard</h2>
      <button onClick={handleLogout} className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
