import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Register from './pages/Register'
import Editor from './pages/Editor';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Register />,
    errorElement: <h1>error</h1>,
  },
  {
    path: "/edit/:roomId",
    element: <Editor/>,
    errorElement: <h1>error</h1>,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App
