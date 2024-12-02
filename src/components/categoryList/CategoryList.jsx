import React from "react";
import { Link } from "next-view-transitions";
import Image from "next/image";
import styles from "./categoryList.module.css";
const getData =async ()=>{
  const res = await fetch("https://blog-app-nine-iota.vercel.app//api/categories",{
    cache:"no-store"
  })
  if (!res.ok) {
    throw new Error("failed")
  }
  return res.json()
}
const CategoryList= async()=> {
const data = await getData()
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Popular Category</h1>
      <div className={styles.categories}>
        {data?.map(item=>(

        <Link
          href="/blog?cat=style"
          className={`${styles.category} ${styles[item.slug]}`}
       key={item.id} //in mongodb its "_id"
       >
         {item.img && <Image
            src={item.img}
            alt=""
            className={styles.image}
            width={32}
            height={32}
          />}
          {item.title}
        </Link>
        ))}
        
      </div>
    </div>
  );
}

export default CategoryList;
