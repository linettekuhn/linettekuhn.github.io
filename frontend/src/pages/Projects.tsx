import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import styles from "./Projects.module.css";

export default function Projects() {
  return (
    <>
      <Navbar />
      <main className={styles.projectsWrapper}>
        <h1>My Projects</h1>
        <div className={styles.projects}>
          <ProjectCard
            key={"EasyCook"}
            name="EasyCook"
            projectLink="https://linettekuhn.github.io/easy-cook"
            description="My first website! A recipe and meal planning web app built with
              React, TypeScript, and Node.js."
            features={[
              "Recipe lookup with Spoonacular API",
              "Create, manage and save meal plans",
              "Store and manage pantry ingredients",
              "Automatic grocery list generation",
              "User authentication",
            ]}
          />
          <ProjectCard
            key={"ZeroLio"}
            name="ZeroLío"
            projectLink="https://linettekuhn.github.io/zero-lio"
            description=" A location-based sports field reservation platform built with
              React, TypeScript, and Node.js."
            features={[
              "Interactive map integration for discovering sports fields",
              "Secure user authentication",
              "Field reservation and scheduling system",
              "Community features for user engagement",
            ]}
          />
          <ProjectCard
            key={"TCPChatApp"}
            name="TCP Chat App"
            projectLink="https://linettekuhn.github.io/tcp-chat"
            description="A real-time chat application with a C++ TCP server backend and
              React/TypeScript frontend."
            features={[
              "Real-time messaging between clients",
              "Message history storage",
              "Active user tracking",
              "Express.js bridge between frontend and C++ server",
              "User authentication",
            ]}
          />
        </div>
      </main>
    </>
  );
}
