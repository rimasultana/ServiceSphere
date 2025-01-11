/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";
import LoadingSpinner from "./Loading";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";

const PopularServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isDarkMode } = useAuth();

  const containerClass = isDarkMode
    ? "bg-gray-900 text-gray-200"
    : "bg-gradient-to-b from-white to-blue-50 text-gray-700";
  const buttonClass = isDarkMode
    ? "bg-blue-600 hover:bg-blue-700 text-white"
    : "bg-blue-600 hover:bg-blue-700 text-white";
  const titleClass = isDarkMode ? "text-white" : "text-blue-600";
  const descriptionClass = isDarkMode ? "text-gray-400" : "text-gray-600";

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(
          "https://a11-b10-server-side.vercel.app/service"
        );
        const data = await response.json();
        setServices(data.slice(0, 6));
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  const handleShowAll = () => {
    navigate("/services");
  };

  return (
    <section className={`py-16 ${containerClass}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${titleClass}`}>
            Popular Services
          </h2>
          <p className={`text-lg ${descriptionClass} max-w-2xl mx-auto`}>
            Discover our most sought-after services, trusted and loved by our
            community.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ServiceCard service={service} />
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
            onClick={handleShowAll}
            className={`${buttonClass} font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105`}
          >
            View All Services
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default PopularServices;
