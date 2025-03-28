import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Join/Login";
import ForgotPassword from "../pages/Join/ForgotPassword";
import ResetPassword from "../pages/Join/ResetPassword";
import Register from "../pages/Join/Register";
import OTP from "../pages/Join/OTP";
import DashbordHeader from "../components/Home/DashbordHeader";
import Dashboard from "../pages/User/Dashboard";
import ExchangePage from "../pages/Services/Exchange";
import WalletPage from "../pages/Services/Wallet";
import FlightPage from "../pages/Services/Flight";
import Loader from "../components/Home/Loader";
import FourZeroFour from "../pages/FourZeroFour/FourZeroFour";
import { checkTokenExpiration } from "../services/authService";
import PrivateRoute from "./PrivateRoute";
import AdminAuth from "../pages/Admin/AdminAuth";
import AdminRoute from "./AdminRoute";
import AdminDashboard from "../pages/Admin/AdminDasboard";

function FolderRoute() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for token expiration
    checkTokenExpiration();

    // Simulate a loading delay
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the time as needed
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
  path="/adminlogin"
  element={
    <AdminRoute 
      component={AdminAuth} 
      requireAuth={false} 
    />
  }
/>

<Route
  path="/admindashboard"
  element={
    <AdminDashboard />
  }
/>

      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verification" element={<OTP />} />
   
        <Route path="/dashboard"  element={<DashbordHeader />}>
          <Route index element={<ExchangePage />} />
          <Route path="exchange" element={<ExchangePage />} />
          <Route path="flight" element={<FlightPage />} />
          <Route path="wallet" element={<WalletPage />} />
        </Route>
   
      <Route path="*" element={<FourZeroFour />} />
    </Routes>
  );
}

export default FolderRoute;
