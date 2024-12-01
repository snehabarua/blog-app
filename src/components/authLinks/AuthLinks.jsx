"use client";
import React, { useState } from "react";
import styles from "./authLinks.module.css";
import { Link } from "next-view-transitions";
import { signOut, useSession } from "next-auth/react";
const AuthLinks = () => {
  const [open, setOpen] = useState(false);
  //temp
  const {status} = useSession();
  return (
    <>
      {status === "unauthenticated" ? (
        <Link href="/login" className={styles.link}>LogIn</Link>
      ) : (
        <>
          <Link href="/write" className={styles.link}>Write</Link> <Link href="/bookmark" className={styles.link}>Bookmarks</Link>
          <span className={styles.link} onClick={()=>signOut()} >LogOut</span>
        </>
      )}
      <div className={styles.burger} onClick={()=> setOpen(!open)}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
      {open && (
        <div className={styles.responsiveMenu}>
          <Link href="/">Home</Link>
      
          {status === "notauthenticated" ? (
        <Link href="/login">LogIn</Link>
      ) : (
        <>
          <Link href="/write">Write</Link> <Link href="/bookmark" >Bookmarks</Link>
          <span className={styles.link}>LogOut</span>
        </>
      )}
        </div>
      )}
    </>
  );
};

export default AuthLinks;
