import { FaFacebook, FaLinkedin, FaEnvelope } from "react-icons/fa";
import logo from "../../public/logo.webp";

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white">
      <div className="container mx-auto py-10 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Website Info */}
          <div className="flex flex-col items-start">
            <img
              src={logo}
              alt="ServiceSphere Logo"
              className="w-12 h-12 rounded-md mb-4"
            />
            <h1 className="text-xl font-bold">ServiceSphere</h1>
            <p className="text-gray-200 mt-2">
              Your trusted platform for sharing and managing services with ease.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-bold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:underline hover:text-gray-300">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  className="hover:underline hover:text-gray-300"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="/dashboard"
                  className="hover:underline hover:text-gray-300"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:underline hover:text-gray-300"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h2 className="text-lg font-bold mb-4">Follow Us</h2>
            <p className="text-gray-200 mb-4">
              Stay connected with us on social media:
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl hover:text-gray-300"
              >
                <FaFacebook />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl hover:text-gray-300"
              >
                <FaLinkedin />
              </a>
              <a
                href="mailto:support@servicesphere.com"
                className="text-xl hover:text-gray-300"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-blue-400 pt-4 text-center text-sm text-gray-200">
          <p>
            © {new Date().getFullYear()} ServiceSphere. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
