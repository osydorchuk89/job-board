import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/Home";
import { JobSearch } from "./pages/JobSearch";
import { JobPost } from "./pages/JobPost";
import { Contact } from "./pages/Contact";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/job-search",
        element: <JobSearch />,
    },
    {
        path: "/job-post",
        element: <JobPost />,
    },
    {
        path: "/contact",
        element: <Contact />,
    },
]);

export const App = () => {
    return <RouterProvider router={router} />
};