import { useState } from 'react'
import { useEffect } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router";
import AddMovie from './pages/AddMovie';
import Landing from './pages/Landing';
import DisplayData from './pages/DisplayData';
import MainLayout from './layouts/MainLayout';

const router = createBrowserRouter(createRoutesFromElements(
  <Route>
    <Route path='/' element={<MainLayout />}>
      <Route index element={<Landing />} />
      <Route path=':movie_id' element={<DisplayData />} />
    </Route>
    <Route path='/addmovie' element={<AddMovie />} />
  </Route>
));

function App() {
  return (
    <RouterProvider router={router} />
  );
}


export default App
