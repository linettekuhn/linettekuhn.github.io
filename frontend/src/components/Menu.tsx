import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { BsCursorText } from "react-icons/bs";
import { FaCode } from "react-icons/fa6";
import { MdContactPhone } from "react-icons/md";
import { Link } from "react-router";
import styles from "./Menu.module.css";
import { createPortal } from "react-dom";

export default function Menu() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <button className={styles.menuButton}>
        {menuOpen ? (
          <IoClose onClick={() => setMenuOpen(false)} />
        ) : (
          <IoMenu onClick={() => setMenuOpen(true)} />
        )}
      </button>
      {createPortal(
        <div className={`${styles.links} ${menuOpen ? styles.open : ""}`}>
          <Link to={"/blog"}>
            <BsCursorText />
            Blog
          </Link>
          <Link to={"/projects"}>
            <FaCode />
            Projects
          </Link>
          <Link to={"/contact"}>
            <MdContactPhone />
            Contact
          </Link>
        </div>,
        document.body
      )}
    </>
  );
}
