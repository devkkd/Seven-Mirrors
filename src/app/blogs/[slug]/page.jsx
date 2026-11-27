import { notFound } from "next/navigation";
import BlogDetail from "@/components/BlogDetail";
import { getPost, getPosts } from "@/lib/blog";

// build ke time har blog ka page ban jata hai
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Blog not found" };
  return {
    title: `${post.title} | Seven Mirrors Stays`,
    description: post.excerpt,
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  // sidebar: current blog chhod ke baaki
  const related = (await getPosts()).filter((p) => p.slug !== slug).slice(0, 4);

  // key = slug badle to animations dobara chalein
  return <BlogDetail key={post.slug} post={post} related={related} />;
}
