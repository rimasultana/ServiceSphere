/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../hooks/useAuth";
import { FaUserCheck, FaShieldAlt, FaClock, FaHandshake } from "react-icons/fa";
import { useNavigate } from "react-router";

const ServiceFeatures = () => {
  const { isDarkMode } = useAuth();
  const navigate = useNavigate();

  // Theme-based styling classes
  const containerClass = isDarkMode
    ? "bg-gray-900 text-gray-200"
    : "bg-gradient-to-r from-white to-blue-50 text-gray-700";
  const cardClass = isDarkMode
    ? "bg-gray-800 text-gray-200 border-gray-700"
    : "bg-white text-gray-700 border-blue-100";
  const titleClass = isDarkMode ? "text-white" : "text-blue-600";
  const descriptionClass = isDarkMode ? "text-gray-400" : "text-gray-600";

  const features = [
    {
      icon: <FaUserCheck className="text-4xl text-blue-500" />,
      title: "Expert Professionals",
      description: "Our service providers are thoroughly vetted and highly skilled in their respective fields.",
      link: "/services"
    },
    {
      icon: <FaShieldAlt className="text-4xl text-blue-500" />,
      title: "Secure Platform",
      description: "Your transactions and personal information are protected with state-of-the-art security.",
      link: "/services"
    },
    {
      icon: <FaClock className="text-4xl text-blue-500" />,
      title: "Timely Service",
      description: "We ensure punctual service delivery and respect your valuable time.",
      link: "/services"
    },
    {
      icon: <FaHandshake className="text-4xl text-blue-500" />,
      title: "Customer Satisfaction",
      description: "Your satisfaction is our top priority, backed by our satisfaction guarantee.",
      link: "/services"
    }
  ];

  return (
    <section className={`py-16 ${containerClass}`}>
      <div className="container mx-auto px-6 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl lg:text-4xl font-bold ${titleClass} mb-4`}>
            Our Service Excellence
          </h2>
          <p className={`text-lg ${descriptionClass} max-w-3xl mx-auto`}>
            Experience unparalleled service quality with our comprehensive platform.
            We combine expertise, security, and convenience to deliver exceptional results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${cardClass} p-8 rounded-xl border shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer`}
              onClick={() => navigate(feature.link)}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className={`text-xl font-semibold mb-3 ${titleClass}`}>
                    {feature.title}
                  </h3>
                  <p className={descriptionClass}>
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <button 
            onClick={() => navigate('/services')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Explore Our Services
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceFeatures;
