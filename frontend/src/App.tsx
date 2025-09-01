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
              Welcome!
            </h1>
            <h2>
              Hi, I'm <span className="bold">Linette!</span> I'm a{" "}
              <span className="bold">
                CompSci student into web development.
              </span>
            </h2>
            <h3>
              I like building cool projects and sharing what I learn along the
              way!
            </h3>
          </div>
          <div className={styles.links}>
            <Link className={styles.link} to={"/blog"}>
              My Blog
            </Link>
            <Link className={styles.link} to={"/projects"}>
              My Projects
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
