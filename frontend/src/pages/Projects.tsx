import Navbar from "../components/Navbar";
import styles from "./Projects.module.css";
import { FaCode } from "react-icons/fa6";

export default function Projects() {
  return (
    <>
      <Navbar />
      <main>
        <h1>
          <FaCode />
          My Projects
        </h1>
        <div className={styles.projects}>
          <a
            className={styles.projectPreview}
            href="https://linettekuhn.github.io/easy-cook"
            target="_blank"
          >
            <h3>EasyCook</h3>
            <p>
              My first website! A recipe and meal planning web app built with
              React, TypeScript, and Node.js.
            </p>
            <ul>
              <h4>Features:</h4>
              <li>Recipe lookup with Spoonacular API</li>
              <li>Create, manage and save weekly meal plans</li>
              <li>Store and manage pantry ingredients</li>
              <li>Automatic grocery list generation from meal plan</li>
              <li>User authentication</li>
            </ul>
          </a>
          <a
            className={styles.projectPreview}
            href="https://linettekuhn.github.io/zero-lio"
            target="_blank"
          >
            <h3>ZeroLío</h3>
            <p>
              A location-based sports field reservation platform built with
              React, TypeScript, and Node.js.
            </p>
            <ul>
              <h4>Features:</h4>
              <li>Interactive map integration for discovering sports fields</li>
              <li>Secure user authentication</li>
              <li>Field reservation and scheduling system</li>
              <li>Community features for user engagement</li>
            </ul>
          </a>
          <a
            className={styles.projectPreview}
            href="https://linettekuhn.github.io/tcp-chat"
            target="_blank"
          >
            <h3>TCP Chat App</h3>
            <p>
              A real-time chat application with a C++ TCP server backend and
              React/TypeScript frontend.
            </p>
            <ul>
              <h4>Features:</h4>
              <li>Real-time messaging between clients</li>
              <li>Message history storage</li>
              <li>Active user tracking</li>
              <li>Express.js bridge between frontend and C++ server</li>
              <li>User authentication</li>
            </ul>
          </a>
        </div>
      </main>
    </>
  );
}
