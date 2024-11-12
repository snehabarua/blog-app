import React from "react";
import style from "./navbar.module.css";
import Image from "next/image";
import { Link } from "next-view-transitions";
import ThemeToggle from "../themeToggle/ThemeToggle";
import AuthLinks from "../authLinks/AuthLinks";
function Navbar() {
  return (
    <div className={style.container}>
      <div className={style.social}>
        <Image src="/facebook.png" alt="facebook" width={24} height={24} />
        <Image src="/instagram.png" alt="instagram" width={24} height={24} />
        <Image src="/tiktok.png" alt="tiktok" width={24} height={24} />
        <Image src="/youtube.png" alt="youtube" width={24} height={24} />
      </div>
      <div className={style.logo}>BlogHub</div>
      <div className={style.links}>
        <ThemeToggle/>
        <Link href="/" className={style.link}>Contact</Link>
        <Link href="/" className={style.link}>About</Link>
        <Link href="/" className={style.link}>Home</Link>
        <AuthLinks/>
      </div>
    </div>
  );
}

export default Navbar;
