import { useState } from "react";
import { FaCode } from "react-icons/fa6";
import { MdContactPhone } from "react-icons/md";
import { Link } from "react-router";
import styles from "./Menu.module.css";
import { createPortal } from "react-dom";
import MenuIcon from "./icons/MenuIcon";
import Caret from "./icons/Caret";

export default function Menu() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    const isOpen = !menuOpen;
    setMenuOpen(isOpen);
  };

  return (
    <>
      <button className={styles.menuButton} onClick={toggleMenu}>
        <MenuIcon isOpen={menuOpen} />
      </button>

      {createPortal(
        <div className={`${styles.links} ${menuOpen ? styles.open : ""}`}>
          <Link className={styles.link} to={"/blog"}>
            <Caret className={styles.caret} />
            Blog
          </Link>
          <Link className={styles.link} to={"/projects"}>
            <FaCode />
            Projects
          </Link>
          <Link className={styles.link} to={"/contact"}>
            <MdContactPhone />
            Contact
          </Link>
        </div>,
        document.body
      )}
    </>
  );
}
