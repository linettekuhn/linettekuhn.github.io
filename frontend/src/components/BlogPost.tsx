import { useParams } from "react-router";

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

export default function BlogPost() {
  // extract post filename from url
  const { slug } = useParams();
  // find filepath in list of posts
  const post = posts[`../posts/${slug}.mdx`];

  if (!post) return <h1>404 - Blog post not found</h1>;

  // extract MDX component and metadata from post
  const { default: Content, frontmatter } = post;
  return (
    <article>
      <h1>{frontmatter.title}</h1>
      <p>{frontmatter.date}</p>
      <Content />
    </article>
  );
}
