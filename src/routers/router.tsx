import { createBrowserRouter } from 'react-router-dom';
import { MainPage } from '../views/MainPage';
import { ROUTERS } from './constants';
import { ErrorPage } from '../views/ErrorPage';
// import { BookDetails } from '../components/BookDetails';

export const router = createBrowserRouter([
  {
    path: ROUTERS.root,
    element: <MainPage />,
    errorElement: <ErrorPage />,
    // children: [
    //   {
    //     path: ROUTERS.main.details,
    //     element: <BookDetails />,
    //   },
    // ],
  },
]);
