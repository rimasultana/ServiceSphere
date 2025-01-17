import { useParams } from "react-router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/Loading";
import useTitle from "../hooks/useTitle";

const ServiceDetails = () => {
  const { id } = useParams();
  const { user, isDarkMode } = useAuth();
  const [service, setService] = useState(null);
  useTitle("Service-Details");

  useEffect(() => {
    fetch(`https://a11-b10-server-side.vercel.app/service/${id}`)
      .then((data) => data.json())
      .then((res) => {
        setService(res);
      })
      .catch((error) => {
        console.error("Failed to fetch service details:", error);
        toast.error("Failed to load service details");
      });
  }, [id]);

  const handlePurchase = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const purchaseData = {
      serviceId: service._id,
      serviceName: service.serviceName,
      serviceImage: service.imageUrl,
      providerEmail: service.serviceProvider.email,
      providerName: service.serviceProvider.name,
      userEmail: user?.email,
      userName: user?.displayName,
      serviceTakingDate: formData.get("serviceTakingDate"),
      specialInstruction: formData.get("specialInstruction"),
      price: service.price,
      serviceStatus: "pending",
    };

    fetch("https://a11-b10-server-side.vercel.app/purchase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(purchaseData),
    })
      .then((data) => data.json())
      .then((res) => {
        if (res.insertedId) {
          toast.success("Service booked successfully!");
          document.getElementById("booking_modal").close();
        }
      })
      .catch((error) => {
        console.error("Failed to book the service:", error);
        toast.error("Failed to book the service");
      });
  };

  if (!service) {
    return <LoadingSpinner />;
  }

  // Dynamic classes based on dark mode
  const containerClass = isDarkMode
    ? "bg-gray-900 text-gray-200"
    : "bg-gray-100 text-gray-700";
  const cardClass = isDarkMode
    ? "bg-gray-800 text-gray-200"
    : "bg-white text-gray-700";
  const buttonClass = isDarkMode
    ? "bg-blue-600 text-white hover:bg-blue-700"
    : "bg-blue-500 text-white hover:bg-blue-600";
  const inputClass = isDarkMode
    ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400"
    : "bg-white border-gray-300 text-gray-700 placeholder-gray-500";
  const modalClass = isDarkMode
    ? "bg-gray-800 text-gray-200"
    : "bg-white text-gray-700";

  return (
    <div className={`min-h-screen p-6 ${containerClass}`}>
      <div className={`max-w-4xl mx-auto ${cardClass} rounded-lg shadow-md`}>
        <img
          src={service.imageUrl}
          alt={service.serviceName}
          className="w-full h-64 object-cover rounded-t-lg"
        />
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-4">{service.serviceName}</h2>

          <p className="mb-2">
            <strong>Price:</strong> ${service.price}
          </p>
          <p className="mb-2">
            <strong>Location:</strong> {service.serviceArea}
          </p>
          <p className="mb-2">
            <strong>Description: </strong>
            {service.description}
          </p>
          <div className="flex items-center gap-4 my-4">
            <img
              src={service.serviceProvider.image}
              alt={service.serviceProvider.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-bold">{service.serviceProvider.name}</p>
              <p className="text-gray-600">{service.serviceProvider.email}</p>
            </div>
          </div>
          <button
            onClick={() => document.getElementById("booking_modal").showModal()}
            className={`flex items-center justify-center px-4 py-2 ${buttonClass} rounded-lg w-full`}
          >
            Book Now
          </button>
        </div>
      </div>

      <dialog id="booking_modal" className="modal">
        <form
          onSubmit={handlePurchase}
          method="dialog"
          className={`modal-box ${modalClass} rounded-lg p-6`}
        >
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => document.getElementById("booking_modal").close()}
          >
            ✕
          </button>
          <h3 className="font-bold text-lg mb-4">Book Service</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Service ID</label>
              <input
                type="text"
                value={service._id}
                className={`input input-bordered w-full ${inputClass}`}
                readOnly
              />
            </div>
            <div>
              <label className="text-sm font-medium">Service Name</label>
              <input
                type="text"
                value={service.serviceName}
                className={`input input-bordered w-full ${inputClass}`}
                readOnly
              />
            </div>
            <div>
              <label className="text-sm font-medium">Service Image</label>
              <input
                type="text"
                value={service.imageUrl}
                className={`input input-bordered w-full ${inputClass}`}
                readOnly
              />
            </div>
            <div>
              <label className="text-sm font-medium">Provider Email</label>
              <input
                type="text"
                value={service.serviceProvider.email}
                className={`input input-bordered w-full ${inputClass}`}
                readOnly
              />
            </div>
            <div>
              <label className="text-sm font-medium">Provider Name</label>
              <input
                type="text"
                value={service.serviceProvider.name}
                className={`input input-bordered w-full ${inputClass}`}
                readOnly
              />
            </div>
            <div>
              <label className="text-sm font-medium">Your Email</label>
              <input
                type="text"
                value={user?.email}
                className={`input input-bordered w-full ${inputClass}`}
                readOnly
              />
            </div>
            <div>
              <label className="text-sm font-medium">Your Name</label>
              <input
                type="text"
                value={user?.displayName}
                className={`input input-bordered w-full ${inputClass}`}
                readOnly
              />
            </div>
            <div>
              <label className="text-sm font-medium">Service Date</label>
              <input
                type="date"
                name="serviceTakingDate"
                className={`input input-bordered w-full ${inputClass}`}
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="text-sm font-medium">Special Instructions</label>
            <textarea
              name="specialInstruction"
              className={`textarea textarea-bordered w-full ${inputClass}`}
              placeholder="Enter any special requirements"
              rows="4"
            ></textarea>
          </div>
          <div className="mt-4">
            <label className="text-sm font-medium">Price</label>
            <input
              type="text"
              value={`$${service.price}`}
              className={`input input-bordered w-full ${inputClass}`}
              readOnly
            />
          </div>
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className={`flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600`}
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default ServiceDetails;
