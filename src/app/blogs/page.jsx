import Image from "next/image";
import Link from "next/link";

const blogConfig = [
  {
    title: "React Vs NextJs",
    excerpt: "Next Js Is Ultimate devlopment framework...",
    image: "/thumbnails/become-backend-dev.png",
    url: "/demo-slud",
  },
  {
    title: "Dreams",
    excerpt: "Dream Big...",
    image: "/thumbnails/dreams.png",
    url: "/demo-slud",
  },
  {
    title: "Become Backend Devloper",
    excerpt: "Start Your Backend Journey...",
    image: "/thumbnails/become-backend-dev.png",
    url: "/demo-slud",
  },
];

export default function Blog() {
  return (
    <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 px-5 py-3">
      {blogConfig.map((blog, index) => {
        return (
          <BlogCard
            key={index}
            title={blog.title}
            excerpt={blog.excerpt}
            image={blog.image}
            url={blog.url}
          />
        );
      })}
    </section>
  );
}

const BlogCard = ({ title, excerpt, image, url }) => {
  return (
    <div className="bg-gray-600/20 rounded-lg flex flex-col border p-1 gap-1 hover:scale-[1.03] transition-all delay-100 duration-200">
      <Image
        src={image}
        width={300}
        height={150}
        alt={title}
        className="w-full rounded-lg p-2"
      />
      <h2 className="text-3xl font-bold text-gray-200">{title}</h2>
      <p className="text-sm text-gray-400">{excerpt}</p>
      <Link
        className="bg-zinc-600/70 py-2 px-3 rounded-lg w-fit text-xs"
        href={`blog/${url}`}
      >
        Read More
      </Link>
    </div>
  );
};
