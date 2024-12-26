import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../hooks/useAuth"; // Assuming you're using useAuth to get dark mode

const ServiceFeatures = () => {
  const { isDarkMode } = useAuth();

  // Theme-based styling classes
  const containerClass = isDarkMode
    ? "bg-gray-900 text-gray-200"
    : "bg-gradient-to-r from-blue-50 via-white to-blue-50 text-gray-700";
  const cardClass = isDarkMode
    ? "bg-gray-800 text-gray-200"
    : "bg-white text-gray-700";
  // const buttonClass = isDarkMode
  //   ? "bg-gray-700 hover:bg-gray-600 text-white"
  //   : "bg-gray-200 hover:bg-gray-300 text-gray-700";
  const titleClass = isDarkMode ? "text-white" : "text-primary";
  const descriptionClass = isDarkMode ? "text-gray-400" : "text-neutral";

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
    exit: { opacity: 0, y: 50 },
  };

  return (
    <section className={`py-12 ${containerClass}`}>
      <div className="container mx-auto px-6 lg:px-20">
        <div className="text-center mb-12">
          <h2 className={`text-3xl lg:text-4xl font-bold ${titleClass} mb-4`}>
            Why Choose Our Services?
          </h2>
          <p className={`text-lg ${descriptionClass}`}>
            Discover the unique features that make our services stand out. We
            strive to provide excellence, convenience, and a seamless experience
            for our users.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {[
              {
                icon: "ri-user-star-line",
                title: "Personalized Service",
                description:
                  "Our platform tailors services to meet your individual needs, ensuring a customized and satisfying experience every time.",
              },
              {
                icon: "ri-shield-check-line",
                title: "Trusted and Secure",
                description:
                  "We ensure complete transparency and security at every step of the process, giving you peace of mind.",
              },
              {
                icon: "ri-customer-service-2-line",
                title: "24/7 Support",
                description:
                  "Our dedicated support team is always available to assist you with any questions or concerns.",
              },
              {
                icon: "ri-lightbulb-flash-line",
                title: "Innovative Solutions",
                description:
                  "We bring cutting-edge technology and creative solutions to address your challenges effectively.",
              },
              {
                icon: "ri-hand-heart-line",
                title: "Community-Driven",
                description:
                  "We foster a supportive community where service providers and seekers can thrive together.",
              },
              {
                icon: "ri-global-line",
                title: "Global Reach",
                description:
                  "Our platform connects users worldwide, offering a diverse range of services to suit every need.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileInView="visible"
                viewport={{ once: false, amount: 0.5 }} // Reset when leaving and re-entering
                variants={cardVariants}
                className={`p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ${cardClass}`}
              >
                <div className="text-center mb-4">
                  <div className="inline-block bg-primary text-white p-4 rounded-full">
                    <i className={`text-3xl ${feature.icon}`}></i>
                  </div>
                </div>
                <h3
                  className={`text-xl font-semibold ${titleClass} text-center mb-2`}
                >
                  {feature.title}
                </h3>
                <p className={`text-center ${descriptionClass}`}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ServiceFeatures;
