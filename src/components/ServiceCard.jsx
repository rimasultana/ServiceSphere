/* eslint-disable react/prop-types */

import { Link } from "react-router";

const ServiceCard = ({ service }) => {
  return (
    <div className="rounded overflow-hidden shadow-lg bg-white">
      <img
        src={service.imageUrl}
        alt={service.serviceName}
        className="w-full h-56 object-cover"
      />
      <div className="px-6 py-4">
        <h2 className="text-xl font-semibold">{service.serviceName}</h2>
        <p className="text-gray-700 mb-2">
          <strong>Price:</strong> ${service.price}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Description: </strong>
          {service.description}
        </p>
        <div className="flex items-center mt-4">
          <img
            src={service.serviceProvider.image}
            alt={service.serviceProvider.name}
            className="w-10 h-10 rounded-full mr-2"
          />
          <span className="text-gray-800 font-medium">
            {service.serviceProvider.name}
          </span>
        </div>
        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-700 text-lg font-bold mb-2">
            <strong>Price:</strong> ${service.price}
          </p>
          <Link to={`/services/${service?._id}`}>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
