/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";
import LoadingSpinner from "./Loading";
import { useNavigate } from "react-router";

const PopularServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all services
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:5000/service");
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
    <section className="py-12 px-4">
      <h2 className="text-2xl font-bold text-center mb-8">Popular Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {services.slice(0, 6).map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={handleShowAll}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Show All
        </button>
      </div>
    </section>
  );
};

export default PopularServices;
