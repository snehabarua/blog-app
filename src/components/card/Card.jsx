"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";
import styles from "./card.module.css";
import { Link } from "next-view-transitions";
import { useState } from "react";
import { toast } from "react-toastify";
const Card = ({ key, item, postId, userId }) => {
  const { data: session } = useSession();
  userId = session?.user?.id;
  postId = item.id;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const handleBookmark = async () => {
    if (!session) {
      toast.error("You must be logged in to bookmark.");
      return;
    }
    try {
     

      setLoading(true);
      setError(null);
      setSuccess(false);
      const res = await fetch("/api/bookmark", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId, userId }),
      });
      if (!res.ok) {
        const data = await res.json();
        if (res.status == 400 && data.message == "post already bookmarked") {
          toast.error("You've already bookmarked this post");
        } else {
          throw new Error("Failed to bookmark post");
        }
        return;
      }

      setSuccess(true);
      toast.success("bookmarked successfully");
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };
  return (
    <div className={styles.container} key={key}>
      {item.img && (
        <div className={styles.imgContainer}>
          <Image src={item.img} alt="" fill className={styles.image} />
        </div>
      )}
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>
            {item.createdAt.substring(0, 10)} -{" "}
          </span>
          <span className={styles.category}>{item.catSlug}</span>
        </div>
        <Link href={`/posts/${item.slug}`}>
          <h1>{item.title}</h1>
        </Link>
        <span className={styles.desc}>{item.desc.substring(0, 60)}</span>
        <div className={styles.additional}>
          <Link href={`/posts/${item.slug}`} className={styles.link}>
            Read More
          </Link>
          <span className="material-symbols-outlined" onClick={handleBookmark}>
            bookmark
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
