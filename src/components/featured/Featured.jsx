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
           Want to share your story? Write a blog & let everyone get inspired!
          </h1>
          <p className={styles.postDesc}>
           This platform is built to share your unique stories with the world. Let it be a blog,  a video, or a photo,{` it's`} your choice. Let it flow here!! 
          </p>
          <button className={styles.button}>Read More</button>
        </div>
      </div>
    </div>
  );
}

export default Featured;
