// components/BlogCard.js
import Link from 'next/link';
import Image from 'next/image';

export default function BlogCard({ post }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
        {post.image && (
          <div className="relative w-full h-48">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
            {post.title}
          </h3>
          {post.description && (
            <p className="text-light-slate mb-4 line-clamp-3">
              {post.description}
            </p>
          )}
          <div className="flex items-center justify-between text-sm text-light-slate">
            <span>{post.author}</span>
            <span>{post.formattedDate}</span>
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-bright-blue/20 text-bright-blue text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}