import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/Loading";

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const { user } = useAuth();
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/service?email=${user?.email}`
        );
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      }
    };
    fetchServices();
  }, [user?.email]);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this service?")) {
      try {
        await fetch(`http://localhost:5000/service/${id}`, {
          method: "DELETE",
        });
        setServices((prev) => prev.filter((service) => service._id !== id));
        toast.success("Service deleted successfully!");
      } catch (error) {
        console.error("Failed to delete service:", error);
        toast.error("Failed to delete service");
      }
    }
  };
  if (!user) {
    return <LoadingSpinner />;
  }

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

    fetch(`http://localhost:5000/service/${selectedService._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedService),
    })
      .then((response) => response.json())
      .then((updatedService) => {
        console.log("Updated Service:", updatedService);
      })
      .catch((error) => {
        console.error("Failed to update service:", error);
        toast.error("Failed to update service");
      });

    setServices((prev) =>
      prev.map((service) =>
        service._id === selectedService._id ? updatedService : service
      )
    );
    document.getElementById(`edit_modal_${selectedService._id}`).close();
    toast.success("Service updated successfully!");
    // } catch (error) {
    //   console.error("Failed to update service:", error);
    //   toast.error("Failed to update service");
    // }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        Manage Your Services
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service._id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={service.imageUrl}
              alt={service.serviceName}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{service.serviceName}</h2>
              <p className="text-gray-600 mb-2">Price: ${service.price}</p>
              <p className="text-gray-600 mb-2">Area: {service.serviceArea}</p>
              <p className="text-gray-600">{service.description}</p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleEditClick(service)}
                  className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  <FaEdit className="mr-2" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(service._id)}
                  className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  <FaTrash className="mr-2" /> Delete
                </button>
              </div>
            </div>

            {/* Edit Modal */}
            <dialog id={`edit_modal_${service._id}`} className="modal">
              <div className="modal-box">
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
    </div>
  );
};

export default ManageServices;
