import React from 'react';

import { Loader, Routes } from 'components';

import './App.scss';

export const App = () => (
  <React.Suspense fallback={<Loader />}>
    <Routes />
  </React.Suspense>
);
