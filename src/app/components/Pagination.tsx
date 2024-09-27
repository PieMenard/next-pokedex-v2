type PaginationProps = {
  offset: number;
  limit: number;
  totalResults: number;
  setOffset: (n: number) => void;
  loading: boolean;
};

const Pagination = ({
  offset,
  limit,
  totalResults,
  setOffset,
  loading,
}: PaginationProps) => {
  return (
    <div className="my-4">
      <button
        onClick={() => setOffset(offset - limit)}
        disabled={offset === 0 || loading}
        className="mx-4 bg-teal-800 text-white rounded-lg disabled:opacity-40 px-2"
      >
        Prev
      </button>
      <button
        onClick={() => setOffset(offset + limit)}
        disabled={offset >= totalResults - limit || loading}
        className="mx-4 bg-teal-800 text-white rounded-lg disabled:opacity-40 px-2"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
