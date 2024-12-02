"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./write.module.css";
import "react-quill-new/dist/quill.bubble.css";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

function Write() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(" ");
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    async function uploadFile(file) {
      const name = new Date().getTime() + file.name;
      const { data, error } = await supabase.storage
        .from("BlogImages")
        .upload("public/" + name, file);
      if (error) {
        // Handle error
        console.log(error);
      } else {
        // Handle success
        const { data: url, error } = await supabase.storage
          .from("BlogImages")
          .getPublicUrl("public/" + name);
        // console.log(url);
        toast.success("file uploaded successfully");
        setMedia(url.publicUrl);
      }
    }
    //if true means if there is file then call func
    file && uploadFile(file);
    //The useEffect watches the file state.
    //When file changes (i.e., when a user selects a file), uploadFile(file) is executed to handle the upload process.
    //The file in the dependency array doesn’t execute any code but acts as a trigger for when the useEffect should run. It ensures that file && uploadFile(file) executes only after file changes
  }, [file]);
  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }
  if (status === "unauthenticated") {
    router.push("/");
  }
  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  const handleSubmit = async () => {
    const res = await fetch("https://blog-app-nine-iota.vercel.app/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        desc: value,
        img: media,
        slug: slugify(title),
        catSlug: catSlug || "style", //if nothing selected choose general category
      }),
    });
    // check if res is 200 or not and then redirect to post page with slug
    if (res.status === 200) {
      const data = await res.json();
      router.push(`/posts/${data.slug}`);
    }
  };
  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Title"
        className={styles.input}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select
        className={styles.select}
        onChange={(e) => setCatSlug(e.target.value)}
      >
        <option value="style">style</option>
        <option value="fashion">fashion</option>
        <option value="food">food</option>
        <option value="culture">culture</option>
        <option value="travel">travel</option>
        <option value="coding">coding</option>
      </select>
      <div className={styles.editor}>
        <button className={styles.button} onClick={() => setOpen(!open)}>
          <Image src="/plus.png" alt="" width={16} height={16} />
        </button>
        {open && (
          <div className={styles.add}>
            <input
              type="file"
              id="image"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
            />
            <button className={styles.addButton}>
              <label htmlFor="image">
                <Image src="/image.png" alt="" width={16} height={16} />
              </label>
            </button>
            <button className={styles.addButton}>
              <Image src="/external.png" alt="" width={16} height={16} />
            </button>
            <button className={styles.addButton}>
              <Image src="/video.png" alt="" width={16} height={16} />
            </button>
          </div>
        )}
  
          <ReactQuill
            theme="bubble"
            className={styles.textArea}
            value={value}
            onChange={setValue}
            placeholder="Tell your story..."
          />
       
      </div>
      <button className={styles.publish} onClick={handleSubmit}>
        Publish
      </button>
    </div>
  );
}

export default Write;
