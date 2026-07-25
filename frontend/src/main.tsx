import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@mantine/core/styles.css";
import "./index.css";
import App from "./App.tsx";
import { HashRouter, Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import BlogPost from "./components/BlogPost.tsx";
import Blog from "./pages/Blog.tsx";
import Projects from "./pages/Projects.tsx";
import Contact from "./pages/Contact.tsx";

document.documentElement.style.opacity = "";
document.documentElement.classList.add("ready");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider defaultColorScheme="dark">
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
      </HashRouter>
    </MantineProvider>
  </StrictMode>,
);
