"use client";
import React from "react";
import styles from "./comment.module.css";
import Image from "next/image";

function Comment({ key, item }) {
  return (
    <div className={styles.comment}>
      <div className={styles.user}>
        {item?.user?.image && (
          <Image
            src={item.user.image}
            alt=""
            width={50}
            height={50}
            className={styles.image}
          />
        )}
        <div className={styles.userInfo}>
          <span className={styles.username}> {item.user.name}</span>
          <span className={styles.date}>{item.createdAt}</span>
        </div>
      </div>
      <p className={styles.desc}>{item.desc}</p>
    </div>
  );
}

export default Comment;
