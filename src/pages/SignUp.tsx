import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

interface IFormInput {
  firstName: string;
  lastName: string;
  surname: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Create a Yup validation schema
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  surname: Yup.string().required('Surname is required'),
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[\W_]/, 'Password must contain at least one special character')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});

const SignUp: React.FC = () => {
  const navigate = useNavigate(); 

  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    // Perform the sign-up API call here
    // On successful sign-up, navigate to login page
    navigate('/login');
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium mb-1">First Name</label>
          <input
            type="text"
            {...register('firstName')}
            className={`w-full px-4 py-2 border rounded-md ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
          />
          <p className="text-red-500 text-sm">{errors.firstName?.message}</p>
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Last Name</label>
          <input
            type="text"
            {...register('lastName')}
            className={`w-full px-4 py-2 border rounded-md ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
          />
          <p className="text-red-500 text-sm">{errors.lastName?.message}</p>
        </div>

        {/* Surname */}
        <div>
          <label className="block text-sm font-medium mb-1">Surname</label>
          <input
            type="text"
            {...register('surname')}
            className={`w-full px-4 py-2 border rounded-md ${errors.surname ? 'border-red-500' : 'border-gray-300'}`}
          />
          <p className="text-red-500 text-sm">{errors.surname?.message}</p>
        </div>

        {/* Username */}
        <div>
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            {...register('username')}
            className={`w-full px-4 py-2 border rounded-md ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
          />
          <p className="text-red-500 text-sm">{errors.username?.message}</p>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            {...register('email')}
            className={`w-full px-4 py-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            {...register('password')}
            className={`w-full px-4 py-2 border rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
          />
          <p className="text-red-500 text-sm">{errors.password?.message}</p>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium mb-1">Confirm Password</label>
          <input
            type="password"
            {...register('confirmPassword')}
            className={`w-full px-4 py-2 border rounded-md ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
          />
          <p className="text-red-500 text-sm">{errors.confirmPassword?.message}</p>
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
          Sign Up
        </button>

        {/* Log-in Button */}
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="w-full mt-4 bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default SignUp;