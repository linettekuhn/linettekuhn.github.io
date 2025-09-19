import { Link } from "react-router";
import Navbar from "../components/Navbar";
import styles from "./Blog.module.css";

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

export default function Blog() {
  const moduleArr = Object.entries(posts);
  // extract metadata from imported mdx files
  const postList = moduleArr.map(([path, module]) => ({
    slug: path.split("/").pop()?.replace(".mdx", ""),
    title: module.frontmatter.title,
    date: module.frontmatter.date,
    wordCount: module.frontmatter.wordCount,
    tags: module.frontmatter.tags,
  }));

  return (
    <>
      <Navbar />
      <main className={styles.postsWrapper}>
        <h1>My Blog Posts</h1>
        <div className={styles.posts}>
          {postList.map((post) => {
            const formattedDate = new Date(post.date);

            return (
              <Link className={styles.postPreview} to={`/blog/${post.slug}`}>
                <h3>{post.title}</h3>
                <p>
                  {formattedDate.toDateString()} - {post.wordCount} words
                </p>
              </Link>
            );
          })}
        </div>
      </main>
    </>
  );
}
