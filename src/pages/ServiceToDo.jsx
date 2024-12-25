import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const ServiceToDo = () => {
  const { user } = useAuth();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch services where the logged-in user is the provider
    const fetchServices = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/purchases?email=${user?.email}`
        );
        const data = await response.json();
        setServices(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch services:", error);
        toast.error("Failed to load services");
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchServices();
    }
  }, [user?.email]);

  const handleStatusChange = async (id, status) => {
    try {
      const response = await fetch(`http://localhost:5000/purchase/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ serviceStatus: status }),
      });
      if (response.ok) {
        setServices((prevServices) =>
          prevServices.map((service) =>
            service._id === id ? { ...service, serviceStatus: status } : service
          )
        );
        toast.success("Service status updated successfully!");
      } else {
        toast.error("Failed to update service status");
      }
    } catch (error) {
      console.error("Error updating service status:", error);
      toast.error("An error occurred while updating the status");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Service To-Do</h1>
      {services.length === 0 ? (
        <div className="text-center text-gray-600">
          <p className="text-xl">No services to manage right now.</p>
        </div>
      ) : (
        <div className="overflow-x-auto lg:max-h-screen pb-32 lg:overflow-y-auto">
          <table className="table-auto w-full bg-white rounded-lg shadow-md">
            <thead className="bg-gray-200 text-sm">
              <tr>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Service Name</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Location</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Customer</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service._id} className="hover:bg-gray-100 text-sm">
                  <td className="px-4 py-2">
                    <img
                      src={service.serviceImage}
                      alt={service.serviceName}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  </td>
                  <td className="px-4 py-2 font-bold">{service.serviceName}</td>
                  <td className="px-4 py-2">${service.price}</td>
                  <td className="px-4 py-2">{service.serviceArea}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`badge ${
                        service.serviceStatus === "pending"
                          ? "badge-warning"
                          : service.serviceStatus === "working"
                          ? "badge-info"
                          : "badge-success"
                      }`}
                    >
                      {service.serviceStatus}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      <img
                        src={service?.bookedBy?.image}
                        alt={service?.bookedBy?.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p className="font-bold">{service?.bookedBy?.name}</p>
                        <p className="text-gray-600 text-xs">
                          {service?.bookedBy?.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <div className="dropdown">
                      <label
                        tabIndex={0}
                        className="btn btn-sm btn-outline w-full"
                      >
                        Change Status
                      </label>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu p-2 shadow bg-gray-500 rounded-box w-52"
                      >
                        <li>
                          <button
                            onClick={() =>
                              handleStatusChange(service._id, "pending")
                            }
                            className="hover:bg-gray-300 px-2 py-1 rounded"
                          >
                            Pending
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() =>
                              handleStatusChange(service._id, "working")
                            }
                            className="hover:bg-gray-300 px-2 py-1 rounded"
                          >
                            Working
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() =>
                              handleStatusChange(service._id, "completed")
                            }
                            className="hover:bg-gray-300 px-2 py-1 rounded"
                          >
                            Completed
                          </button>
                        </li>
                      </ul>
                    </div>
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

export default ServiceToDo;
