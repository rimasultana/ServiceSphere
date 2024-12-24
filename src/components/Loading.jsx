const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <span className="text-blue-500 font-semibold">...</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
