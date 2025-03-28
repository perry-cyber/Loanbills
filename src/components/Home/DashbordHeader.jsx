import React, { useState, useRef, useEffect } from "react";
import { FaBars, FaHeadset, FaTrash, FaCheck } from "react-icons/fa";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { Link, Outlet, useLocation } from "react-router-dom";
import logo from "../../assets/loanbills-removebg-preview.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import jsQR from "jsqr"; // Import jsQR
import "./DashbordHeader.css";
import useNotifications from "../../hooks/useNotifications";
import useLogin from "../../hooks/useLogin";

export default function DashbordHeader() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [qrDropdownOpen, setQrDropdownOpen] = useState(false);
  const {
    notifications,
    loading,
    error,
    hasNewNotifications,
    handleMarkAsRead,
    handleDeleteNotification,
  } = useNotifications();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const notificationRef = useRef(null);
  const [deleteNotificationIndex, setDeleteNotificationIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadImage, setUploadImage] = useState(null); // Image state for showing the QR code
  const [walletAddress, setWalletAddress] = useState("");
  const { handleLogout } = useLogin();
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const location = useLocation();

  const dropdownRef = useRef(null);
  const tooltipRef = useRef(null);
  const qrDropdownRef = useRef(null);

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleCameraInputClick = () => {
    cameraInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadImage(URL.createObjectURL(file)); // Create a URL for the uploaded image
      decodeQRCode(file);
    }
  };

  const decodeQRCode = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, canvas.width, canvas.height, {
          inversionAttempts: "dontInvert",
        });

        if (code) {
          setWalletAddress(code.data);
        } else {
          setWalletAddress("QR Code could not be decoded.");
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleNotificationClick = () => {
    setNotificationOpen((prev) => !prev);
  };

  const openDeleteModal = (index) => {
    setDeleteNotificationIndex(index);
    setIsModalOpen(true);
  };

  const deleteNotification = async () => {
    if (deleteNotificationIndex !== null) {
      const notificationId = notifications[deleteNotificationIndex].id;
      try {
        await handleDeleteNotification(notificationId);
      } catch (error) {
        console.error("Failed to delete notification:", error);
      }
      setIsModalOpen(false);
    }
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setTooltipOpen(false);
      }
      if (
        qrDropdownRef.current &&
        !qrDropdownRef.current.contains(event.target)
      ) {
        setQrDropdownOpen(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const calculateSliderPosition = () => {
    switch (location.pathname) {
      case "/dashboard/exchange":
        return "0%";
      case "/dashboard/wallet":
        return "33.33%";
      case "/dashboard/flight":
        return "66.66%";
      default:
        return "0%";
    }
  };

  useEffect(() => {
    const slider = document.querySelector(".slider");
    if (slider) {
      slider.style.left = calculateSliderPosition();
    }
  }, [location.pathname]);

  return (
    <>
      <div className="flex flex-wrap justify-between items-center p-[5px] bg-[#121212] fixed w-[100%] z-[999] top-[0]">
        <div className="flex items-center">
          <img
            src={logo}
            alt="Company Logo"
            className="h-8 w-8 sm:h-10 sm:w-10 mr-3"
          />
          <div className="relative tab-container border border-gray-700">
            <div className="absolute inset-0 bg-white slider" />
            <div className="relative flex space-x-2 sm:space-x-4">
              <Link
                title="Exchange"
                to="exchange"
                className={`relative tab px-1 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm font-medium text-center ${
                  location.pathname === "/dashboard/exchange"
                    ? "text-black"
                    : "text-white"
                }`}
              >
                Exchange
              </Link>
              <Link
                title="Wallet"
                to="wallet"
                className={`relative tab px-1 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm font-medium text-center ${
                  location.pathname === "/dashboard/wallet"
                    ? "text-black"
                    : "text-white"
                }`}
              >
                Wallet
              </Link>
              <Link
                title="Flight"
                to="flight"
                className={`relative tab px-1 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm font-medium text-center ${
                  location.pathname === "/dashboard/flight"
                    ? "text-black"
                    : "text-white"
                }`}
              >
                Flight
              </Link>
            </div>
          </div>
        </div>
        <div className="flex items-center mt-2 sm:mt-0">
          <div className="relative" ref={notificationRef}>
            <FontAwesomeIcon
              className="text-white text-sm sm:text-xl cursor-pointer"
              icon={faBell}
              onClick={handleNotificationClick}
            />
            {hasNewNotifications && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                !
              </span>
            )}
            {notificationOpen && (
              <div className="absolute lg:right-[400px] md:right-[200px] right-[-40px] notification-menu-cont">
                <div className="notification-menu overflow-y-scroll bg-white shadow-lg md:w-[220%] w-[120%] px-[30px] py-[30px] rounded-md">
                  {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                      <div
                        key={notification.id}
                        className="notification-item flex gap-[30px] mb-[5px] items-center border-b"
                      >
                        <span>{notification.message}</span>
                        <div className="flex gap-[30px] items-center">
                          <button
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="text-blue-500 "
                          >
                            Mark as Read
                          </button>
                          <button
                            onClick={() => openDeleteModal(index)}
                            className="text-red-500"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div>No notifications</div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="relative ml-3" ref={dropdownRef}>
            <FaBars
              className="text-white text-xl cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-48">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
          <div className="relative ml-3" ref={tooltipRef}>
            <FaHeadset
              className="text-white text-xl cursor-pointer"
              onClick={() => setTooltipOpen(!tooltipOpen)}
            />
            {tooltipOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md p-2">
                <p>Support Information</p>
              </div>
            )}
          </div>
          <div className="relative ml-3" ref={qrDropdownRef}>
            <MdOutlineQrCodeScanner
              className="text-white text-xl cursor-pointer"
              onClick={() => setQrDropdownOpen(!qrDropdownOpen)}
            />
            {qrDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md p-2">
                <button
                  onClick={handleCameraInputClick}
                  className="block w-full text-center py-2"
                >
                  Scan QR Code
                </button>
                <button
                  onClick={handleFileInputClick}
                  className="block w-full text-center py-2"
                >
                  Upload QR Code
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                />
                <input
                  type="file"
                  accept="image/*"
                  ref={cameraInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                />
                {uploadImage && (
                  <div className="mt-2">
                    <img
                      src={uploadImage}
                      alt="Uploaded QR Code"
                      className="w-full"
                    />
                    <p className="mt-2">Wallet Address: {walletAddress}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg">
            <p>Are you sure you want to delete this notification?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={deleteNotification}
                className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
              >
                Delete
              </button>
              <button
                onClick={closeDeleteModal}
                className="bg-gray-300 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <Outlet />
    </>
  );
}
