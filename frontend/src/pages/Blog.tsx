import { Link } from "react-router";

// import all posts using vite as components and metadata
const posts = import.meta.glob("../posts/*.mdx", { eager: true }) as Record<
  string,
  {
    default: React.FC;
    frontmatter: {
      title: string;
      date: string;
      tags?: string[];
    };
  }
>;

export default function Blog() {
  const moduleArr = Object.entries(posts);
  // extract metadata from imported mdx files
  const postList = moduleArr.map(([path, module]) => ({
    slug: path.split("/").pop()?.replace(".mdx", ""),
    title: module.frontmatter.title,
    date: module.frontmatter.date,
    tags: module.frontmatter.tags,
  }));

  return (
    <div>
      <h1>Blog Posts</h1>
      {postList.map((post) => (
        <div key={post.slug}>
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
          <p>{post.date}</p>
        </div>
      ))}
    </div>
  );
}
