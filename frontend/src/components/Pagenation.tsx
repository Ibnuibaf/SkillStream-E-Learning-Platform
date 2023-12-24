

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
function Pagenation({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav className="flex justify-center mt-4">
      <ul className="flex space-x-2">
        {pages.map((page) => (
          <li key={page}>
            <button
              className={`px-4 py-2 ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 hover:bg-gray-400 text-gray-800"
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagenation;
