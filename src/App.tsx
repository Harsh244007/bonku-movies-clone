import React, { useEffect, useState } from "react";
import { Banner, SearchForm, DataGrid, SeriesComponent } from "./components";
import Loading from "./components/Common/Loading";
import SeriesData from "./configs/JSON/SeriesData.json";

const App = () => {
  const [showSeriesDataGrid, setShowSeriesDataGrid] = useState(false);

  useEffect(() => {
    if (window.location.hostname !== "localhost") {
      console.log(() => {});
      console.info(() => {});
    }
  }, []);

  const handleSeriesButtonClick = (flag = false) => {
    setShowSeriesDataGrid(flag);
  };
  return (
    <>
      <React.Suspense fallback={<Loading />}>
        <Banner />
      </React.Suspense>

      <React.Suspense fallback={<Loading />}>
        {/* @ts-ignore */}
        <SearchForm series={showSeriesDataGrid} handleSeries={handleSeriesButtonClick}
        />
      </React.Suspense>
      {!showSeriesDataGrid ? (
        <React.Suspense fallback={<Loading />}>
          <DataGrid />
        </React.Suspense>
      ) : (
        <React.Suspense fallback={<Loading />}>
          <SeriesComponent seriesData={SeriesData} />
        </React.Suspense>
      )}
    </>
  );
};

export default App;
