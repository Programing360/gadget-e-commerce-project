const SkeletonCard = () => {
  return (
    <div className="animate-pulse bg-white shadow rounded-xl overflow-hidden">
      
      {/* Image */}
      <div className="bg-gray-300 h-48 md:h-64 w-full"></div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>

        <div className="flex gap-2">
          <div className="h-5 bg-gray-300 rounded w-20"></div>
          <div className="h-5 bg-gray-200 rounded w-16"></div>
        </div>
      </div>

      {/* Button */}
      <div className="h-10 bg-gray-300 w-full"></div>
    </div>
  );
};

export default SkeletonCard;