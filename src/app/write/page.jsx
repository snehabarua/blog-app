"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./write.module.css";
import ReactQuill from "react-quill";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
function Write() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(" ");
  const { status } = useSession();
  const router = useRouter();
  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }
  if (status === "authenticated") {
    router.push("/");
  }
  return (
    <div className={styles.container}>
      <input type="text" placeholder="Title" className={styles.input}/>
      <div className={styles.editor}>
        <button className={styles.button} onClick={()=>setOpen(!open)}>
          <Image src="/plus.png" alt="" width={16} height={16} />
        </button>
        {open && (
          <div className={styles.add}>
            <button className={styles.addButton}>
              <Image src="/image.png" alt="" width={16} height={16} />
            </button>
            <button className={styles.addButton}>
              <Image src="/external.png" alt="" width={16} height={16} />
            </button>
            <button className={styles.addButton}>
              <Image src="/video.png" alt="" width={16} height={16} />
            </button>
          </div>
        )}
        <ReactQuill theme="bubble" className={styles.textArea} value={value} onChange={setValue} placeholder="Tell your story..."/>
      </div>
      <button className={styles.publish}>Publish</button>
    </div>
  );
}

export default Write;
  