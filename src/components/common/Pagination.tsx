export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-1 mt-4">
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        className={`px-3 py-1 border border-gray-300 rounded-md ${
          currentPage === 1
            ? "text-gray-400 bg-gray-200 cursor-not-allowed"
            : "text-gray-600 bg-white hover:bg-gray-100"
        }`}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {[...Array(totalPages)].map((_, index) => {
        const page = index + 1;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 border rounded-md ${
              page === currentPage
                ? "bg-blue-500 text-white border-blue-500"
                : "text-gray-600 bg-white border-gray-300 hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={handleNext}
        className={`px-3 py-1 border border-gray-300 rounded-md ${
          currentPage === totalPages
            ? "text-gray-400 bg-gray-200 cursor-not-allowed"
            : "text-gray-600 bg-white hover:bg-gray-100"
        }`}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}
