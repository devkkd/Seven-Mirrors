import BlogPage from "@/components/BlogPage";
import { getPosts } from "@/lib/blog";

export const metadata = { title: "The Stay Journal | Seven Mirrors Stays" };

export default async function Page() {
  const posts = await getPosts();
  return <BlogPage posts={posts} />;
}
