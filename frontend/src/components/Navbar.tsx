import { Link } from "react-router";
import styles from "./Navbar.module.css";
import { BsCursorText } from "react-icons/bs";
import { FaCode } from "react-icons/fa6";

export default function Navbar() {
  return (
    <nav>
      <Link to={"/"}>Linette Kühn</Link>
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
