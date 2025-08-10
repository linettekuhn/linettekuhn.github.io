// module declaration for TypeScript to understand files ending in .mdx
declare module "*.mdx" {
  export const frontmatter: {
    title: string;
    date: string;
    tags?: string[];
  };
  import * as React from "react";
  const MDXComponent: React.FC;
  export default MDXComponent;
}
