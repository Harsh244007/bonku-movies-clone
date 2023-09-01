import React, { useMemo, useState, useCallback } from "react";
import {
  selectSpaceXData,
  selectSpaceXLoading,
} from "../../configs/store/spaceXSlice";
import { Movie } from "../../configs/types/Types";
import { useSelector } from "react-redux";
import Loading from "../Common/Loading";
import MovieComponent from "./MovieComponent";
import Pagination from "../Common/Pagination";

const DataGrid: React.FC = () => {
  const spaceXData = useSelector(selectSpaceXData);
  const isLoading = useSelector(selectSpaceXLoading);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(
    () => Math.ceil(spaceXData.length / itemsPerPage),
    [spaceXData.length, itemsPerPage]
  );
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = useMemo(
    () => spaceXData && spaceXData.slice(indexOfFirstItem, indexOfLastItem),
    [spaceXData, indexOfFirstItem, indexOfLastItem]
  );

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return (
    <div className="bg-white p-4">
      {useMemo(() => {
        if (spaceXData.length === 0 && !isLoading ) {
          return <p>Oops There's some Error Please try again later</p>;
        } else if (!isLoading && spaceXData[0] !="no_posts") {
          return (
            <div className="flex flex-col justify-center items-center gap-20 max-w-auto">
              <div className="flex flex-wrap justify-center items-center gap-20 max-w-auto">
                {/* @ts-ignore  for vercel deployment*/}
                {currentItems?.map((item: Movie, index: number) => (
                  <MovieComponent
                    key={index}
                    title={item.title}
                    // @ts-ignore
                    LockKey={item.keys && item.keys}
                    type={item && item.url}
                    img={item.img}
                    // Add any other props you need
                  />
                ))}
              </div>
              {spaceXData.length > itemsPerPage && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          );
        } else if(spaceXData && spaceXData[0] =="no_posts") {
          // @ts-ignore
          return <p>{spaceXData && spaceXData[1]}</p>;
        }else  {
          return <Loading />;
        }
      }, [
        spaceXData,
        isLoading,
        currentItems,
        totalPages,
        currentPage,
        handlePageChange,
        itemsPerPage,
      ])}
      <a href='https://github.com/Harsh244007?tab=repositories'>
       <p>Made by Harsh with ❤️</p>
      </a>
     
    </div>
  );
};

export default React.memo(DataGrid);
