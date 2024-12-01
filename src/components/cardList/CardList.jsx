import styles from "./cardList.module.css";
import Card from "../card/Card";
import Pagination from "../pagination/Pagination";

const getData = async (page, cat) => {
  // page parameter: It accepts a page argument to request a specific page of posts.
  // It sends a GET request to the API endpoint with a query parameter page (e.g., /api/posts?page=1).
  // The option cache: "no-store" ensures that the fetch request bypasses any caching mechanisms, meaning it will always fetch fresh data.
  const res = await fetch(
    `http://localhost:3000/api/posts?page=${page}&cat=${cat || ""}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("failed");
  }
  return res.json();
};
async function CardList({ page, cat }) {
  const { posts, count } = await getData(page, cat);
  const POST_PER_PAGE = 2;
  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recent Posts</h1>
      <div className={styles.posts}>
        {posts?.map((item) => (
          <Card item={item} key={item.id} />
        ))}
      </div>

      <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
    </div>
  );
}

export default CardList;
