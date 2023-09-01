import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchData } from "../../configs/store/spaceXSlice";
const SearchForm: React.FC = () => {
  const dispatch = useDispatch();
  const [movieName, setMovieName] = useState<string>("omg ");

  useEffect(() => {
    {/* @ts-ignore  for vercel deployment*/}
    dispatch(fetchData(movieName));
  }, []);

  let debounceTimer: ReturnType<typeof setTimeout>;
  const handleMovieChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setMovieName(value);
    if (value.length > 3) {
      clearTimeout(debounceTimer);

      debounceTimer = setTimeout(() => {
    {/* @ts-ignore  for vercel deployment*/}
        dispatch(fetchData(movieName));
      }, 1000);
    }
  };

  return (
    <div className="flex flex-wrap justify-evenly items-center bg-gray-200 p-4">
      <input
        type="text"
        tabIndex={0}
        className="p-2 rounded-md border border-gray-300 focus:ring focus:ring-blue-400 focus:outline-none w-full md:w-1/3"
        value={movieName}
        onChange={handleMovieChange}
        placeholder="Enter movie name..."
      />
    </div>
  );
};

export default React.memo(SearchForm);
