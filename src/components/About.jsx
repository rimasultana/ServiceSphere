import { motion } from "framer-motion";
import service from "../assets/team/service.jpg";
import useAuth from "../hooks/useAuth";

const AboutSection = () => {
  const { isDarkMode } = useAuth();

  // Theme-based styling classes
  const containerClass = isDarkMode
    ? "bg-gray-900 text-gray-200"
    : "bg-base-200 text-gray-700";
  const titleClass = isDarkMode ? "text-white" : "text-primary";
  const descriptionClass = isDarkMode ? "text-gray-400" : "text-neutral";
  const buttonClass = isDarkMode
    ? "btn btn-primary bg-gray-700 hover:bg-gray-600 text-white"
    : "btn btn-primary bg-primary hover:bg-blue-600 text-white";
  const cardClass = isDarkMode
    ? "rounded-lg shadow-lg bg-gray-800"
    : "rounded-lg shadow-lg";

  return (
    <section className={`${containerClass} py-12`}>
      <div className="container mx-auto px-6 lg:px-20">
        <div className="text-center">
          <h2 className={`text-3xl lg:text-4xl font-bold ${titleClass} mb-4`}>
            About ServiceSphere
          </h2>
          <p className={`text-lg ${descriptionClass} mb-8`}>
            ServiceSphere is a platform designed to bring people together
            through a unique service-sharing experience. Whether you&#39;re
            looking to book a service or share your expertise with others,
            ServiceSphere empowers you to connect, collaborate, and grow in an
            ever-evolving marketplace.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={service}
              alt="About ServiceSphere"
              className={`w-full ${cardClass}`}
            />
          </motion.div>
          <div>
            <h3 className={`text-2xl font-bold ${titleClass} mb-4`}>
              Why Choose Us?
            </h3>
            <ul
              className={`list-disc list-inside ${descriptionClass} space-y-3`}
            >
              <li>
                Seamless user experience for both service providers and seekers.
              </li>
              <li>Secure and transparent booking process.</li>
              <li>Built-in tools for service management and status updates.</li>
              <li>A growing community of skilled and trusted users.</li>
            </ul>
            <button className={`${buttonClass} mt-6`}>Learn More</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
