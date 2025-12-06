import dateFormatFunc from "@/utils/dateFormatFunc";
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const fetchPost = async (slug) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/get/${slug}`
  );
  const data = await res.json();
  console.log(data, " Single post data");
  return data;
};

export async function generateMetadata({ params }) {
  const param = await params;
  const post = await fetchPost(param.slug);
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      images: [post.thumbnail],
    },
  };
}

export default async function SingleBlog({ params }) {
  const { slug } = await params;
  console.log(slug);

  const post = await fetchPost(slug);

  return (
    <section className="py-16 bg-linear-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors mb-8"
          >
            ← Back to posts
          </Link>

          <article className="bg-card rounded-2xl shadow-lg overflow-hidden border border-border">
            {/* Hero Image */}
            <div className="relative w-full overflow-hidden">
              {post.thumbnail && (
                <div className="relative h-64 md:h-96 lg:h-[520px] w-full">
                  <Image
                    className="w-full h-full object-cover"
                    src={post.thumbnail}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 900px, 1200px"
                    alt={post.title}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 md:p-10">
              <header className="-mt-12 md:-mt-16 mb-6 md:mb-8 space-y-4">
                <div className="flex flex-wrap gap-2">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wide">
                    {post.catSlug}
                  </span>
                </div>

                <h1 className="text-3xl md:text-5xl font-extrabold text-foreground leading-tight">
                  {post.title}
                </h1>

                <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4" />
                    <time>{dateFormatFunc(post.createdAt)}</time>
                  </div>
                </div>
              </header>

              {/* Keywords/Tags */}
              {post?.keywords && (
                <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-border">
                  {post?.keywords.split(",").map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1.5 rounded-lg bg-muted text-muted-foreground hover:bg-accent/20 transition-colors"
                    >
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
              )}

              {/* Blog Content */}
              <div className="prose prose-lg prose-invert max-w-none prose-headings:text-foreground prose-p:text-base prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-code:bg-muted prose-code:text-foreground prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-img:rounded-lg prose-img:shadow-md prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic text-foreground">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
