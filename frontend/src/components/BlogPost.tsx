import { useParams } from "react-router";
import Navbar from "./Navbar";

// import all posts using vite as components and metadata
const posts = import.meta.glob("../posts/*.mdx", { eager: true }) as Record<
  string,
  {
    default: React.FC;
    frontmatter: {
      title: string;
      date: string;
      wordCount: number;
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

  const formattedDate = new Date(frontmatter.date);

  return (
    <>
      <Navbar />
      <div className="content">
        <article className="blog-content">
          <h1>{frontmatter.title}</h1>
          <h3 className="italic">
            by Linette Kühn - {formattedDate.toDateString()}
          </h3>
          <Content />
        </article>
      </div>
    </>
  );
}
