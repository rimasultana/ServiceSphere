import { motion } from "framer-motion";
import service from "../assets/team/service.jpg";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router";

const AboutSection = () => {
  const { isDarkMode } = useAuth();
  const navigate = useNavigate();

  // Theme-based styling classes
  const containerClass = isDarkMode
    ? "bg-gray-900 text-gray-200"
    : "bg-gradient-to-r from-blue-50 to-white text-gray-700";
  const titleClass = isDarkMode ? "text-white" : "text-blue-600";
  const descriptionClass = isDarkMode ? "text-gray-400" : "text-gray-600";
  const buttonClass = isDarkMode
    ? "bg-blue-600 hover:bg-blue-700 text-white"
    : "bg-blue-600 hover:bg-blue-700 text-white";
  const cardClass = isDarkMode
    ? "rounded-lg shadow-lg bg-gray-800"
    : "rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300";

  const handleLearnMore = () => {
    navigate('/services');
  };

  return (
    <section className={`${containerClass} py-16`}>
      <div className="container mx-auto px-6 lg:px-20">
        <div className="text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`text-3xl lg:text-4xl font-bold ${titleClass} mb-4`}
          >
            About ServiceSphere
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-lg ${descriptionClass} mb-8 max-w-3xl mx-auto`}
          >
            ServiceSphere is a platform designed to bring people together
            through a unique service-sharing experience. Whether you&#39;re
            looking to book a service or share your expertise with others,
            ServiceSphere empowers you to connect, collaborate, and grow in an
            ever-evolving marketplace.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-12">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-lg cursor-pointer"
            onClick={() => navigate('/services')}
          >
            <img
              src={service}
              alt="About ServiceSphere"
              className={`w-full transform hover:scale-105 transition-transform duration-500 ${cardClass}`}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className={`text-2xl font-bold ${titleClass} mb-4`}>
              Why Choose Us?
            </h3>
            <ul className={`space-y-4 ${descriptionClass}`}>
              <li className="flex items-center cursor-pointer hover:text-blue-500 transition-colors duration-300" onClick={() => navigate('/services')}>
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Professional and verified service providers
              </li>
              <li className="flex items-center cursor-pointer hover:text-blue-500 transition-colors duration-300" onClick={() => navigate('/services')}>
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Secure and transparent transactions
              </li>
              <li className="flex items-center cursor-pointer hover:text-blue-500 transition-colors duration-300" onClick={() => navigate('/services')}>
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                24/7 customer support
              </li>
            </ul>
            <button 
              onClick={handleLearnMore}
              className={`mt-8 px-8 py-3 rounded-full font-semibold ${buttonClass} transform hover:scale-105 transition-all duration-300`}
            >
              Learn More
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
