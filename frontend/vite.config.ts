import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    mdx({
      // remark plugins to parse and export frontmatter from mdx files
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    }),
  ],
});
