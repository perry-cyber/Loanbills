import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser, logoutUser } from '../services/authService';

const useLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [buttonText, setButtonText] = useState('Sign In');

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(''); 
  };
  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(''); 
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText('Signing In...')
  
    let valid = true;
  
    if (!email) {
      setEmailError('Please enter your email address');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address');
      valid = false;
    }
  
    if (!password) {
      setPasswordError('Please enter your password');
      valid = false;
    }
  
    if (valid) {
      try {
        const userData = { email, password };
        const data = await loginUser(userData);
        toast.success('Login successful redirecting....',{
          className: 'custom-toast custom-toast-success',
        });
        setTimeout(() => navigate('/dashboard'), 3000);
      } catch (error) {
        toast.error('Login error:', {
          className: 'custom-toast custom-toast-error',
        });
      }
    }
  
    setTimeout(() => {
      setButtonText('Sign In');
    }, 2000);
  };
  
  const handleLogout = () => {
    logoutUser();
    navigate('/login'); 
  };
  
  return {
    email,
    password,
    showPassword,
    emailError,
    passwordError,
    buttonText,
    handleEmailChange,
    handlePasswordChange,
    togglePasswordVisibility,
    handleSubmit,
    handleLogout
  };
};

export default useLogin;