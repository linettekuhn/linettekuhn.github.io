import { useNavigate } from "react-router";
import styles from "./Navbar.module.css";
import Menu from "./Menu";
import Smiley from "./icons/Smiley";
import ThemeToggle from "./icons/Lamp";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav>
      <div className={styles.left}>
        <div onClick={() => navigate("/")} className={styles.logo}>
          Linette K<Smiley />
          hn
        </div>
        <ThemeToggle />
      </div>
      <Menu />
    </nav>
  );
}
