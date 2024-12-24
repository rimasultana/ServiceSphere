import { useState } from "react";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const AddService = () => {
  const { user } = useAuth();
  const [serviceName, setServiceName] = useState("");
  const [price, setPrice] = useState("");
  const [serviceArea, setServiceArea] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleAddService = async (e) => {
    e.preventDefault();

    if (!serviceName || !price || !serviceArea || !description || !imageUrl) {
      toast.error("All fields are required!");
      return;
    }

    const serviceData = {
      serviceName,
      price,
      serviceArea,
      description,
      imageUrl,
      serviceProvider: {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      },
    };

    try {
      // Assuming `addServiceToDatabase` is a function that sends data to your backend
      console.log(serviceData);
      toast.success("Service added successfully!");
      // Clear form fields
      setServiceName("");
      setPrice("");
      setServiceArea("");
      setDescription("");
      setImageUrl("");
    } catch (error) {
      console.error("Error adding service:", error);
      toast.error("Failed to add service");
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-gray-700 text-center mb-4">
          Add New Service
        </h1>
        <form onSubmit={handleAddService} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image URL
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-indigo-300"
              placeholder="Enter image URL"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Service Name
            </label>
            <input
              type="text"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-indigo-300"
              placeholder="Enter service name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-indigo-300"
              placeholder="Enter service price"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Service Area
            </label>
            <input
              type="text"
              value={serviceArea}
              onChange={(e) => setServiceArea(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-indigo-300"
              placeholder="Enter service area"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-indigo-300"
              placeholder="Enter service description"
              rows="4"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 focus:ring focus:ring-indigo-300"
          >
            Add Service
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddService;
