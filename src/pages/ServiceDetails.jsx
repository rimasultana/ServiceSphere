import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [service, setService] = useState(null);

  useEffect(() => {
    // Fetch single service details by ID
    const fetchServiceDetails = async () => {
      try {
        const response = await fetch(
          `https://a11-b10-server-side.vercel.app/service/${id}`
        );
        const data = await response.json();
        setService(data);
      } catch (error) {
        console.error("Failed to fetch service details:", error);
        toast.error("Failed to load service details");
      }
    };
    fetchServiceDetails();
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

    try {
      const response = await fetch(
        `https://a11-b10-server-side.vercel.app/purchases`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(purchaseData),
        }
      );
      if (response.ok) {
        toast.success("Service booked successfully!");
        navigate("/my-purchases"); // Navigate to user purchases page
      } else {
        toast.error("Failed to book the service");
      }
    } catch (error) {
      console.error("Failed to book service:", error);
      toast.error("Failed to book the service");
    }
  };

  if (!service) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md">
        <img
          src={service.imageUrl}
          alt={service.serviceName}
          className="w-full h-64 object-cover rounded-t-lg"
        />
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-4">{service.serviceName}</h2>

          <p className="text-gray-700 mb-2">
            <strong>Price:</strong> ${service.price}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Location:</strong> {service.serviceArea}
          </p>
          <p className="text-gray-700 mb-2">
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
              <p className="text-gray-800 font-bold">
                {service.serviceProvider.name}
              </p>
              <p className="text-gray-600">{service.serviceProvider.email}</p>
            </div>
          </div>
          <button
            onClick={() => document.getElementById("booking_modal").showModal()}
            className="btn btn-primary w-full"
          >
            Book Now
          </button>
        </div>
      </div>
      <dialog id="booking_modal" className="modal">
        <form
          onSubmit={handlePurchase}
          method="dialog"
          className="modal-box bg-white rounded-lg p-6"
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
              <label className="block text-sm font-medium">Service ID</label>
              <input
                type="text"
                value={service._id}
                className="input input-bordered w-full"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Service Name</label>
              <input
                type="text"
                value={service.serviceName}
                className="input input-bordered w-full"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Service Image</label>
              <input
                type="text"
                value={service.imageUrl}
                className="input input-bordered w-full"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Provider Email
              </label>
              <input
                type="text"
                value={service.serviceProvider.email}
                className="input input-bordered w-full"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Provider Name</label>
              <input
                type="text"
                value={service.serviceProvider.name}
                className="input input-bordered w-full"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Your Email</label>
              <input
                type="text"
                value={user?.email}
                className="input input-bordered w-full"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Your Name</label>
              <input
                type="text"
                value={user?.displayName}
                className="input input-bordered w-full"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Service Date</label>
              <input
                type="date"
                name="serviceTakingDate"
                className="input input-bordered w-full"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium">
              Special Instructions
            </label>
            <textarea
              name="specialInstruction"
              className="textarea textarea-bordered w-full"
              placeholder="Enter any special requirements"
              rows="4"
            ></textarea>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium">Price</label>
            <input
              type="text"
              value={`$${service.price}`}
              className="input input-bordered w-full"
              readOnly
            />
          </div>
          <div className="flex justify-end mt-6">
            <button type="submit" className="btn btn-primary">
              Purchase
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default ServiceDetails;
