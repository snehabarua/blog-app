import React from "react";
import styles from "./singlepage.module.css";
import Menu from "@/components/Menu/Menu";
import Image from "next/image";
import Comments from "@/components/comments/Comments";

const getData = async (slug) => {
  // page parameter: It accepts a page argument to request a specific page of posts.
  // It sends a GET request to the API endpoint with a query parameter page (e.g., /api/posts?page=1).
  // The option cache: "no-store" ensures that the fetch request bypasses any caching mechanisms, meaning it will always fetch fresh data.
  const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("failed");
  }
  return res.json();
};
async function SinglePage({ params }) {
  const { slug } = params;
  const data = await getData(slug);
  //page made for single post
  //when user searches for a topic, it will be shown here

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{data.title} </h1>
          <div className={styles.user}>
          { data?.user.image && <div className={styles.userImgContainer}>
              <Image src={data.user.image} alt="" fill className={styles.avatar} />
            </div>}

            <div className={styles.userTextContainer}>
              <span className={styles.username}>{data?.user.name}</span>
              <span className={styles.date}>
                {data?.createdAt.substring(0, 10)}
              </span>
            </div>
          </div>
        </div>
        {data?.img && (
          <div className={styles.imgContainer}>
            <Image src={data.img} alt="" fill className={styles.image} />
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div
            className={styles.desc}
            dangerouslySetInnerHTML={{ __html: data?.desc }}
          />

          <div className={styles.comment}>
            <Comments postSlug={slug}/>
          </div>
        </div>
        <Menu />
      </div>
    </div>
  );
}

export default SinglePage;
