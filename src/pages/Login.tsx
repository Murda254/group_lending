import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login as loginAction } from '../features/auth/authSlice';


interface ILoginInput {
  emailOrUsername: string;
  password: string;
}

//  Yup validation schema
const validationSchema = Yup.object().shape({
  emailOrUsername: Yup.string().required('Username or Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Initialize the form with React Hook Form and Yup resolver
  const { register, handleSubmit, formState: { errors } } = useForm<ILoginInput>({
    resolver: yupResolver(validationSchema),
  });

  // Handle the login submission
  const onSubmit: SubmitHandler<ILoginInput> = async (data) => {
    try {
      const response = await axios.post('https://your-api.com/api/login', data);
      
      // Assuming the token is returned in the response
      const { token } = response.data;

      //  store token in Redux and localStorage
      dispatch(loginAction(token));

      // Redirect to the dashboard after login
      navigate('/dashboard');
    } catch (error: any) {
      if (error.response) {
        console.error('Server error during login:', error.response.data);
        alert(error.response.data.message || 'Login failed');
      } else if (error.request) {
        console.error('No response from server:', error.request);
        alert('No response from the server. Please try again later.');
      } else {
        console.error('Error during login:', error.message);
        alert('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Username or Email</label>
          <input
            type="text"
            {...register('emailOrUsername')}
            className={`w-full px-4 py-2 border rounded-md ${errors.emailOrUsername ? 'border-red-500' : 'border-gray-300'}`}
          />
          <p className="text-red-500 text-sm">{errors.emailOrUsername?.message}</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            {...register('password')}
            className={`w-full px-4 py-2 border rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
          />
          <p className="text-red-500 text-sm">{errors.password?.message}</p>
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;