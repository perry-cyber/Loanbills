import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginAdmin, logoutAdmin } from '../services/authService';

const useAdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const [buttonText, setButtonText] = useState('Sign In');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);
  const [countdown, setCountdown] = useState(4);
  const [showLoader, setShowLoader] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [showMobileWarning, setShowMobileWarning] = useState(false);

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
    setButtonText('Signing In...');
    setFailedAttempts((prevAttempts) => prevAttempts + 1);

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
        const adminData = { email, password };
        const data = await loginAdmin(adminData);
        navigate('/admindashboard');
        setShowSuccessModal(true);
        toast.success('Login successful redirecting....',{
          className: 'custom-toast custom-toast-success',
        });
      } catch (error) {
        toast.error('Login error:', error, {
          className: 'custom-toast custom-toast-error',
        });
        setError(error.message || 'Failed to login. Please try again.');
        setShowFailureModal(true);
      }
    }

    setTimeout(() => {
      setButtonText('Sign In');
    }, 2000);
  };

  const handleLogout = () => {
    logoutAdmin();
    navigate('/adminlogin'); 
  };

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android/i.test(userAgent) || /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      setIsMobileDevice(true);
      setShowMobileWarning(true);
    }
  }, []);

  useEffect(() => {
    let timer;
    if (showSuccessModal) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(timer);
            setShowLoader(true);
            setTimeout(() => {
              setShowLoader(false);
              setShowSuccessModal(false);
              navigate('/admindashboard');
            }, 2000);
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showSuccessModal, navigate]);

  useEffect(() => {
    if (failedAttempts >= 3) {
      navigate('/error');
    }
  }, [failedAttempts, navigate]);

  return {
    email,
    password,
    showPassword,
    emailError,
    passwordError,
    error,
    buttonText,
    setShowSuccessModal,
    setShowFailureModal,
    showSuccessModal,
    showFailureModal,
    countdown,
    showLoader,
    failedAttempts,
    isMobileDevice,
    setShowMobileWarning,
    showMobileWarning,
    handleEmailChange,
    handlePasswordChange,
    togglePasswordVisibility,
    handleSubmit,
    handleLogout,
  };
};

export default useAdminLogin;