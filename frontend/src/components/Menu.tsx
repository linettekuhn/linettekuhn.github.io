import { useState } from "react";
import { MdContactPhone, MdHomeFilled } from "react-icons/md";
import { useLocation, useNavigate } from "react-router";
import styles from "./Menu.module.css";
import { createPortal } from "react-dom";
import MenuIcon from "./icons/MenuIcon";
import Caret from "./icons/Caret";
import Code from "./icons/Code";
import { ThemedButton } from "./ThemedButton";
import { type ThemedTextType } from "./ThemedText";

export default function Menu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const isActive = (path: string) => location.pathname === path;

  function renderLinks(showIcons: boolean, textType: ThemedTextType) {
    return (
      <>
        <ThemedButton
          variant="link"
          textType={textType}
          className={`${styles.link} ${isActive("/") ? styles.active : ""}`}
          onClick={() => navigate("/")}
        >
          {showIcons && <MdHomeFilled />}
          Home
        </ThemedButton>
        <ThemedButton
          variant="link"
          textType={textType}
          className={`${styles.link} ${isActive("/blog") ? styles.active : ""}`}
          onClick={() => navigate("/blog")}
        >
          {showIcons && <Caret className={styles.caret} />}
          Blog
        </ThemedButton>
        <ThemedButton
          variant="link"
          textType={textType}
          className={`${styles.link} ${isActive("/projects") ? styles.active : ""}`}
          onClick={() => navigate("/projects")}
        >
          {showIcons && <Code className={styles.code} />}
          Projects
        </ThemedButton>
        <ThemedButton
          variant="link"
          textType={textType}
          className={`${styles.link} ${isActive("/contact") ? styles.active : ""}`}
          onClick={() => navigate("/contact")}
        >
          {showIcons && <MdContactPhone />}
          Contact
        </ThemedButton>
      </>
    );
  }

  return (
    <>
      <button className={styles.menuButton} onClick={toggleMenu}>
        <MenuIcon isOpen={menuOpen} />
      </button>

      {createPortal(
        <div className={`${styles.links} ${menuOpen ? styles.open : ""}`}>
          {renderLinks(true, "h4")}
        </div>,
        document.body,
      )}

      <div className={styles.desktopLinks}>{renderLinks(false, "body")}</div>
    </>
  );
}
