// "use client";
import Featured from "@/components/featured/Featured";
import styles from "./homepage.module.css";
import CardList from "@/components/cardList/CardList"
import CategoryList from "@/components/categoryList/CategoryList"
import Menu from "@/components/Menu/Menu"
export default function Home() {
  return (
    //homepage
    <div className={styles.container}>
    <Featured/>
    <CategoryList/>
    
    <div className={styles.content}>
      <CardList/>
      <Menu/>
    </div>
    </div>
  );
}
