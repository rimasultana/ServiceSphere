const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative">
        <div className="w-20 h-20 border-8 border-t-8 border-transparent rounded-full animate-spin-slow border-blue-400 border-t-indigo-500"></div>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <span className="text-indigo-500 text-2xl font-semibold animate-pulse">
            ...
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
