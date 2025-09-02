import { Link } from "react-router";
import Navbar from "./components/Navbar";
import { MdWavingHand } from "react-icons/md";
import styles from "./App.module.css";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <div className={styles.app}>
          <div className={styles.header}>
            <h1>
              <MdWavingHand />
              Hi, I'm <span className="bold">Linette!</span>
            </h1>
            <h3>
              I'm a <span className="bold">CompSci student </span>
              into
              <span className="bold"> web development</span>
            </h3>
            <h4>Check out my work and what I learn along the way!</h4>
          </div>
          <div className={styles.links}>
            <Link className={styles.link} to={"/projects"}>
              My Projects
            </Link>
            <Link className={styles.link} to={"/blog"}>
              My Blog
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
