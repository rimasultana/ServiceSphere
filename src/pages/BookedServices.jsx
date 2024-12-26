import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaSadTear } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/Loading";
import useTitle from "../hooks/useTitle";

const BookedServices = () => {
  const { user, isDarkMode } = useAuth();
  const [bookedServices, setBookedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  useTitle("Booked-Service");

  useEffect(() => {
    const fetchBookedServices = async () => {
      try {
        const response = await fetch(
          `https://a11-b10-server-side.vercel.app/purchases?userEmail=${user?.email}`
        );
        const data = await response.json();
        setBookedServices(data);
      } catch (error) {
        console.error("Failed to fetch booked services:", error);
        toast.error("Failed to load booked services");
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchBookedServices();
    }
  }, [user?.email]);

  if (loading) {
    return <LoadingSpinner />;
  }

  // Dynamic theme classes
  const containerClass = isDarkMode
    ? "bg-gray-900 text-gray-200"
    : "bg-gray-100 text-gray-700";
  const cardClass = isDarkMode ? "bg-gray-800 shadow-md" : "bg-white shadow-lg";

  return (
    <div className={`min-h-screen p-6 ${containerClass}`}>
      <h1 className="text-3xl font-bold text-center mb-8">
        My Booked Services
      </h1>
      {bookedServices.length === 0 ? (
        <div className="flex flex-col items-center text-center text-gray-600">
          <FaSadTear className="text-6xl text-gray-400 mb-4" />
          <p className="text-xl">
            You haven&lsquo;t booked any services yet. Explore our services and
            book one today!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookedServices.map((service) => (
            <div
              key={service._id}
              className={`${cardClass} rounded-lg overflow-hidden`}
            >
              <img
                src={service.serviceImage}
                alt={service.serviceName}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">
                  {service.serviceName}
                </h2>
                <p className="mb-2">
                  <span className="font-semibold">Price:</span> ${service.price}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Service Date:</span>{" "}
                  {service.serviceTakingDate}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Status:</span>{" "}
                  <span
                    className={`badge ${
                      service.serviceStatus === "pending"
                        ? "badge-warning"
                        : "badge-success"
                    }`}
                  >
                    {service.serviceStatus}
                  </span>
                </p>
                <p className="font-bold">Provider:</p>{" "}
                <div>
                  <p className="font-bold">{service.providerName}</p>
                  <p>{service.providerEmail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookedServices;
