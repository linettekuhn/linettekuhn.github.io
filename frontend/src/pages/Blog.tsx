import { Link } from "react-router";
import Navbar from "../components/Navbar";
import styles from "./Blog.module.css";
import { useEffect, useRef } from "react";
import { ThemedText } from "../components/ThemedText";
import { ThemedButton } from "../components/ThemedButton";
import { MdArrowForward } from "react-icons/md";

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
      thumbnail?: string;
    };
    excerpt: string;
  }
>;

export default function Blog() {
  const moduleArr = Object.entries(posts);
  // extract metadata from imported mdx files
  const postList = moduleArr
    .map(([path, module]) => ({
      slug: path.split("/").pop()?.replace(".mdx", ""),
      title: module.frontmatter.title,
      date: module.frontmatter.date,
      wordCount: module.frontmatter.wordCount,
      tags: module.frontmatter.tags,
      thumbnail: module.frontmatter.thumbnail,
      excerpt: module.excerpt,
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const timelineRef = useRef<HTMLDivElement | null>(null);

  // add event listener for scrolling horizontally in the timeline
  useEffect(() => {
    const element = timelineRef.current;
    if (!element) return;

    const handleWheelScroll = (event: WheelEvent) => {
      const isTrackpad = Math.abs(event.deltaY) < 30;
      if (window.innerWidth >= 700 && !isTrackpad) {
        event.preventDefault();
        const scrollValue = event.deltaY * 0.4;
        element.scrollLeft += scrollValue;
      }
    };

    element.addEventListener("wheel", handleWheelScroll);

    return () => {
      element.removeEventListener("wheel", handleWheelScroll);
    };
  }, []);

  useEffect(() => {
    if (timelineRef.current) {
      timelineRef.current.scrollLeft = timelineRef.current.scrollWidth;

      const timeout = setTimeout(() => {
        timelineRef.current?.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      }, 200);

      return () => clearTimeout(timeout);
    }
  }, [postList]);

  console.log("Imported posts:", Object.keys(posts));

  return (
    <>
      <Navbar />
      <main className={styles.postsWrapper}>
        <div className={styles.echelonHeader}>
          <ThemedText type="h1">Echelon: 5 Months of Growth.</ThemedText>
          <ThemedText>
            Walk through how a student capstone turned into real production work
            on the Echelon Fit team
          </ThemedText>
        </div>
        <div
          className={styles.postTimeline}
          style={{
            gridTemplateColumns: `repeat(${postList.length}, minmax(min-content, 40vw))`,
          }}
          ref={timelineRef}
        >
          <div className={styles.timelineLine}></div>
          {postList.map((post, i) => {
            return (
              <Link
                key={post.date}
                className={styles.postPreview}
                to={`/blog/${post.slug}`}
                style={{ gridColumn: i + 1 }}
              >
                {post.thumbnail && (
                  <div className={styles.thumbnailWrapper}>
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className={styles.thumbnail}
                    />
                    <ThemedText type="caption" className={styles.dateBadge}>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </ThemedText>
                  </div>
                )}
                <ThemedText type="h6">{post.title}</ThemedText>
                <ThemedText className={styles.description}>
                  {post.excerpt}
                </ThemedText>
                <ThemedButton
                  rightIcon={<MdArrowForward />}
                  variant="link"
                  textType="overline"
                >
                  read chapter
                </ThemedButton>
              </Link>
            );
          })}
        </div>
      </main>
    </>
  );
}
