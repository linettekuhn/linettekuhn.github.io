import { Link } from "react-router";
import Navbar from "./components/Navbar";
import styles from "./App.module.css";

function App() {
  return (
    <>
      <Navbar />
      <main className={styles.app}>
        <div className={styles.header}>
          <div className={styles.nameWrapper}>
            <h1>
              LINETTE <br /> KÜHN
            </h1>
          </div>
          <div className={styles.subHeading}>
            <h4>Full Stack Developer</h4>
            <h5>Check out my work and what I learn along the way!</h5>
          </div>
          <div className={styles.links}>
            <Link className="button" to={"/projects"}>
              Projects
            </Link>
            <Link className="button" to={"/blog"}>
              Blog
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
