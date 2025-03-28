import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolderOpen,
  faBell,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";

import logo from '../../assets/loanbills-removebg-preview.png';
import Dash from "./Dash";
import TotalUsers from "./TotalUsers";
import LiveRates from "./LiveRates";
import FeePercentage from "./FeePercentage";
import useAdminLogin from "../../hooks/useAdminLogin";

export default function AdminDashboard() {
  const [hasNewNotifications, setHasNewNotifications] = useState(true);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const {handleLogout} = useAdminLogin();

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return <Dash />;
      case "Settings":
        return <div>Settings Content</div>;
      case "Profile":
        return <div>Profile Content</div>;
      case "Transactions":
        return <div>Transactions Content</div>;
      case "Payments":
        return <div>Payments Content</div>;
      case "Live Rates":
        return <LiveRates />;
      case "Fees Percentage":
        return <FeePercentage />;
      case "Total Users":
        return <TotalUsers />;
      default:
        return <Dash />;
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-black text-white h-[60px] w-full fixed top-0 left-0 flex justify-between items-center px-4 z-50">
        <div className="flex items-center gap-2">
          <span className="text-sm">
            <img src={logo} alt="Company Logo" className="h-8 w-8 sm:h-10 sm:w-10 mr-3" />
          </span>
          <span className="text-[18px] font-semibold">LoanBillsFX</span>
        </div>

        <div className="flex space-x-6 relative">
          <FontAwesomeIcon
            icon={faFolderOpen}
            size="1x"
            title="View"
            className="cursor-pointer"
          />

          <div className="relative">
            <FontAwesomeIcon
              icon={faBell}
              size="1x"
              title="Notification"
              className="cursor-pointer"
            />
            {hasNewNotifications && (
              <div className="absolute top-1 right-0 border-black border-[1px] flex items-center justify-center rounded-full">
                <div className="h-2 w-2 bg-red-500 rounded-full"></div>
              </div>
            )}
          </div>

          <FontAwesomeIcon
            icon={faSignOut}
            size="1x"
            title="Logout"
            className="cursor-pointer"
            onClick={handleLogout}
          />
        </div>
      </div>

      {/* Sidebar and Main Content */}
      <div className="flex pt-[60px]">
        {/* Main content area */}
        <div className="flex-1 overflow-y-auto" style={{ marginRight: '16rem' }}>
          {renderContent()}
        </div>

        {/* Right Sidebar */}
        <div className="w-64 bg-black text-white fixed top-[60px] right-0 h-[calc(100vh-60px)] z-40 overflow-y-auto custom-scrollbar">
          <h2 className="text-xl font-semibold mb-4 p-4">Admin Dashboard</h2>
          <ul className="space-y-2 p-4">
            <li
              className="cursor-pointer hover:bg-gray-300 p-2 rounded"
              onClick={() => setActiveTab("Dashboard")}
            >
              Dashboard
            </li>
            <li
              className="cursor-pointer hover:bg-gray-300 p-2 rounded"
              onClick={() => setActiveTab("Settings")}
            >
              Settings
            </li>
            <li
              className="cursor-pointer hover:bg-gray-300 p-2 rounded"
              onClick={() => setActiveTab("Profile")}
            >
              Profile
            </li>
            <li
              className="cursor-pointer hover:bg-gray-300 p-2 rounded"
              onClick={() => setActiveTab("Transactions")}
            >
              Transactions
            </li>
            <li
              className="cursor-pointer hover:bg-gray-300 p-2 rounded"
              onClick={() => setActiveTab("Payments")}
            >
              Payments
            </li>
            <li
              className="cursor-pointer hover:bg-gray-300 p-2 rounded"
              onClick={() => setActiveTab("Total Users")}
            >
              Total Users
            </li>
            <li
              className="cursor-pointer hover:bg-gray-300 p-2 rounded"
              onClick={() => setActiveTab("Live Rates")}
            >
              Live Rates
            </li>
            <li
              className="cursor-pointer hover:bg-gray-300 p-2 rounded"
              onClick={() => setActiveTab("Fees Percentage")}
            >
              Fees Percentage
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
