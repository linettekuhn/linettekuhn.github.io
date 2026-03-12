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
            projectLink="https://github.com/linettekuhn/budget-app"
            githubLink="https://github.com/linettekuhn/budget-app"
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
            key={"Contexto"}
            name="Contexto"
            projectLink="https://contexto.linettekuhn.com"
            githubLink="https://github.com/linettekuhn/contexto-frontend"
            image="/images/contexto-project-preview.png"
            description="An AI-powered dialect-aware translation web app that generates culturally authentic translations with control over regional dialect and tone."
            features={[
              "AI-powered translations with regional dialect support",
              "Language and dialect selection",
              "Automatic or manual original language detection",
              "Formality slider to control tone and translation style",
            ]}
            highlights={[
              "React",
              "TypeScript",
              "Node.js Backend",
              "OpenAI API",
              "PostgreSQL",
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
          <ProjectCard
            key={"GameOfLife"}
            name="Game of Life"
            projectLink="https://linettekuhn.github.io/game-of-life/"
            githubLink="https://github.com/linettekuhn/game-of-life"
            image="/gifs/game_of_life_preview.gif"
            description="An interactive simulation of Conway's Game of Life with a React + Vite frontend and a C++ core compiled to WebAssembly."
            features={[
              "Real-time cellular automaton simulation",
              "Interactive grid with draw and edit controls",
              "Play, pause, step, and reset simulation states",
              "Adjustable simulation settings",
              "Runs native C++ logic directly in the browser via WebAssembly",
            ]}
            highlights={[
              "C++ Core Logic",
              "WebAssembly",
              "Emscripten",
              "React",
            ]}
          />
        </div>
      </main>
    </>
  );
}
