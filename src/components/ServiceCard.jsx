/* eslint-disable react/prop-types */
import { Link } from "react-router";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";

const ServiceCard = ({ service }) => {
  const { isDarkMode } = useAuth();

  // Dynamic theme classes
  const cardClass = isDarkMode
    ? "bg-gray-800 text-gray-200"
    : "bg-white text-gray-700";
  const buttonClass = isDarkMode
    ? "bg-blue-600 hover:bg-blue-500 text-white"
    : "bg-blue-500 hover:bg-blue-600 text-black";
  const hoverClass = isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200";
  const titleClass = isDarkMode ? "text-gray-200" : "text-gray-800";
  const textClass = isDarkMode ? "text-gray-400" : "text-gray-600";

  return (
    <motion.div
      className={`rounded overflow-hidden shadow-lg ${cardClass}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="relative"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={service.imageUrl}
          alt={service.serviceName}
          className="w-full h-56 object-cover transition-transform duration-300 transform"
        />
        <div className="absolute inset-0 bg-black opacity-30 rounded-lg"></div>
      </motion.div>

      <div className="px-6 py-4">
        <motion.h2
          className={`text-xl font-semibold ${titleClass}`}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {service.serviceName}
        </motion.h2>
        <p className={`mb-2 ${textClass}`}>
          <strong>Price:</strong> ${service.price}
        </p>
        <p className={`mb-2 ${textClass}`}>
          <strong>Description: </strong>
          {service.description.length > 100
            ? `${service.description.substring(0, 100)}...`
            : service.description}
        </p>
        <div className="flex items-center mt-4">
          <img
            src={service.serviceProvider.image}
            alt={service.serviceProvider.name}
            className="w-10 h-10 rounded-full mr-2"
          />
          <span className={`font-medium ${titleClass}`}>
            {service.serviceProvider.name}
          </span>
        </div>
        <div className="flex justify-between items-center mt-4">
          <p className={`text-lg font-bold mb-2 ${textClass}`}>
            <strong>Price:</strong> ${service.price}
          </p>
          <Link to={`/services/${service?._id}`}>
            <motion.button
              className={`px-4 py-2 rounded ${buttonClass} ${hoverClass}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              View Details
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
