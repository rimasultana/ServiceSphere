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

  const sectionClass = isDarkMode
    ? "bg-gray-900 text-gray-200"
    : "bg-gray-100 text-gray-700";
  const buttonClass = isDarkMode
    ? "bg-blue-600 hover:bg-blue-500 text-white"
    : "bg-blue-500 hover:bg-blue-600 text-white";
  const titleClass = isDarkMode ? "text-gray-200" : "text-gray-800";
  const gridClass = isDarkMode
    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2"
    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2";

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(
          "https://a11-b10-server-side.vercel.app/service"
        );
        const data = await response.json();
        setServices(data);
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
    <section className={`py-12 px-4 ${sectionClass}`}>
      <motion.h2
        className={`text-2xl font-bold text-center mb-8 ${titleClass}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Popular Services
      </motion.h2>
      <div className={`grid gap-6 ${gridClass}`}>
        {services.slice(0, 6).map((service) => (
          <motion.div
            key={service._id}
            className="transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <ServiceCard service={service} />
          </motion.div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <motion.button
          onClick={handleShowAll}
          className={`px-6 py-2 rounded ${buttonClass}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Show All
        </motion.button>
      </div>
    </section>
  );
};

export default PopularServices;
