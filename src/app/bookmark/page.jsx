"use client";
import React, { useEffect, useState } from "react";
import styles from "./bookmark.module.css";
import Link from "next/link";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const BookmarksPage = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookmarks = async () => {
    try {
      const res = await fetch("/api/bookmark");
      if (!res.ok) {
        throw new Error("Failed to fetch bookmarks");
      }
      const data = await res.json();
      setBookmarks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  const handleDeleteBookmark = async (postId) => {
    try {
      const res = await fetch("/api/bookmark", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId }),
      });
      if (!res.ok) {
        toast.error("failed to delete bookmark");
      }
      //update bookmarks prev state after deletion
      setBookmarks((prevBookmarks) =>
        prevBookmarks.filter((bookmark) => bookmark.postId !== postId)
      );
      
      toast.success("bookmark deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles?.container || ""}>
      <h1>Your Bookmarked Posts</h1>
      {bookmarks.length === 0 ? (
        <p>You have no bookmarks yet.</p>
      ) : (
        <ul className={styles?.bookmarkList || ""}>
          {bookmarks.map((bookmark) => (
            <li key={bookmark.id}>
              <div className={styles.textContainer}>
                <h1>{bookmark.post.title}</h1>

                <span className={styles.desc}>
                  {bookmark.post.desc.substring(0, 60)}
                </span>
                <div className={styles.additional}>
                  <Link
                    href={`/posts/${bookmark.post.slug}`}
                    className={styles.link}
                  >
                    Read More
                  </Link>
                  <span
                    className="material-symbols-outlined"
                    onClick={() => handleDeleteBookmark(bookmark.postId)}
                  >
                    bookmark
                  </span>
                </div>
              </div>
            </li>
          ))}

        </ul>
      )}
    </div>
  );
};

export default BookmarksPage;
