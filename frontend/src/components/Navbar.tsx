import { useNavigate } from "react-router";
import styles from "./Navbar.module.css";
import Menu from "./Menu";
import Smiley from "./Smiley";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav>
      <Menu />
      <div onClick={() => navigate("/")} className={styles.logo}>
        Linette K<Smiley />
        hn
      </div>
      <ThemeToggle />
    </nav>
  );
}
