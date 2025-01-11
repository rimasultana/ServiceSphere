/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { FaShieldAlt, FaClock, FaUserTie, FaHandshake } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router";

const WhyChooseUs = () => {
  const { isDarkMode, user } = useAuth();
  const navigate = useNavigate();

  // Theme-based styling classes
  const containerClass = isDarkMode
    ? "bg-gray-900 text-gray-200"
    : "bg-gradient-to-b from-white to-blue-50 text-gray-700";
  const cardClass = isDarkMode
    ? "bg-gray-800 text-gray-200 border-gray-700"
    : "bg-white text-gray-700 border-blue-100";
  const titleClass = isDarkMode ? "text-white" : "text-blue-600";
  const descriptionClass = isDarkMode ? "text-gray-400" : "text-gray-600";

  const handleGetStarted = () => {
    if (user) {
      navigate('/services');
    } else {
      navigate('/login');
    }
  };

  const features = [
    {
      icon: <FaShieldAlt className="text-4xl text-blue-500" />,
      title: "Trusted Service",
      description:
        "100% guaranteed satisfaction with our professional services",
    },
    {
      icon: <FaClock className="text-4xl text-blue-500" />,
      title: "24/7 Support",
      description: "Round-the-clock customer service to assist you anytime",
    },
    {
      icon: <FaUserTie className="text-4xl text-blue-500" />,
      title: "Expert Team",
      description: "Highly skilled professionals with years of experience",
    },
    {
      icon: <FaHandshake className="text-4xl text-blue-500" />,
      title: "Best Value",
      description: "Competitive pricing with unmatched service quality",
    },
  ];

  return (
    <section className={`py-16 ${containerClass}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${titleClass}`}>
            Why Choose ServiceSphere?
          </h2>
          <p className={`text-lg ${descriptionClass} max-w-2xl mx-auto`}>
            We take pride in delivering exceptional service experiences that
            exceed expectations. Here&apos;s what sets us apart from the rest.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`${cardClass} p-6 rounded-xl border shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer`}
              onClick={() => navigate('/services')}
            >
              <div className="text-center">
                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${titleClass}`}>
                  {feature.title}
                </h3>
                <p className={descriptionClass}>
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <button 
            onClick={handleGetStarted}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Get Started Today
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
