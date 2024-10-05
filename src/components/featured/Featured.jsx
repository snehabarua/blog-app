import React from "react";
import styles from "./featured.module.css";
import Image from "next/image";
function Featured() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <b>Hey, Admin here!</b>Discover stories and write blogs
      </h1>
      <div className={styles.post}>
        <div className={styles.imgContainer}>
          <Image src="/p1.jpeg" alt="" fill className={styles.image} />
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.postTitle}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit,
            facere?
          </h1>
          <p className={styles.postDesc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
            delectus fuga optio ipsa consequuntur inventore voluptas
            exercitationem perspiciatis tempore voluptate?
          </p>
          <button className={styles.button}>Read More</button>
        </div>
      </div>
    </div>
  );
}

export default Featured;
