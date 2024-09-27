type PaginationProps = {
<<<<<<< HEAD
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
=======
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
>>>>>>> fd3a74e2ff3d1432095a08f61aa55781fd2d5734
}: PaginationProps) => {
  return (
    <div className="my-4">
      <button
        onClick={() => setOffset(offset - limit)}
<<<<<<< HEAD
        disabled={offset === 0}
=======
        disabled={offset === 0 || loading}
>>>>>>> fd3a74e2ff3d1432095a08f61aa55781fd2d5734
        className="mx-4 bg-teal-800 text-white rounded-lg disabled:opacity-40 px-2"
      >
        Prev
      </button>
      <button
        onClick={() => setOffset(offset + limit)}
<<<<<<< HEAD
        disabled={offset >= totalResults - limit}
=======
        disabled={offset >= totalResults - limit || loading}
>>>>>>> fd3a74e2ff3d1432095a08f61aa55781fd2d5734
        className="mx-4 bg-teal-800 text-white rounded-lg disabled:opacity-40 px-2"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
