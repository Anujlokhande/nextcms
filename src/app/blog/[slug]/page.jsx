import dateFormatFunc from "@/utils/dateFormatFunc";
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SingleBlog() {
  const tempTag = "web, dsa, ai/ml";
  const demoHtml = `
    <p>Demo Content </p>
  `;

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/blogs"
            className="text-sm text-primary-foreground hover:underline"
          >
            ← Back to posts
          </Link>

          <article className="mt-4 bg-card p-6 rounded-xl shadow-md">
            <header className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tight">
                Become Backend Developer
              </h1>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="size-4 text-muted-foreground" />
                  <time>{dateFormatFunc(new Date())}</time>
                </div>
                <div className="mx-1">•</div>
                <div className="text-xs flex items-center gap-2">
                  <span className="text-muted-foreground/80">Category:</span>
                  <span className="inline-block px-2 py-0.5 rounded bg-accent/10 text-accent-foreground text-xs">
                    Development
                  </span>
                </div>
              </div>
            </header>

            <div className="mt-4">
              <Image
                className="w-full rounded-lg object-cover shadow-sm border"
                src={"/thumbnails/become-backend-dev.png"}
                width={1200}
                height={600}
                alt="Become Backend Developer"
              />
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              {tempTag.split(",").map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs inline-block px-2 py-1 rounded-full bg-muted/20 text-muted-foreground"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>

            <div className="mt-6 prose prose-invert max-w-none text-muted-foreground">
              <div dangerouslySetInnerHTML={{ __html: demoHtml }} />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni
                asperiores voluptatem voluptates necessitatibus vero non impedit
                voluptate ipsam quaerat deserunt quod doloribus aliquam, a quasi
                aperiam saepe consequuntur sequi blanditiis!
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Dignissimos, neque debitis corporis dolores nostrum earum minus
                eos provident eveniet sed, nam porro voluptatibus vero commodi
                quasi voluptas. Tenetur, voluptates laudantium.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
