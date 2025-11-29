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
            githubLink="https://github.com/linettekuhn/easy-cook"
            image="/images/easy-cook-project-preview.png"
            description="My first website! A recipe and meal planning web app built with
              React, TypeScript, and Node.js."
            features={[
              "Recipe lookup with Spoonacular API",
              "Create, manage and save meal plans",
              "Store and manage pantry ingredients",
              "Automatic grocery list generation",
              "User authentication",
            ]}
            highlights={[
              "TypeScript",
              "React",
              "Express Backend",
              "Spoonacular API",
              "Responsive UI/UX",
            ]}
          />
          <ProjectCard
            key={"Piggy"}
            name="Piggy"
            projectLink="https://linettekuhn.github.io/piggy"
            githubLink="https://github.com/linettekuhn/piggy"
            image="/images/piggy-project-preview.png"
            description="A mobile budgeting app for tracking expenses and visualizing financial built with React Native and Expo."
            features={[
              "Visual progress bars and pie charts for spending insights",
              "Category-based expense tracking",
              "Cross-platform UI",
              "Local storage using SQLite for offline functionality",
            ]}
            highlights={[
              "React Native",
              "TypeScript",
              "Expo",
              "SQLite",
              "Interactive Charts",
            ]}
          />
          <ProjectCard
            key={"ZeroLio"}
            name="ZeroLío"
            projectLink="https://linettekuhn.github.io/zero-lio"
            githubLink="https://github.com/linettekuhn/zero-lio"
            image="/images/zero-lio-project-preview.png"
            description=" A location-based sports field reservation platform built with
              React, TypeScript, and Node.js."
            features={[
              "Interactive map integration for discovering sports fields",
              "Secure user authentication",
              "Field reservation and scheduling system",
              "Community features for user engagement",
            ]}
            highlights={[
              "TypeScript",
              "React",
              "Nominatim API",
              "Geolocation Services",
            ]}
          />
          <ProjectCard
            key={"TCPChatApp"}
            name="TCP Chat App"
            projectLink="https://linettekuhn.github.io/tcp-chat"
            githubLink="https://github.com/linettekuhn/tcp-chat"
            image="/images/tcp-chat-project-preview.png"
            description="A real-time chat application with a C++ TCP server backend and
              React/TypeScript frontend."
            features={[
              "Real-time messaging between clients",
              "Message history storage",
              "Active user tracking",
              "Express.js bridge between frontend and C++ server",
              "User authentication",
            ]}
            highlights={[
              "C++ TCP Server",
              "React",
              "Sockets",
              "Multithreading",
              "Express.js Bridge",
            ]}
          />
        </div>
      </main>
    </>
  );
}
