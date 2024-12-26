import { useEffect, useState } from "react";
import { Link } from "react-router";
import LoadingSpinner from "../components/Loading";
import useTitle from "../hooks/useTitle";
import { FaRegSadTear } from "react-icons/fa";
import useAuth from "../hooks/useAuth";

const Services = () => {
  const { isDarkMode } = useAuth();
  const containerClass = isDarkMode
    ? "bg-gray-900 text-gray-200"
    : "bg-gray-100 text-gray-700";
  const cardClass = isDarkMode
    ? "bg-gray-800 text-gray-200"
    : "bg-white text-gray-700";
  const buttonClass = isDarkMode
    ? "bg-gray-700 hover:bg-gray-600 text-white"
    : "bg-gray-200 hover:bg-gray-300 text-gray-700";

  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  useTitle("Services");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(
          "https://a11-b10-server-side.vercel.app/service"
        );
        const data = await response.json();
        setServices(data);
        setFilteredServices(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch services:", error);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredServices(services);
    } else {
      const filtered = services.filter((service) =>
        service.serviceName.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredServices(filtered);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={`min-h-screen p-6 ${containerClass}`}>
      <h1 className="text-3xl font-bold text-center mb-6 md:mb-8">
        All Services
      </h1>

      {/* Search Bar */}
      <div className="mb-6 text-center">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for services..."
          className={`md:w-96  p-2 rounded-md ${
            isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-700"
          } border border-gray-300`}
        />
      </div>

      {filteredServices.length === 0 ? (
        <div className="text-center flex flex-col items-center text-gray-600">
          <p>
            <FaRegSadTear className="text-4xl text-red-500 mb-4" />
          </p>
          <p className="text-lg md:text-xl">
            Sorry, no services match your search criteria.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table
            className={`table-auto w-full rounded-lg shadow-md ${cardClass}`}
          >
            <thead>
              <tr className=" text-sm md:text-base">
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Service Name</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Service Area</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Provider</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.map((service) => (
                <tr key={service._id} className=" text-sm md:text-base">
                  <td className="px-4 py-2">
                    <img
                      src={service.imageUrl}
                      alt={service.serviceName}
                      className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg"
                    />
                  </td>
                  <td className="px-4 py-2 font-bold">{service.serviceName}</td>
                  <td className="px-4 py-2">
                    {service.description.length > 100
                      ? `${service.description.substring(0, 100)}...`
                      : service.description}
                  </td>
                  <td className="px-4 py-2">{service.serviceArea}</td>
                  <td className="px-4 py-2">${service.price}</td>
                  <td className="px-4 py-2 mt-5 flex items-center gap-2">
                    <img
                      src={service.serviceProvider?.image}
                      alt={service.serviceProvider?.name}
                      className="w-6 h-6 md:w-8 md:h-8 rounded-full"
                    />
                    <span>{service.serviceProvider.name}</span>
                  </td>
                  <td className="px-4 py-2">
                    <Link
                      to={`/services/${service._id}`}
                      className={`py-2 px-4 rounded-md ${buttonClass}`}
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Services;
