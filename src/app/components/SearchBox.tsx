import { FormEvent } from 'react';

type SearchBoxProps = {
  query: string;
  setQuery: (term: string) => void;
  handleSearch: (e: FormEvent<HTMLFormElement>) => void;
};

const SearchBox = ({ query, setQuery, handleSearch }: SearchBoxProps) => {
  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-2 rounded-md"
        />
        <button type="submit" className="rounded-md bg-teal-600 px-2 mx-2">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
