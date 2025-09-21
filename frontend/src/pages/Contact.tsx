import Navbar from "../components/Navbar";
import styles from "./Contact.module.css";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithubSquare } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    formData.append("access_key", "d1f75399-8d5f-41f5-af64-a563c02fba3f");

    console.log(
      "Submitting form data:",
      Object.fromEntries(formData.entries())
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
        <h2>Contact Me</h2>
        <form className={styles.contactForm} onSubmit={onFormSubmit}>
          <label htmlFor="name">
            Name:
            <input
              className={styles.input}
              type="text"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </label>
          <label htmlFor="email">
            Email:
            <input className={styles.input} type="email" name="email" />
          </label>
          <label htmlFor="message" className={styles.message}>
            Message:
            <textarea
              className={styles.input}
              name="message"
              id="message"
            ></textarea>
          </label>
          <button className="button">Send Message</button>
        </form>
        <div className={styles.socialLinks}>
          <h3>Social</h3>
          <a
            className={styles.github}
            href="https://github.com/linettekuhn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithubSquare /> GitHub
          </a>
          <a
            className={styles.linkedin}
            href="https://www.linkedin.com/in/linette-k%C3%BChn-63b176324"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin /> LinkedIn
          </a>
        </div>
        <ToastContainer />
      </main>
    </>
  );
}
