"use client";
import { useRouter } from "next/navigation";

export default function Pagination({
  currentPage,
  totalNumPage,
  perPage,
  ...prop
}) {
  const router = useRouter();
  const totalPage = Math.ceil(totalNumPage / perPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPage) return;
    router.push(`?page=${page}`);
  };

  return (
    <div {...prop}>
      <div className="flex justify-center gap-2">
        <button
          disabled={currentPage == 0}
          onClick={() => {
            handlePageChange(parseInt(currentPage) - 1);
          }}
          className={`px-2 py-1 text-gray-200 gap-2 flex items-center border rounded-md ${
            currentPage == 1 ? "text-gray-600 cursor-not-allowed " : ""
          }}`}
        >
          prev
        </button>
        {Array.from({ length: totalPage }, (_, idx) => {
          return (
            <button
              onClick={() => {
                handlePageChange(idx + 1);
              }}
              className={`px-2 py-1 border rounded  ${
                currentPage == idx + 1 ? "bg-gray-600/60 " : "bg-transparent"
              }`}
            >
              {idx + 1}
            </button>
          );
        })}
        <button
          disabled={currentPage == totalPage}
          onClick={() => {
            handlePageChange(parseInt(currentPage) + 1);
          }}
          className={`px-2 py-1 text-gray-200 gap-2 flex items-center border rounded-md ${
            currentPage == totalPage ? "text-gray-600 cursor-not-allowed " : ""
          }`}
        >
          next
        </button>
      </div>
    </div>
  );
}
