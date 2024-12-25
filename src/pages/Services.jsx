import { useEffect, useState } from "react";
import { Link } from "react-router";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

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
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">
        All Services
      </h1>
      {services.length === 0 ? (
        <div className="text-center text-gray-600">
          <p className="text-lg md:text-xl">
            No services available at the moment.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200 text-sm md:text-base">
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
              {services.map((service) => (
                <tr
                  key={service._id}
                  className="hover:bg-gray-100 text-sm md:text-base"
                >
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
                      src={service.serviceProvider.image}
                      alt={service.serviceProvider.name}
                      className="w-6 h-6 md:w-8 md:h-8 rounded-full"
                    />
                    <span>{service.serviceProvider.name}</span>
                  </td>
                  <td className="px-4 py-2">
                    <Link
                      to={`/services/${service._id}`}
                      className="btn btn-primary btn-sm"
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
