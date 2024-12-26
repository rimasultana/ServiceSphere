import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaExclamationCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/Loading";
import useTitle from "../hooks/useTitle";
import Swal from "sweetalert2";

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const { user, isDarkMode } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);
  useTitle("Manage-Service");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://a11-b10-server-side.vercel.app/service?email=${user?.email}`
        );
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Failed to fetch services:", error);
        toast.error("Failed to fetch services");
      } finally {
        setIsLoading(false);
      }
    };
    fetchServices();
  }, [user?.email]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await fetch(`https://a11-b10-server-side.vercel.app/service/${id}`, {
          method: "DELETE",
        });
        setServices((prev) => prev.filter((service) => service._id !== id));
        Swal.fire("Deleted!", "The service has been deleted.", "success");
      } catch (error) {
        console.error("Failed to delete service:", error);
        Swal.fire("Error!", "Failed to delete the service.", "error");
      }
    }
  };

  const handleEditClick = (service) => {
    setSelectedService(service);
    document.getElementById(`edit_modal_${service._id}`).showModal();
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const updatedService = {
      ...selectedService,
      serviceName: event.target.serviceName.value,
      price: event.target.price.value,
      serviceArea: event.target.serviceArea.value,
      description: event.target.description.value,
    };

    fetch(
      `https://a11-b10-server-side.vercel.app/service/${selectedService._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedService),
      }
    )
      .then((response) => response.json())
      .then(() => {
        setServices((prev) =>
          prev.map((service) =>
            service._id === selectedService._id ? updatedService : service
          )
        );
        toast.success("Service updated successfully!");
        document.getElementById(`edit_modal_${selectedService._id}`).close();
      })
      .catch((error) => {
        console.error("Failed to update service:", error);
        toast.error("Failed to update service");
      });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Dynamic theme classes
  const containerClass = isDarkMode
    ? "bg-gray-900 text-gray-200"
    : "bg-gray-100 text-gray-700";
  const cardClass = isDarkMode
    ? "bg-gray-800 text-gray-200"
    : "bg-white text-gray-700";
  const buttonClass = isDarkMode
    ? "bg-gray-700 hover:bg-gray-600 text-white"
    : "bg-gray-200 hover:bg-gray-300 text-gray-700";

  return (
    <div className={`min-h-screen p-6 ${containerClass}`}>
      <h1 className="text-3xl font-bold text-center mb-8">
        Manage Your Services
      </h1>
      {services.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center">
          <FaExclamationCircle className="text-6xl mb-4" />
          <p className="text-lg font-semibold">No services found.</p>
          <p className="text-sm">
            Start by adding a new service to your dashboard.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service._id}
              className={`rounded-lg shadow-md overflow-hidden ${cardClass}`}
            >
              <img
                src={service.imageUrl}
                alt={service.serviceName}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">
                  {service.serviceName}
                </h2>
                <p className="mb-2">Price: ${service.price}</p>
                <p className="mb-2">Area: {service.serviceArea}</p>
                <p>{service.description}</p>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleEditClick(service)}
                    className={`flex items-center px-4 py-2 rounded-lg ${buttonClass}`}
                  >
                    <FaEdit className="mr-2" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(service._id)}
                    className={`flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600`}
                  >
                    <FaTrash className="mr-2" /> Delete
                  </button>
                </div>
              </div>
              <dialog id={`edit_modal_${service._id}`} className="modal">
                <div className={`modal-box ${cardClass}`}>
                  <form onSubmit={handleUpdate}>
                    <button
                      type="button"
                      className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                      onClick={() =>
                        document
                          .getElementById(`edit_modal_${service._id}`)
                          .close()
                      }
                    >
                      ✕
                    </button>
                    <h3 className="font-bold text-lg mb-4">Edit Service</h3>
                    <div className="mb-4">
                      <label className="block text-sm font-medium">
                        Service Name
                      </label>
                      <input
                        type="text"
                        name="serviceName"
                        defaultValue={selectedService?.serviceName}
                        className="input input-bordered w-full"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium">Price</label>
                      <input
                        type="number"
                        name="price"
                        defaultValue={selectedService?.price}
                        className="input input-bordered w-full"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium">
                        Service Area
                      </label>
                      <input
                        type="text"
                        name="serviceArea"
                        defaultValue={selectedService?.serviceArea}
                        className="input input-bordered w-full"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium">
                        Description
                      </label>
                      <textarea
                        name="description"
                        defaultValue={selectedService?.description}
                        className="textarea textarea-bordered w-full"
                        rows="4"
                        required
                      ></textarea>
                    </div>
                    <div className="flex justify-end">
                      <button type="submit" className="btn btn-primary">
                        Update Service
                      </button>
                    </div>
                  </form>
                </div>
              </dialog>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageServices;
