// module declaration for TypeScript to understand files ending in .mdx
declare module "*.mdx" {
  export const frontmatter: {
    title: string;
    date: string;
    wordCount: number;
    tags?: string[];
    thumbnail?: string;
  };
  export const excerpt: string;
  import * as React from "react";
  const MDXComponent: React.FC;
  export default MDXComponent;
}
