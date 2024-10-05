import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./categoryList.module.css";
function CategoryList() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Popular Category</h1>
      <div className={styles.categories}>
        <Link
          href="/blog?cat=style"
          className={`${styles.category} ${styles.style}`}
        >
          <Image
            src="/style.jpg"
            alt=""
            className={styles.image}
            width={32}
            height={32}
          />
          style
        </Link>
        <Link
          href={`/blog`}
          className={`${styles.category} ${styles.coding}`}
        >
          <Image
            src="/coding.jpg"
            alt=""
            className={styles.image}
            width={32}
            height={32}
          />
          coding
        </Link>
        <Link
          href={`/blog`}
          className={`${styles.category} ${styles.fashion}`}
        >
          <Image
            src="/fashion.jpg"
            alt=""
            className={styles.image}
            width={32}
            height={32}
          />
          fashion
        </Link>
        <Link
          href={`/blog`}
          className={`${styles.category} ${styles.food}`}
        >
          <Image
            src="/food.jpg"
            alt=""
            className={styles.image}
            width={32}
            height={32}
          />
          food
        </Link>
        <Link
          href={`/blog`}
          className={`${styles.category} ${styles.travel}`}
        >
          <Image
            src="/travel1.png"
            alt=""
            className={styles.image}
            width={32}
            height={32}
          />
          travel
        </Link>
        <Link
          href={`/blog`}
          className={`${styles.category} ${styles.culture}`}
        >
          <Image
            src="/culture.png"
            alt=""
            className={styles.image}
            width={32}
            height={32}
          />
          culture
        </Link>
      </div>
    </div>
  );
}

export default CategoryList;
