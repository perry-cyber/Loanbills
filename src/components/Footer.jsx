import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 md:px-20 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo & Description */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-yellow-400 w-10 h-10 rotate-45"></div>
            <h1 className="text-2xl font-bold">
              Plan<span className="tracking-wide">Box</span>
            </h1>
          </div>
          <p className="text-sm text-gray-300">
            We believe that the right tools empower everyone to stay focused,
            organized, and motivated, helping them achieve their goals
            efficiently.
          </p>
        </div>

        {/* Pages */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Pages</h3>
          <ul className="space-y-2 text-gray-300">
            <li>Home</li>
            <li>About us</li>
            <li>Service</li>
            <li>Pricing</li>
            <li>Blogs</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-gray-300">
            <li>Faq</li>
            <li>404</li>
            <li>Coming Soon</li>
            <li>Contact us</li>
          </ul>
        </div>

        {/* Utility Page */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Utility Page</h3>
          <ul className="space-y-2 text-gray-300">
            <li>Licensing</li>
            <li>Changelog</li>
            <li>Cookie Policy</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
      </div>

      {/* Bottom section */}
      <div className="mt-12 border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-gray-400">
          © 2025 Planbox. All Rights Reserved. Powered by Webflow.
        </p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="bg-white text-black p-2 rounded-full">
            <FaFacebookF />
          </a>
          <a href="#" className="bg-white text-black p-2 rounded-full">
            <FaTwitter />
          </a>
          <a href="#" className="bg-white text-black p-2 rounded-full">
            <FaInstagram />
          </a>
          <a href="#" className="bg-white text-black p-2 rounded-full">
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

