import { Link } from "react-router";
import styles from "./Navbar.module.css";
import { BsCursorText } from "react-icons/bs";
import { FaCode } from "react-icons/fa6";
import Smiley from "./Smiley";

export default function Navbar() {
  return (
    <nav>
      <Link to={"/"} className={styles.logo}>
        Linette K<Smiley />
        hn
      </Link>
      <div className={styles.links}>
        <Link to={"/blog"}>
          <BsCursorText />
          Blog
        </Link>
        <Link to={"/projects"}>
          <FaCode />
          Projects
        </Link>
      </div>
    </nav>
  );
}
