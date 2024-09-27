type PaginationProps = {
  setOffset: (n: number) => void;
  offset: number;
  limit: number;
  totalResults: number;
};

const Pagination = ({
  setOffset,
  offset,
  limit,
  totalResults,
}: PaginationProps) => {
  return (
    <div className="my-4">
      <button
        onClick={() => setOffset(offset - limit)}
        disabled={offset === 0}
        className="mx-4 bg-teal-800 text-white rounded-lg disabled:opacity-40 px-2"
      >
        Prev
      </button>
      <button
        onClick={() => setOffset(offset + limit)}
        disabled={offset >= totalResults - limit}
        className="mx-4 bg-teal-800 text-white rounded-lg disabled:opacity-40 px-2"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
