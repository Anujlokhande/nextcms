import { getAllPosts } from "@/app/actions/getAllPosts";
import EditableAllPost from "./editable-all-post";
import Pagination from "../pagination";
import { config } from "@/app/static/config";
import CategoryFilter from "../category-filter";

export default async function AdminAllPosts({ page, category }) {
  const { posts, count } = await getAllPosts({ page, category });

  return (
    <section className="p-8 flex flex-col gap-4">
      <h2>Manage All Blogs</h2>
      <CategoryFilter />
      {posts.map((post, idx) => {
        return <EditableAllPost key={idx} post={post} />;
      })}
      <Pagination
        className="fixed bottom-10 left-1/2 -translate-1/2"
        currentPage={page}
        totalNumPage={count}
        perPage={config.perPage}
      />
    </section>
  );
}
