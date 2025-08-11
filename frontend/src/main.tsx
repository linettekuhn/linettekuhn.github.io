import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import BlogPost from "./components/BlogPost.tsx";
import Blog from "./pages/Blog.tsx";
import Projects from "./pages/Projects.tsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/projects", element: <Projects /> },
  { path: "/blog", element: <Blog /> },
  { path: "/blog/:slug", element: <BlogPost /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
