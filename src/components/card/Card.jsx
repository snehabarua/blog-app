import React from "react";
import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";
const Card = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src="/p1.jpeg" alt="" fill className={styles.image} />
      </div>
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>11.02.2023 - </span>
          <span className={styles.category}>CULTURE</span>
        </div>
        <Link href="/">
          <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
        </Link>
        <p className={styles.desc}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          aspernatur quae a placeat ad ipsam quis, enim ullam omnis unde
          quisquam ut, dicta error, at iusto repellendus illum quam fugit.
        </p>
        <div className={styles.additional}>
          <Link href="/" className={styles.link}>Read More</Link>
          <span className="material-symbols-outlined">bookmark</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
