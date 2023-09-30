import React from 'react';

const Banner = React.lazy(() => import('./Banner'));
const SearchForm = React.lazy(() => import('./SearchForm'));
const DataGrid = React.lazy(() => import('./DataGrid'));
const SeriesComponent = React.lazy(() => import('./SeriesDataGrid'));

export { Banner, SearchForm, DataGrid ,SeriesComponent};
