import { Link } from "react-router";
import Navbar from "../components/Navbar";
import styles from "./Blog.module.css";
import { useEffect, useRef } from "react";

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

  const timelineRef = useRef<HTMLDivElement | null>(null);

  // add event listener for scrolling horizontally in the timeline
  useEffect(() => {
    const element = timelineRef.current;
    if (!element) return;

    const handleWheelScroll = (event: WheelEvent) => {
      if (window.innerWidth >= 700) {
        event.preventDefault();
        element.scrollLeft += event.deltaY;
      }
    };

    element.addEventListener("wheel", handleWheelScroll);

    return () => {
      element.removeEventListener("wheel", handleWheelScroll);
    };
  }, []);

  useEffect(() => {
    if (timelineRef.current) {
      timelineRef.current.scrollTo({
        left: timelineRef.current.scrollWidth,
        behavior: "smooth",
      });
    }
  }, [postList]);
  return (
    <>
      <Navbar />
      <main className={styles.postsWrapper}>
        <h1>My Blog Posts</h1>
        <div
          className={styles.postTimeline}
          style={{
            gridTemplateColumns: `repeat(${postList.length}, minmax(min-content, 40vw))`,
          }}
          ref={timelineRef}
        >
          <div className={styles.timelineLine}></div>
          {postList.map((post, i) => {
            const formattedDate = new Date(post.date);

            return (
              <Link
                key={post.date}
                className={styles.postPreview}
                to={`/blog/${post.slug}`}
                style={{ gridColumn: i + 1 }}
              >
                <h5>{post.title}</h5>
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
