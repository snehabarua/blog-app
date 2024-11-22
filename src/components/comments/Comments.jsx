"use client";
import React, { useState } from "react";
import styles from "./comments.module.css";
import { Link } from "next-view-transitions";
import Comment from "../comment/Comment";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import Error from "next/error";

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }
  return data;
};
function Comments({ postSlug }) {
  //only for users logged in
  const { status } = useSession();
  const { data,mutate, isLoading } = useSWR(
    `http://localhost:3000/api/comments?postSlug=${postSlug}`,
    fetcher
  );
  const [desc, setDesc]= useState("")
  const handleSubmit=async()=>{
    await fetch ("/api/comments",{
      method:"POST",
      body:JSON.stringify({desc,postSlug})
    })
    mutate()
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Comments</h1>
      {status === "authenticated" ? (
        <div className={styles.write}>
          <textarea
            placeholder="Write a comment..."
            className={styles.input} onChange={(e)=>setDesc(e.target.value)}
          ></textarea>
          <button className={styles.button} onClick={handleSubmit}>Send</button>
        </div>
      ) : (
        <Link href="/login">Login to write a comment</Link>
      )}
      {/*Comment list*/}
      <div className={styles.comments}>
        {isLoading
          ? "loading"
          : data?.map((item) => <Comment key={item._id} item={item} />)}
      </div>
    </div>
  );
}

export default Comments;
