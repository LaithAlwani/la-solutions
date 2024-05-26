"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MdMenu, MdClose, MdLightMode, MdDarkMode } from "react-icons/md";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        setToggleMenu(false);
      }
    });
    return () => window.removeEventListener("resize", () => null);
  }, []);

  return (
    <>
      <nav>
        <Link href="/" className="logo">
          <Image
            src="/images/logo_300dpi.webp"
            alt="logo"
            priority
            width={48}
            height={48}
          />
          <div className="my-title-container">
            <strong>Laith Alwani</strong>
            <em>Full Stack Developer</em>
          </div>
        </Link>

        <div className="nav-links">
          <NavLinks />
        </div>
        <ThemeComponent />
        <button
          aria-label="nav-button"
          onClick={() => setToggleMenu(!toggleMenu)}
          className="mobile-nav-button">
          {!toggleMenu ? <MdMenu size={28} /> : <MdClose size={28} />}
        </button>
      </nav>

      <div
        className={`nav-mobile ${toggleMenu ? "open" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          setToggleMenu(!toggleMenu);
        }}>
        <NavLinks />
      </div>
    </>
  );
}

const NavLinks = () => {
  const pathname = usePathname();
  return (
    <>
      <Link href="/" className={pathname === "/" ? "active" : ""}>
        Home
      </Link>
      <Link href="/services" className={pathname === "/services" ? "active" : ""}>
        Services
      </Link>
      <Link href= "/about" className={pathname === "/about" ? "active" : ""}>
        About
      </Link>
      <Link href="/contact" className={pathname === "/contact" ? "active" : ""}>
        Contact
      </Link>
    </>
  );
};

const ThemeComponent = () => {
  const [isDark, setIsDark] = useState(false);
  const toggleRef = useRef();

  const setThemeMode = (mode) => {
    localStorage.setItem("theme", mode);
    document.documentElement.setAttribute("data-theme", mode);
    mode === "dark" ? setIsDark(true) : setIsDark(false);
  };

  const toggleTheme = () => {
    toggleRef.current.checked ? setThemeMode("dark") : setThemeMode("light");
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", localStorage.getItem("theme"));
    setIsDark(localStorage.getItem("theme") === "dark");
  }, []);

  return (
    <label className="toggle-theme">
      <input type="checkbox" ref={toggleRef} checked={isDark} onChange={toggleTheme} />
      <span className="slider round">
        <MdLightMode />
        <MdDarkMode />
      </span>
    </label>
  );
};
