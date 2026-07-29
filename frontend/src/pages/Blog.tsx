import { Link } from "react-router";
import Navbar from "../components/Navbar";
import styles from "./Blog.module.css";
import { useCallback, useEffect, useState } from "react";
import { ThemedText } from "../components/ThemedText";
import { ThemedButton } from "../components/ThemedButton";
import { MdArrowForward, MdChevronLeft, MdChevronRight } from "react-icons/md";
import { Carousel } from "@mantine/carousel";
import type { EmblaCarouselType } from "embla-carousel";
import { Progress } from "@mantine/core";

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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [embla, setEmbla] = useState<EmblaCarouselType | null>(null);

  const handleScroll = useCallback(() => {
    if (!embla) return;
    const progress = Math.max(0, Math.min(1, embla.scrollProgress()));
    setScrollProgress(progress * 100);
  }, [embla]);

  const scrollPrev = useCallback(() => embla?.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla?.scrollNext(), [embla]);

  useEffect(() => {
    if (embla) {
      embla.on("scroll", handleScroll);
      handleScroll();
    }
  }, [embla, handleScroll]);

  const moduleArr = Object.entries(posts);
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

  const monthGroups = postList.reduce<{ label: string; startIndex: number }[]>(
    (acc, post, i) => {
      const month = new Date(post.date).toLocaleDateString("en-US", {
        month: "short",
      });
      if (i === 0 || month !== acc[acc.length - 1].label) {
        acc.push({ label: month, startIndex: i });
      }
      return acc;
    },
    [],
  );

  const monthBoundaries = monthGroups.map((g) => ({
    label: g.label,
    position: (g.startIndex / postList.length) * 100,
  }));

  console.log("Imported posts:", Object.keys(posts));

  return (
    <>
      <Navbar />
      <main className={styles.postsWrapper}>
        <div className={styles.echelonHeader}>
          <ThemedText type="h1">
            Echelon:{" "}
            <ThemedText
              type="h1"
              style={{ color: "rgb(var(--color-text-alt))" }}
            >
              5 Months of Growth.
            </ThemedText>
          </ThemedText>
          <ThemedText>
            Walk through how a student capstone turned into real production work
            on the Echelon Fit team
          </ThemedText>
        </div>
        <div className={styles.timeline}>
          <Carousel
            className={styles.carousel}
            slideSize={{ base: "80%", sm: "50%", lg: "22%" }}
            slideGap={{ base: "xl", sm: "xl", lg: "xl" }}
            emblaOptions={{ dragFree: true, align: "start" }}
            getEmblaApi={setEmbla}
            withControls={false}
          >
            {postList.map((post) => (
              <Carousel.Slide className={styles.slide} key={post.date}>
                <Link className={styles.postPreview} to={`/blog/${post.slug}`}>
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
                  <ThemedText textAlign="start" type="h6">
                    {post.title}
                  </ThemedText>
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
              </Carousel.Slide>
            ))}
          </Carousel>
          <div className={styles.controls}>
            <div className={styles.progressColumn}>
              <div className={styles.progressWrapper}>
                <Progress
                  value={scrollProgress}
                  className={styles.progress}
                  color="rgb(var(--color-primary-3))"
                  bg="rgba(var(--color-primary-3), 0.2)"
                  size="sm"
                />
                <div className={styles.markers}>
                  {monthBoundaries.map((b) => (
                    <div
                      key={b.label}
                      className={styles.marker}
                      style={{ left: `${b.position}%` }}
                    />
                  ))}
                </div>
              </div>
              <div className={styles.labelsRow}>
                {monthBoundaries.map((b) => (
                  <ThemedText
                    key={b.label}
                    type="overline"
                    className={styles.monthLabel}
                    style={{ left: `${b.position}%` }}
                  >
                    {b.label}
                  </ThemedText>
                ))}
              </div>
            </div>
            <button className={styles.controlButton} onClick={scrollPrev}>
              <MdChevronLeft size={20} />
            </button>
            <button className={styles.controlButton} onClick={scrollNext}>
              <MdChevronRight size={20} />
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
