import EditableAllPost from "./editable-all-post";
import Pagination from "../pagination";
import { config } from "@/app/static/config";
import CategoryFilter from "../category-filter";
import { getUserBlogs } from "@/app/actions/getUserBlogs";

export default async function UserAllPosts({ page, category, user }) {
  const { posts, count } = await getUserBlogs({
    page,
    category,
    userId: user.id,
  });

  return (
    <section className="p-8 flex flex-col gap-4">
      <h2>User All Blogs</h2>
      <CategoryFilter />
      {posts.map((post) => {
        return <EditableAllPost post={post} />;
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
