import { Link } from "react-router";
import styles from "./Navbar.module.css";
import Menu from "./Menu";
import Smiley from "./Smiley";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav>
      <Menu />
      <Link to={"/"} className={styles.logo}>
        Linette K<Smiley />
        hn
      </Link>
      <ThemeToggle />
    </nav>
  );
}
