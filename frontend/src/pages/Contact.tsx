import Navbar from "../components/Navbar";
import styles from "./Contact.module.css";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithubSquare } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import { ThemedText } from "../components/ThemedText";
import { MdOutlineFileDownload, MdSend } from "react-icons/md";
import { TbFileSmileFilled } from "react-icons/tb";
import GooBackground from "../components/GooBackground";
import { ThemedInput } from "../components/ThemedInput";
import { ThemedButton } from "../components/ThemedButton";

export default function Contact() {
  const [name, setName] = useState("");
  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    formData.append("access_key", "d1f75399-8d5f-41f5-af64-a563c02fba3f");

    console.log(
      "Submitting form data:",
      Object.fromEntries(formData.entries()),
    );
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      toast.success(`I'll reach back to you soon, ${name}!`);
    } else {
      console.log("Error", data);
      toast.error(data.message);
    }
  };
  return (
    <>
      <Navbar />
      <main className={styles.contactPage}>
        <GooBackground dotCount={8} />
        <div className={styles.content}>
          <div className={styles.info}>
            <div className={styles.aboutCard}>
              <div className={styles.aboutHeader}>
                <div className={styles.aboutPhoto}>
                  <img
                    src="/images/professionalphoto.jpg"
                    alt="professional photo"
                  />
                </div>
                <div className={styles.name}>
                  <ThemedText type="h3" weight="semiBold">
                    Linette Kühn
                  </ThemedText>
                  <ThemedText
                    type="overline"
                    style={{ letterSpacing: "var(--space-3xs)" }}
                  >
                    software engineer
                  </ThemedText>
                </div>
              </div>
              <ThemedText>
                I'm a full-stack software developer with hands-on experience
                across web, mobile, and AI/ML, focused on building clean,
                user-centered products. I love turning complex ideas into
                simple, intuitive interfaces, whether that's a mobile app, a
                backend API, or an AI agent under the hood. I'm always learning,
                always building, and always excited for the next challenge.
              </ThemedText>
              <div className={styles.pills}>
                <ThemedText type="footnote" className={styles.pill}>
                  Full-Stack
                </ThemedText>
                <ThemedText type="footnote" className={styles.pill}>
                  Web &amp; Mobile
                </ThemedText>
                <ThemedText type="footnote" className={styles.pill}>
                  AI/ML
                </ThemedText>
                <ThemedText type="footnote" className={styles.pill}>
                  Cloud &amp; DevOps
                </ThemedText>
                <ThemedText type="footnote" className={styles.pill}>
                  Clean UI/UX
                </ThemedText>
              </div>
            </div>
            <a
              href="/files/KuhnLinette_Resume.pdf"
              download
              className={`${styles.resume} ${styles.card}`}
            >
              <div className={styles.resumeHeader}>
                <div className={styles.icon}>
                  <TbFileSmileFilled />
                </div>
                <div>
                  <ThemedText type="h6">Curriculum Vitae</ThemedText>
                  {/*update when replacing resume file*/}
                  <ThemedText
                    type="caption"
                    style={{ color: "rgb(var(--color-text-alt))" }}
                  >
                    Download Resumé (PDF, 205 KB)
                  </ThemedText>
                </div>
              </div>
              <MdOutlineFileDownload />
            </a>
            <div className={styles.linksWrapper}>
              <a
                className={`${styles.github} ${styles.card}`}
                href="https://github.com/linettekuhn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={styles.resumeHeader}>
                  <div className={styles.icon}>
                    <FaGithubSquare />
                  </div>
                  <div>
                    <ThemedText type="h6">GitHub</ThemedText>
                    <ThemedText
                      className={styles.cardCaption}
                      type="caption"
                      style={{ color: "rgb(var(--color-text-alt))" }}
                    >
                      Check out my projects in depth
                    </ThemedText>
                  </div>
                </div>
              </a>
              <a
                className={`${styles.linkedin} ${styles.card}`}
                href="https://www.linkedin.com/in/linettekuhn/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={styles.resumeHeader}>
                  <div className={styles.icon}>
                    <FaLinkedin />
                  </div>
                  <div>
                    <ThemedText type="h6">Linkedin</ThemedText>
                    <ThemedText
                      className={styles.cardCaption}
                      type="caption"
                      style={{ color: "rgb(var(--color-text-alt))" }}
                    >
                      Connect with me!
                    </ThemedText>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <form className={styles.contactForm} onSubmit={onFormSubmit}>
            <ThemedText type="h6">Got an idea? Let's build it.</ThemedText>
            <ThemedText type="caption">
              Whether you've got a project in mind or just want to say hi, I'd
              love to hear from you. I'll get back to you within 24 hours.
            </ThemedText>
            <div style={{ display: "flex", gap: "var(--space-s)" }}>
              <ThemedInput
                label="full name"
                placeholder="Your name"
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <ThemedInput
                label="email address"
                placeholder="you@example.com"
                name="email"
                type="email"
              />
            </div>
            <ThemedInput
              label="message"
              placeholder="Tell me a bit about your project or idea..."
              name="message"
              id="message"
              multiline
            />
            <ThemedButton textType="overline" rightIcon={<MdSend />}>
              Send Message
            </ThemedButton>
          </form>
        </div>
        <ToastContainer />
      </main>
    </>
  );
}
