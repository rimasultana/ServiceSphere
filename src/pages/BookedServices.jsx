import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/Loading";

const BookedServices = () => {
  const { user } = useAuth();
  const [bookedServices, setBookedServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch services booked by the logged-in user
    const fetchBookedServices = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/purchases?email=${user?.email}`
        );
        const data = await response.json();
        setBookedServices(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch booked services:", error);
        toast.error("Failed to load booked services");
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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        My Booked Services
      </h1>
      {bookedServices.length === 0 ? (
        <div className="text-center text-gray-600">
          <p className="text-xl">You haven&lsquo;t booked any services yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookedServices.map((service) => (
            <div
              key={service._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
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
                <p className="text-gray-600 mb-2">Price: ${service.price}</p>
                <p className="text-gray-600 mb-2">
                  Location: {service.serviceArea}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Service Date:</strong> {service.serviceTakingDate}
                </p>
                <p className="text-gray-600 mb-4">
                  <strong>Status:</strong>{" "}
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
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-gray-800 font-bold">
                      {service.providerName}
                    </p>
                    <p className="text-gray-600">{service.providerEmail}</p>
                  </div>
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
