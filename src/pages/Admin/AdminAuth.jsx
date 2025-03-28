import React from "react";
import useAdminLogin from "../../hooks/useAdminLogin";
import Loader from "../../components/Home/Loader";
import Modal from "../../model/Modal";

export default function AdminAuth() {
  const {
    email,
    password,
    showPassword,
    emailError,
    passwordError,
    error,
    buttonText,
    showSuccessModal,
    showFailureModal,
    setShowFailureModal,
    setShowSuccessModal,
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
  } = useAdminLogin();
  

  return (
    <div className="max-w-md mx-auto p-8 border border-gray-300 rounded-lg bg-white shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
      <form  className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {emailError && <p className="text-red-600">{emailError}</p>}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password:
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {passwordError && <p className="text-red-600">{passwordError}</p>}
          <button
            type="button"
            className="text-sm text-gray-600 hover:text-gray-900"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "Hide Password" : "Show Password"}
          </button>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {buttonText}
        </button>
      </form>

      
      {/* Success Modal */}
      <Modal show={showSuccessModal} onClose={() => setShowSuccessModal(false)}>
        <div className="p-4 flex flex-col gap-5 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="96"
            height="96"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="#22C55E"
              strokeWidth="1.05"
              d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10ZM7 12l4 3l5-7"
            />
          </svg>
          <h2 className="text-lg font-semibold dark:text-white text-gray-800">
            Login Successful!
          </h2>
          <p className="text-white">
            Redirecting in {countdown} sec{countdown === 1 ? "" : "s"}...
          </p>
        </div>
      </Modal>

      {/* Failure Modal */}
      <Modal show={showFailureModal} onClose={() => setShowFailureModal(false)}>
        <p>Login Failed!</p>
      </Modal>
      {/* Mobile Warning */}
      {isMobileDevice && (
        <Modal
          show={showMobileWarning}
          onClose={() => setShowMobileWarning(false)}
        >
          <p className="text-red-600 text-center">
            You are using a mobile device; the admin page only works on desktop
            devices.
          </p>
        </Modal>
      )}
      {/* Loader */}
      {showLoader && <Loader />}
    </div>
  );
}
